# Dashboard
Weather and Google calendar dashboard built with [React](http://facebook.github.io/react/) &amp; [Flux](https://facebook.github.io/flux/)

Screenshot:

![Dashboard screenshot](screen_dashboard_small.png?raw=true)

[![Build Status](https://drone.io/github.com/danesparza/Dashboard/status.png)](https://drone.io/github.com/danesparza/Dashboard/latest)

*To build, make sure you have the latest version of [Node](https://nodejs.org/) installed.  Node is just used for [package management](https://docs.npmjs.com/cli/npm) and to ease local development.  If you've never used Node before, it's a quick install and [there are installers for multiple platforms](https://nodejs.org/download/), including Windows, Linux and OSX.*

## Quick Start
[Browserify](http://browserify.org/) is used for dependency management. [Uglify](https://github.com/mishoo/UglifyJS2) is used for script minimization/compression.  [Babel](https://babeljs.io/) is used for [ES6](https://babeljs.io/docs/learn-es2015/) transpiling.  If you don't have these installed, just run:
```bash
npm install -g browserify uglify-js babel
```

After [cloning the repo](https://help.github.com/articles/fetching-a-remote/), run the following commands in the project directory to get the required Javascript package dependencies and build the `bundle.js` file:

```bash
npm install
npm start
```

This will also watch your local system for any changes.  If you make changes to any referenced components, the `bundle.js` file will automatically be rebuilt.  

For a production-use minified bundle.js, run the following command:

```bash
npm run build
```

### How do I hack on this locally? 

##### Install your editor
I recommend getting [Sublime Text](http://www.sublimetext.com/) (with the [ReactJS plugins](https://github.com/reactjs/sublime-react)) to edit your source code locally.  Sublime does a great job with lots of different formats and with the React plugins it does a great job of formatting your components.  

##### Install a simple web server
You can get away with just opening local files in a browser for simple prototypes, but once you start calling external API's, running a local web server is a requirement.  I recommend [http-server](https://www.npmjs.com/package/http-server).  Setting it up is a snap once you have node installed.  Just run the following from a command line: 

```bash
npm install http-server -g
```
To start the server, navigate to the root of the project directory and type:
```bash
http-server
```
This will start a server at http://localhost:8080 that serves content from your project directory.  

##### Rebuild your source automagically
When making changes locally, I recommend you have another command line window open automatically building bundle.js for you when you make changes. 

Navigate to the project directory and type:
```bash
npm install
npm start
```

### The dime tour
The app is constructed using ReactJS and the Flux architecture.  

##### ReactJS
[ReactJS](http://facebook.github.io/react/) is a new way of designing user interfaces on the web, written by the Facebook Engineering team. React lets you compose your UI with a collection of components.  If you're new to React, the [thinking in React](http://facebook.github.io/react/docs/thinking-in-react.html) tutorial is a good place to start.

##### Flux
[Flux](http://facebook.github.io/flux/docs/overview.html) is a way of passing data around a web app.  In our case, we use Flux on the client side -- since this is a single page app.  

Flux is best illustrated with this diagram:
![Flux overview diagram](screen_flux_simple.png?raw=true)

A unidirectional data flow is central to the Flux pattern, and the above diagram should be **the primary mental model for the Flux programmer**. The dispatcher, stores and views are independent nodes with distinct inputs and outputs. The actions are simple objects containing the new data and an identifying type property.

##### How do you use React and Flux in the app?
Basically **React = UI** and **Flux = data flow**.  Following the diagram, above ...

Piece                       | Found in these source files
----------                  | -----------
API utils         | Found in [js\utils](https://github.com/danesparza/Dashboard/tree/master/js/utils).  These fetch data using an Ajax call and pass it to an Action.
Actions      | Found in [js\actions](https://github.com/danesparza/Dashboard/tree/master/js/actions). Actions are the entry point for data in the system.  
Dispatcher   | Found in [js\dispatcher\AppDispatcher](https://github.com/danesparza/Dashboard/blob/master/js/dispatcher/AppDispatcher.js) Taken verbatim from the Flux repo.  Take a look at it.  It's pretty simple.  It the app it just works as the 'spine' -- sending data from actions to stores that have asked for it.
Stores       | Found in [js\stores](https://github.com/danesparza/Dashboard/tree/master/js/stores).  Stores manage the state of one type of data.  When that data is updated, they let any interested parties know about it.  Stores also provide helper methods to get to their data.
Views             | Pretty much everything under [js\components](https://github.com/danesparza/Dashboard/tree/master/js/components).  These are all React comopnents.  The app is [DashboardApp.react](https://github.com/danesparza/Dashboard/blob/master/js/components/DashboardApp.react.js).  The two main pages are [DashboardHome](https://github.com/danesparza/Dashboard/blob/master/js/components/DashboardHome.react.js) and [DashboardSettings](https://github.com/danesparza/Dashboard/blob/master/js/components/DashboardSettings.react.js).  Everything else in that directory is a UI component that makes up the main dashboard screen.

##### Where is the data coming from?
There are 2 major data sources for the app:  [Forecast.io](https://developer.forecast.io/) and [Google calendar](https://developers.google.com/google-apps/calendar/). To make things a bit more straightforward to access, I have created 2 microservices that the app calls.  These microservices then fetch (and cache) data as needed:

Service           | Description                           | Found here
----------        | -------------                         | ------------
forecast-service  | Gets weather and pollen information   | [https://github.com/danesparza/forecast-service](https://github.com/danesparza/forecast-service)
calendar-service  | Gets Google calendar information      | [https://github.com/danesparza/calendar-service](https://github.com/danesparza/calendar-service)

