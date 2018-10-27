/* global gapi */

import moment from 'moment';

//  Actions
import CalendarActions from '../actions/CalendarActions';

//  Stores
import SettingsStore from '../stores/SettingsStore';

var utils;

class CalendarAPIUtils {

    constructor() {
        utils = this;

        // Your Client ID and API key can be retrieved from your project in the Google
        // Developer Console, https://console.developers.google.com
        this.client_id = '737977399720-tj5tl7jvqmt5jh3kp72j02i62uetlkkn.apps.googleusercontent.com';
        this.scopes = ["https://www.googleapis.com/auth/calendar.readonly"];
    }

    /* Call the google API to get the list of calendars */
    getCalendarList() {
        console.log("Getting calendar list");

        //  Create the request
        let request = gapi.client.calendar.calendarList.list();

        //  Execute the request and get the response
        request.execute(function (resp) {
            let cals = resp.items;
            if ((typeof cals !== 'undefined') && cals.length > 0) {
                //  Call the action to receive the data:
                CalendarActions.recieveCalendarList(cals);
            } else {
                console.log("There was a problem getting the list of calendars");
            }
        });
    }

    /* Call the google API to get the list of events for a calendarid */
    getCalendarEvents(calendarId) {
        console.log("Getting calendar events for calendarId", calendarId);

        //  Set the min/max times for event display:
        let timeMin = (new Date()).toISOString();
        let tempTime = moment().endOf('day').toDate();
        let timeMax = tempTime.toISOString();

        //  Create the request
        let requestParams = {
            'calendarId': calendarId,
            /* Can be 'primary' or a given calendarid */
            'timeMin': timeMin,
            'timeMax': timeMax,
            'showDeleted': false,
            'singleEvents': true,
            'orderBy': 'startTime'
        };

        //  console.log("Requesting calendar events: ", requestParams);
        let request = gapi.client.calendar.events.list(requestParams);

        request.then(function (resp) {
            CalendarActions.recieveCalendarData(resp.result, calendarId);
        }, function (reason) {
            // Handle error
            /* If we get a strange response we attempt to re-authenticate */
            console.log("Got a strange response: ", reason, " - Trying to re-authenticate");
            utils.authorizeCalendar();
        });

    }

    /* Get authorization from the google API for the given scope(s) */
    authorizeCalendar() {
        console.log("Attempting to authorize with Google...");
        try{
            gapi.auth.authorize({
                'client_id': utils.client_id,
                'scope': utils.scopes,
                'immediate': true
            }, utils.handleCalendarAuthResult);
        } catch(e){
            console.log("There was a problem attempting to authorize the Google calendar.  Reattempting in 10 seconds...");
            window.setTimeout(utils.authorizeCalendar, 10000);
        }
    }

    /* Initiate auth flow in response to user clicking authorize button. */
    handleCalendarAuthClick(event) {
        console.log("Initiating auth flow", event);
        
        gapi.auth.authorize({
            'client_id': this.client_id,
            'scope': this.scopes,
            'immediate': false
        }, utils.handleCalendarAuthResult);
        return false;
    }

    /* Handle the google API authorization response */
    handleCalendarAuthResult(authResult) {
        console.log("Auth result", authResult);

        if (authResult && !authResult.error) {
            //  Indicate that the auth check is complete:
            CalendarActions.recieveCalendarAuthCheckResult(true);

            // Load the calendar API ...
            gapi.client.load('calendar', 'v3', function () {

                //  Then load the list of calendars
                utils.getCalendarList();

                //  Get the latest calendar information if we have a calendar selected:
                let settings = SettingsStore.getSettings();
                if (settings.calendarid !== "") {
                    utils.getCalendarEvents(settings.calendarid);
                }
            });

        } else {
            // We're not authorized yet.  We should
            // allow the user to authorize
            CalendarActions.recieveCalendarAuthCheckResult(false);
        }
    }
}

export default new CalendarAPIUtils();