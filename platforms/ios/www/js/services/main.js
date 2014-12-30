(function(){
	'use strict';

	// twitter
	angular.module('twitter').service('TwitterService', function(){
		var twit = new Codebird();
		twit.setConsumerKey(secrets.twitter.consumerKey, secrets.twitter.consumerSecret);

		// set up application-only auth
		if(!localStorage.twitterBearerToken ||
			localStorage.twitterBearerToken === 'undefined'){
			twit.__call('oauth2_token', {}, function(reply){
				if (!reply){
					console.error('oauth2_token not found');
				} else {
					localStorage.twitterBearerToken = reply.access_token;
					twit.setBearerToken(reply.access_token);
				}
			});
		} else {
			twit.setBearerToken(localStorage.twitterBearerToken);
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

	// youTube
	angular.module('youTube').service('YouTubeService', function($http){
		function getLatestVideo(callback){
			var request = {
				'method': 'GET',
				'url': 'https://www.googleapis.com/youtube/v3/search',
				'params': {
					'channelId': secrets.youTube.channelId,
					'key': secrets.youTube.apiKey,
					'order': 'date',
					'part': 'snippet',
					'maxResults': 1
				}
			};

			$http(request).success(function onSuccess(data){
				var items = data.items;
				if (items.length !== 1){
					callback('not the correct number of videos');
				} else {
					callback(false, items[0]);
				}
			}).error(function onError(data, status){
				callback(data);
			});
		}

		return {
			getLatestVideo: getLatestVideo
		};
	});

	angular.module('hitbox').service('HitboxService', function($http){
		function isLive(callback){
			var request = {
				'method': 'GET',
				'url': 'http://api.hitbox.tv/user/' + secrets.hitbox.username
			};
			$http(request).success(function onSuccess(data){
				callback(false, data.is_live);
			}).error(function onError(data){
				callbac(data);
			});
		}

		return {
			isLive: isLive
		};
	});
})();