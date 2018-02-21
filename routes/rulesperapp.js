var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();
var request = require('request-promise');

var getAccessToken = {
    method: 'POST',
    uri: 'https://' + process.env.AUTH0_DOMAIN + '/oauth/token',
    header: 'content-type: application/json',
    body: {
        client_id: process.env.MANAGEMENT_API_CLIENT_ID,
        client_secret: process.env.MANAGEMENT_API_CLIENT_SECRET,
        audience: 'https://' + process.env.AUTH0_DOMAIN + '/api/v2/',
        grant_type: 'client_credentials'
    },
    json: true
};

var requestData = function (resource, accessToken) {
    return {
        url: 'https://' + process.env.AUTH0_DOMAIN + '/api/v2/' + resource,
        auth: {
            bearer: accessToken
        },
        json: true
    };
};

var createArrayofRulesPerApp = function (rule, rulesPerApp) {
    // matches on single quotation marks 
    // search get all rules data for 'rule.script.match(/if\s*\(context\.clientName === \'([^\']+)\'\)/)'
    // if matches, push rule into array for that client
    var foundClientName = rule.script.match(/if\s*\(context\.clientName === \'([^\']+)\'\)/);
    if (foundClientName) {
        var clientName = foundClientName[1];
        rulesPerApp.forEach(function (rulesPerThisApp) {
            if (rulesPerThisApp.client.name === clientName) {
                rulesPerThisApp.rules.push(rule.name);
            }
        });
    }

    // matches on double quotation marks 
    var foundClientName_withdoublequotation = rule.script.match(/if\s*\(context\.clientName === \"([^\']+)\"\)/);
        if (foundClientName_withdoublequotation) {
        var clientName = foundClientName_withdoublequotation[1];
        rulesPerApp.forEach(function (rulesPerThisApp) {
            if (rulesPerThisApp.client.name === clientName) {
                rulesPerThisApp.rules.push(rule.name);
            }
        });
    }
    // matches on single quotation marks 
    // search get all rules data for 'rule.script.match(/if\s*\(context\.clientName !== \'([^\']+)\'\)/))'
    // get  list of applications by matching !== client name , this rule bypasses every app except this one
    // thus, this rule is applied to this app only
    // if matches, push rule into array for that client
    var foundClientName2 = rule.script.match(/if\s*\(context\.clientName !== \'([^\']+)\'\)/);
    if (foundClientName2) {
        var clientName2 = foundClientName2[1];
        rulesPerApp.forEach(function (rulesPerThisApp) {
            if (rulesPerThisApp.client.name === clientName2) {
                rulesPerThisApp.rules.push(rule.name);
            }
        });
    }

// matches on double quotation marks 
    var foundClientName2_withdoublequotation = rule.script.match(/if\s*\(context\.clientName !== \"([^\']+)\"\)/);
    if (foundClientName2_withdoublequotation) {
        var clientName2 = foundClientName2_withdoublequotation[1];
        rulesPerApp.forEach(function (rulesPerThisApp) {
            if (rulesPerThisApp.client.name === clientName2) {
                rulesPerThisApp.rules.push(rule.name);
            }
        });
    }
};

router.get('/', ensureLoggedIn, function (req, res, next) {

    // request access to Auth0 Management API
    request(getAccessToken)
        .then(function (body) {
            var accessToken = body.access_token;
            var rulesPerApp = [];

            // get all rules /api/v2/clients
            request(requestData('rules', accessToken))
                .then(function (rules) {
                    console.log(rules);

                    // Get all rules /api/v2/rules
                    request(requestData('clients', accessToken))
                        .then(function (clients) {

                            // create empty array of rules per client
                            clients.forEach(function (client) {
                                if (client.name !== 'All Applications') {
                                    rulesPerApp.push({
                                        client: client,
                                        rules: []
                                    });
                                }
                            });
                            rules.forEach(function (rule) {
                                // check for client name which rules are applied
                                createArrayofRulesPerApp(rule, rulesPerApp);
                            });
                            res.render('rulesperapp', {
                                rulesPerApp: rulesPerApp
                            });

                        });
                });

        });


});



module.exports = router;