# sample-code-api-js-html

[Peloton ID](https://idtest.peloton.com) allows for external developers with an appropriate subscription and user account to access the Peloton Sample API

# Getting Started
To get started using the sample code in this repository, first ensure that you have recieved your Peloton Summit **Username & Password** as well as a valid 
API subscription key, also known as the **Ocp-Apim-Subscription-Key**.

## 1. Set SUBSCRIPTION_KEY
Replace the stub value for  the SUBSCRIPTION_KEY in the **scripts\utils\env.js** file below to represent what was provided at the developer summit:
```javascript
const API_TOKEN = 'PUT_JWT_API_TOKEN_HERE';
const SUBSCRIPTION_KEY = 'PUT_SUBSCRIPTION_KEY_HERE';
```

## 2. Acquire Access Token
a) Configure Postman to make an oAuth2 Implicit request:

![Alt text](postman_config/oAuth2_ImplicitSetup.png?raw=true "Setup Oauth2 Implicit mode in Postman")

**Token Name:** __appframe-web-api-implicit__

**Grant Type:** __Implicit__

**Callback URL:** __https://getpostman.com/oauth2/callback__

**Auth URL:** __https://idtest.peloton.com/connect/authorize__

**Client ID:** __appframe-web-api-implicit__

**Scope:** __appframe-web-api-implicit__

**Client Authentication:** __Send Client credentials in body__

b) Provide username and password values provided in the Peloton Summit email:
![Alt text](postman_config/oAuth2_ImplicitLogin.png?raw=true "Complete oAuth challenge using credentials from Peloton Developer Summit Email")

c) The token returned can be used to replace the API_TOKEN value inside env.js

## 3. Host the project
To host the index.html file you'll need a webserver, IIS, Apache, Nginx can all do this or you can use the following nodejs package to run a simple webserver for testing:

a) Install NodeJs [NodeDownload](https://nodejs.org/en/download/)

b) Install the standalone webserver node package with the following command:
```
npm install -g http-server 
```

c) Run the webserver from the root of the project (containing the index.html file):
```
http-server
```
The command should output a list of IPs/hostnames and ports the website is running on, ex:
```
Starting up http-server, serving ./
Available on:
  http://192.168.1.1:8081  
Hit CTRL-C to stop the server
```
Now you can open any browser window and navigate to this location to view the site.

The sample project is basic HTML/Javascript project, no frameworks have been used. This has been done to simplify the distribution and understanding of API usage but we highly recommend using a Javascript web framework for any production development. 

Recommended Frameworks:
- **AngularJS**    Peloton is currently developing production code in both Angular 6 & 7. A sample project is in development
- **ReactJs**       Sample Project planned

# Project structure
```
|-- index.html          HTML page that drives the demo & includes all required dependencies.
|-- README.md           This markdown formatted documentation file.
|-- scripts             All javascript code for API interaction & basic formatting / dom manipulation is managed here.
|   |-- main.js         Registers DOM actions for the simple UI.
|   |-- modules
|   |   |-- api.js      All code related to making requests to the API and assigning the appropriate headers to the request.
|   |   |-- app.js      Defines the main object of the application / stores references to all core dependency libraries (API & state management libraries).
|   |   |-- builder.js  Aids in interacting with results from the API that have been transformed via the JSON.js library.
|   |   |-- state.js    State mangages route/table/function view/model presentation based on user screen context.
|   |   |-- store.js    Global state management.
|   |-- utils           General helper libraries to simplify DOM manipulation & state management (Constants, helper functions & route management).
|       |-- dom.js      Simple DOM functions to reduce code complexity.
|       |-- env.js      Where TOKEN & API SUBSCRIPTION KEY & ACTIVE COMPANY (OU) is specified.
|       |-- routes.js   Defines some sample API endpoints for use by the API function for specific well-known operations (Facilities, Networks, Inspections, Wells etc).
|-- styles
    |-- main.css        Styles for the sample application.
```