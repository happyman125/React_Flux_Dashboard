# Dashboard
Weather and Google calendar dashboard built with [React](http://facebook.github.io/react/) &amp; [Flux](https://facebook.github.io/flux/)

[![Build Status](https://drone.io/github.com/danesparza/Dashboard/status.png)](https://drone.io/github.com/danesparza/Dashboard/latest)

*To build, make sure you have the latest version of [Node](https://nodejs.org/) installed.  Node is just used for [package management](https://docs.npmjs.com/cli/npm) and to ease local development.  If you've never used Node before, it's a quick install and [there are installers for multiple platforms](https://nodejs.org/download/), including Windows, Linux and OSX.*

### Quick Start

After [cloning the repo](https://help.github.com/articles/fetching-a-remote/), run the following commands in the project directory to get the required Javascript package dependencies and build the `bundle.js` file:

```bash
npm install
npm start
```

This will also watch your local system for any changes.  If you make changes to any referenced components, the `bundle.js` file will automatically be rebuilt.

#### How do I hack on this locally? 

##### Install your editor
I recommend getting [Sublime Text](http://www.sublimetext.com/) (with the [ReactJS plugins](https://github.com/reactjs/sublime-react)) to edit your source code locally.  Sublime does a great job with lots of different formats and with the React plugins it does a great job of formatting your components.  

##### Install a simple web server
You can get away with just opening local files in a browser for simple prototypes, but once you start calling external API's, running a local web server is a requirement.  I recommend [http-server](https://www.npmjs.com/package/http-server).  Setting it up is a snap once you have node installed.  Just run the following from a command line: 

```bash
npm install http-server -g
```
To start the server, navigate to the root of the project directory and type:
```bash
http-server .
```
This will start a server at http://localhost:8080 that serves content from your project directory.  

##### Rebuild your source automagically
If you're going to make changes locally, I recommend you have another command line window open automatically building bundle.js for you when you make changes. 

Navigate to the project directory and type:
```bash
npm install
npm start
```

### The dime tour
The app is constructed using ReactJS and the Flux architecture.  

[ReactJS](http://facebook.github.io/react/) is a new way of designing user interfaces on the web, written by the Facebook Engineering team. 

[Flux](http://facebook.github.io/flux/docs/overview.html) is a way of passing data around a web app.  In our case, we use Flux on the client side -- since this is a single page app.  

Flux is best illustrated with this diagram:

