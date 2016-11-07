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
    var newsItem = this.props.news[0];

    //  If we have an item, but it's not in the last 6 hours, don't display it:
    var newsCreatedTime = Moment(newsItem.createtime * 1000);
    if(newsCreatedTime.isBefore(Moment().subtract(4, 'hours')))
    {
      return null;
    }    

    //  Clean up the text (remove the links - both http and https)
    var newsText = newsItem.text;
    if(newsText.indexOf("http"))
    {
      newsText = newsText.substring(0, newsText.indexOf("http"));
    }

    //  Set the time format:
    var formattedTime = newsCreatedTime.fromNow();

  	return (
        <div id='breaking-news'>
          <div id='breaking-wrapper'>
            <img id='breaking-news-image' src={newsItem.url} />
            <div id='breaking-news-caption-wrapper'>
              <div id='breaking-news-caption'><span id='breaking-news-caption-intro'>{newsText}</span> {formattedTime}</div>
            </div>
          </div>
        </div>
    );
  }
});

module.exports = NewsDisplay;
