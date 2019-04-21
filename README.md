# Dashboard [![Circle CI](https://circleci.com/gh/danesparza/Dashboard.svg?style=shield)](https://circleci.com/gh/danesparza/Dashboard) [![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Weather and Google calendar dashboard built with [React](http://facebook.github.io/react/) &amp; [Flux](https://facebook.github.io/flux/).  Automatic builds using [Circle CI 2.x](https://circleci.com/gh/danesparza/Dashboard)

* Location & Calendar data from [Google](https://console.developers.google.com)
* Weather data from [Yahoo weather](https://www.yahoo.com/news/weather/) or [Darksky](https://darksky.net) services
* Pollen data (by zipcode) from allergy med sites
* Earthquake data from [USGS](https://earthquake.usgs.gov/) official APIs 
* Breaking news from [CNN breaking news](https://twitter.com/cnnbrk)

## Installing / using
Get the latest release, [here](https://github.com/danesparza/Dashboard/releases/latest) and unzip to the webserver of your choice (including [S3](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html)).  

You'll need to enable Google calendar, geolocation, and static maps integration:
* First, [Create a project in the Google API console](https://developers.google.com/calendar/auth#OAuth2Authorizing).  
* Next, create an Oauth clientId.  Make sure to [specify the URL for the dashboard in the Javascript Origins](https://developers.google.com/identity/protocols/OAuth2UserAgent#enable-apis) section of the project.
* Using your new clientId, [update the clientId in the CalendarAPIUtils.js, here](https://github.com/danesparza/Dashboard/blob/master/src/utils/CalendarAPIUtils.js#L20).
* Then, create a new API key for your project in the Google developer console
* Using your new API key, update the API key in the [LocationAPIUtil.js](https://github.com/danesparza/Dashboard/blob/master/src/utils/LocationAPIUtils.js#L9) file.

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
