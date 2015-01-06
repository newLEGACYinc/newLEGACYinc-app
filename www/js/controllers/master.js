
(function() {
	'use strict';

	// initialize modules
	// TODO this code should be somewhere else
	angular.module('twitter', []);
	angular.module('youTube', []);
	angular.module('hitbox', []);

	angular.module('twitter').controller('TwitterController', function($scope, TwitterService) {
		// initialize scope object
		$scope.twitter = {
			username: secrets.twitter.username
		};

		// set logo click action
		$scope.twitter.logoClick = function(){
			var browserUri = encodeURI('http://twitter.com/' + secrets.twitter.username);
			var appUri = encodeURI('twitter://user?screen_name=' + secrets.twitter.username);
			checkApplication(browserUri, appUri, function(uri){
				window.open(uri, '_system');
			});
		};

		// view
		var linkElem = document.querySelector('#twitter-tweet-link');
		linkify(linkElem);

		TwitterService.getLatestStatus(function(status){
			$scope.twitter.status = status[0].text;
			$scope.twitter.time_ago = parseTwitterDate(status[0].created_at);
			$scope.twitter.tweetClick = function(){
				var browserUri = encodeURI('http://twitter.com/' + secrets.twitter.username + '/status/' + status[0].id_str);
				var appUri = encodeURI('twitter://status?id=' + status[0].id_str);

				checkApplication(browserUri, appUri, function(uri){
					window.open(uri, '_system');
				});
			};
			$scope.$apply();
		});

		/**
		 * http://stackoverflow.com/a/6549563/1222411
		 * @param tdate
		 * @returns {string}
		 */
		function parseTwitterDate(tdate) {
			var system_date = new Date(Date.parse(tdate));
			var user_date = new Date();
			var diff = Math.floor((user_date - system_date) / 1000);
			if (diff <= 1) {return "just now";}
			if (diff < 20) {return diff + " seconds ago";}
			if (diff < 40) {return "half a minute ago";}
			if (diff < 60) {return "less than a minute ago";}
			if (diff <= 90) {return "one minute ago";}
			if (diff <= 3540) {return Math.round(diff / 60) + " minutes ago";}
			if (diff <= 5400) {return "1 hour ago";}
			if (diff <= 86400) {return Math.round(diff / 3600) + " hours ago";}
			if (diff <= 129600) {return "1 day ago";}
			if (diff < 604800) {return Math.round(diff / 86400) + " days ago";}
			if (diff <= 777600) {return "1 week ago";}
			return "on " + system_date;
		}

		/**
		 * check for the existence of Twitter application on device (if possible)
		 * callback(appUri) if exists, callback(browserUri) otherwise
		 * @param browserUri
		 * @param appUri
		 * @param callback
		 */
		function checkApplication(browserUri, appUri, callback){
			if (typeof CanOpen === 'undefined'){
				callback(browserUri);
			} else {
				// check to see if user can open native link
				CanOpen('twitter://', function(isInstalled){
					if (isInstalled) {
						callback(appUri);
					} else {
						callback(browserUri);
					}
				});
			}
		}
	});

	angular.module('youTube').controller('YouTubeController', function($scope, YouTubeService){
		// youTube
		$scope.youTube = {
			username: secrets.youTube.username
		};

		// view
		var linkElem = document.querySelector('#youTube-video-link');
		linkify(linkElem);

		YouTubeService.getLatestVideo(function onVideo(error, video){
			if (error){
				// TODO visual feedback
				console.error(error);
			} else {
				$scope.youTube.video = video;
				$scope.youTube.videoClick = function(){
					window.open(encodeURI('http://youtube.com/watch?v=' + video.id.videoId), '_system');
				};
			}
		});
	});

	angular.module('hitbox').controller('HitboxController', function($scope, HitboxService){
		$scope.hitbox = {
			username: secrets.hitbox.username
		};
		HitboxService.isLive(function(error, status){
			if (error){
				// TODO visual feedback
				console.error(error);
			} else {
				$scope.hitbox.status = status;
			}
		});
	});

	/**
	 * Handles 'fake-active' class for Android bug work-around
	 * More info: http://stackoverflow.com/q/4940429/1222411
	 * @param elem
	 */
	function linkify(elem){
		angular.element(elem).on('touchstart', function(e){
			angular.element(this).addClass('fake-active');
		});
		angular.element(elem).on('touchend', function(e){
			angular.element(this).removeClass('fake-active');
		});
		angular.element(elem).on('tap', function(e){
			e.preventDefault();
			//angular.element(this).removeClass('fake-active');
			return false;
		});
	}
})();