var NewsActions = require('../actions/NewsActions');

module.exports = {

    getTwitterFeed: function(user) {

	    //  The base url for the service - change this to your service location:
	    //  You can get this microservice for free at https://github.com/danesparza/twitter-breaking-news
	    var baseurl = "https://xcktpgt8r4.execute-api.us-east-1.amazonaws.com/v1/";

	    //  Get the news using the given user's screen name
	    var url = baseurl + user;

	    $.ajax( url )
	    .done(function(data) {
	    	//	Call the action to receive the data:
	    	NewsActions.recieveNewsData(data);
	    }.bind(this))
	    .fail(function() {
	    	//	Something bad happened
	    	console.log("There was a problem getting news");
	    });
  }, 

};