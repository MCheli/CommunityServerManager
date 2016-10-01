# CommunityServerManager
A simple utility for group managing shell scripts on a community server.  Just install this repo onto the server that has the applicaitons you would like to group manage, type npm start, and navigate to the server's IP address to be able to execute scripts from anywhere on it.

Also download the Community Server Manager mobile app from the Apple app store (pending approval)!  Repo for Ionic mobile app:  https://github.com/MCheli/CommunityServerManagerApp 

##Prerequisite Software
- Node
- NPM
- Bower

##Install
###Application Install
This is a relatively straightforward node application install.  By default CORS is enabled to allow mobile app users to connect to it.  Feel free to modify the node port, rest endpints, etc. to your liking.

1.  `git clone https://github.com/MCheli/CommunityServerManager.git`
2.  `npm install`
3.  `bower install`

###Database Install
This application used MongoDB database in order to persistantly store it's information.  This database does not have to be local to the server, as the application does.  By default the server will connect to a Heroku hosted Mongo DB, but this NEEDS to be changed in order for your application to start.

1.  Install Application
2.  Install MongoDB in location of choosing.
3.  Edit the config.js file located in the root of the application to include the new Mongo URL.
4.  Start sever (see portion below).
5.  Create a new user with register
6.  Manually edit the MongoDB database to change the admin option of your user to "Admin".  At least one admin is required to promote others.

##Start Server

1. `npm start`
2.  Navigate to `localhost:3000`
