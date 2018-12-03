## Description
This is a boilerplate for React using Typescript, Material UI and Redux, React Router.

## Demo
*Visit [Demo link](https://material-ui-admin.herokuapp.com/)*

## Features
### Authentication
The app uses redux to manage the authentication state, and uses redux-auth-wrapper library to guard the routes
#### Pages
*  Login Page
*  User Registration Page
*  Password Reset Page

### Admin dashboard
The template comes with responsive modern charts, analytics, tables that are easily customizable to meet your data. 
* Also has an admin user management page allowing administrators to add other users as admins

The app users firebase functions for administer admin functionalities, located in folder functions-src that get transpiled 
to the functions folder using the npm run build command in functions-src/package.json.

The cloud functions have a user creation event that gets triggered when users register a new account. This listener function 
looks up for admin users email list in the config and provisions admin claims to the user if their email is in this list.
#### NB: Make sure that the firebase functions are deployed before admin user registration ####

The functions also provides an API to add other users as admins after deployment from the user management page.

### Other pages
* Inbox, Outbox, Drafts
* Profile Page (minimal)

## How to run

First you will need to create a firebase application, and then install firebase-tools with ```npm install -g firebase-tools```

### Local development
* Clone the project and cd into project
* npm install
* Create an index.js file in path functions-src/config with contents

```
export const CONFIG = {
    // Add users emails to be set as admins at registration
    adminUsersEmails: ['admin@user.com']
};
```

* In a command line/terminal execute 
```cd into functions-src and do npm install and npm run build``` to build the cloud functions


* npm start and go to [link](*http://localhost:3000*)

### Deployment
* npm install
* npm run build
* npm run deploy

## Key technologies & Libraries used
* Material UI (1.1.0) - (for ui components)
* React Router
* Redux
* Typescript
* React (of course)



