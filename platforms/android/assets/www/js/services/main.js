(function(){
	'use strict';

	angular.module('main').service('TwitterService', function(){
		var twit = new Codebird();
		twit.setConsumerKey(secrets.twitter.consumerKey, secrets.twitter.consumerSecret);

		// set up application-only auth
		if(!window.localStorage.twitterBearerToken){
			twit.__call('oauth2_token', {}, function(reply){
				window.localStorage.twitterBearerToken = reply.access_token;
				twit.setBearerToken(reply.access_token);
			});
		} else {
			twit.setBearerToken(window.localStorage.twitterBearerToken);
		}

		function getLatestStatus(callback){
			var params = {
				'screen_name': secrets.twitter.username,
				'exclude_replies': true,
				'count': 1
			};
			twit.__call(
				"statuses_userTimeline",
				params,
				function (reply) {
					callback(reply);
				},
				true // for application-only authentication
			);
		}

		return {
			getLatestStatus: getLatestStatus
		};
	});

	angular.module('main').service('$data', function(TwitterService) {
		var data = {};

		data.items = [
			{
				title: 'Item 1 Title',
				desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
			},
			{
				title: 'Another Item Title',
				desc: 'Ut enim ad minim veniam.'
			},
			{
				title: 'Yet Another Item Title',
				desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
			},
			{
				title: 'Yet Another Item Title',
				desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
			},
			{
				title: 'Yet Another Item Title',
				desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
			},
			{
				title: 'Yet Another Item Title',
				desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
			}
		];

		return data;
	});
})();