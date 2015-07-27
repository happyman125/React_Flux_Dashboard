var React = require('react');
var Moment = require('moment');

var NewsDisplay = React.createClass({

  /**
   * @return {object}
   */
  render: function() {

    //  First, see if we have an item to display.
    if(this.props.news.length < 1) {
      return null;
    }

    //  If we do, get the first one:
    newsItem = this.props.news[0];

    //  If we have an item, but it's not in the last 6 hours, don't display it:
    var newsCreatedTime = Moment(newsItem.createtime * 1000);
    if(newsCreatedTime.isBefore(Moment().subtract(6, 'hours')))
    {
      return null;
    }

    //  Set the breaking news image:    
    newsImageStyle = {      
      backgroundImage: 'url(' + newsItem.MediaUrl + ')'
    };

    //  Set the time format:
    var formattedTime = newsCreatedTime.fromNow();

  	return (
        <div id='breaking-news'>
          <div id='breaking-news-image' style={newsImageStyle} />
          <div>
            <b>Breaking news {formattedTime} - </b>
            {newsItem.Text}
          </div>
        </div>
    );
  }
});

module.exports = NewsDisplay;
