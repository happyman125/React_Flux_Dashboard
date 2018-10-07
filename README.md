# Dashboard [![Circle CI](https://circleci.com/gh/danesparza/Dashboard.svg?style=shield)](https://circleci.com/gh/danesparza/Dashboard) [![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Weather and Google calendar dashboard built with [React](http://facebook.github.io/react/) &amp; [Flux](https://facebook.github.io/flux/).  Automatic builds using [Circle CI 2.x](https://circleci.com/gh/danesparza/Dashboard)

## Installing / using
Get the latest release, [here](https://github.com/danesparza/Dashboard/releases/latest) and unzip to the webserver of your choice (including [S3](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html)).  

If you plan on using the Google Calendar integration, you'll need to [register a project in the Google API console](https://developers.google.com/calendar/auth#OAuth2Authorizing).  Make sure to [specify the URL for the dashboard in the Javascript Origins](https://developers.google.com/identity/protocols/OAuth2UserAgent#enable-apis) section of the project.

Grab your new clientId from the Google API console project you just created and [update the clientId in the CalendarAPIUtils.js, here](https://github.com/danesparza/Dashboard/blob/master/src/utils/CalendarAPIUtils.js#L20).

## Building, running
To build, use:
```
yarn
yarn build
```
You can now use the build to host the app anywhere (including AWS S3)

To run locally, first get all the dependencies:
```
yarn
```
Then, you can debug locally: 
```
yarn start
```


## Screenshot

![Dashboard screenshot](dashboard.cagedtornado.com.png?raw=true)
