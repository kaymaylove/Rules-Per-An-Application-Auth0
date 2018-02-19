# Web Application that displays a list of applications and their rules through Auth0 Management API

A simple web application that dynamically generates a list of application in an Auth0 account and the rules which apply to each application. This web application also uses Auth0 authentication and the whitelist rule (to only allow certain users to have access to see this list of apps and their rules).

### Prerequisites
* [Node](https://nodejs.org/en/download/) - is an open-source, cross-platform JavaScript run-time environment for executing JavaScript code server-side
* NPM - NPM is distributed with [Node.js](https://nodejs.org/en/download/)
* [Auth0](https://auth0.com/signup) Account - is a authentication-as-a-service platform, it is free for non-production use (up to 20 active users). Auth0 has many sdks, tons of documentation, is in compliance with various standards and is one less thing to worry about and maintain because most web apps require some type of authentication. 

### Installing
* Install Nodejs
		
### Getting Started
* Create an non interactive client and name it `Auth0-Management-API`
	* Click Non Interactive Clients and then Create
	* On the next screen, a user will be able to select Auth0 Management API in the drop down
	* Once clicked, a user then will navigate to the API and give permission to that client
	* Toggle the button next to the desire client `Auth0-Management-API` from unauthorized to authorized, in doing so, a list will appear for scopes. In this application, read:clients and read:rules are required, if additional data is wanted, please reference API v2 documentation for which scopes to choose.
	* Then, click Update
* Next, create a web application to get the data from the API and display it for end users, name it `Rules-Per-An-Application`
* Click on Single Page Web Applications and Create
* Select Node.js as the technology you are using for the web app
* To limit who can view this web app, create a rule and select `whitelist for a specific app` and enter the name of the client in the code [(context.clientName !== 'NameOfTheAppWithWhiteList')], then click save
* In the terminal, write `git clone `
* Navigate to the root of that folder in the terminal and type `install npm` - installs the dependencies/libraries that are needed and default libraries
* Copy configuration (.env) and replace with your own information 
	* AUTO_CLIENT_ID - `Rules-Per-An-Application` client  id (found next to the client or in settings)
	* AUTO_DOMAIN - found in the settings of the `Rules-Per-An-Application` client
	* AUTH0_CLIENT_SECRET - found in the settings of `Rules-Per-An-Application` client 
	* MANAGEMENT_API_CLIENT_ID - `Auth0-Management-API` client  id (found next to the client or in settings)
	* MANAGEMENT_API_CLIENT_SECRET - found in the settings of `Auth0-Management-API` client 
* Lastly, navigate to the settings of the `Rules-Per-An-Application` client and enter `http://localhost:3000/callback` into  Allowed Callback URLs and click Save Changes
* Open the command line and navigate into the root of the folder , type `npm start` to start running node
* Add desired user to Auth0 and then navigate to localhost:3000
* Login and a view/page with Auth0 Rules for Each Application will appear


## Built With

* [Auth0 Samples](https://github.com/auth0-samples/auth0-nodejs-webapp-sample/tree/embedded-login/01-Embedded-Login) - node.js login example page


## Authors

* **Karen Port** - [kaymaylove](https://github.com/kaymaylove)

## Acknowledgments

* [Auth0](https://auth0.com)
