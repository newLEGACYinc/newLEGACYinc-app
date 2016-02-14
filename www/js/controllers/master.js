
(function() {
	'use strict';

	// initialize modules
	// TODO this code should be somewhere else
    angular.module('instagram', []);
	angular.module('twitter', []);
	angular.module('youTube', []);
	angular.module('hitbox', []);

    angular.module('instagram').controller('InstagramController', function($timeout, $scope, InstagramService){
        // initialize scope object
        $scope.instagram = {
            username: secrets.instagram.username,
            refresh: updateInstagram
        };

        // set logo click action
        $scope.instagram.logoClick = function(){
            var browserUri = encodeURI('http://instagram.com/' + secrets.instagram.username);
            window.open(browserUri, '_system');
        };

        // view
        var linkElem = document.querySelector('#instagram-link');
        linkify(linkElem);

        // update instagram
        updateInstagram();

        function updateInstagram(){
            $scope.instagram.error = false;
            $scope.instagram.status = null;
            $scope.instagram.time_ago = null;
            safeApply($timeout, $scope);
            InstagramService.getLatestPost(function(err, post){
                if (err || !post){
                    console.error(err);
                    $scope.instagram.error = true;
                    return;
                }
                $scope.instagram.status = post.caption ? post.caption.text : '[no caption]';
                // don't ask me why it's times 1000
                // ask the creators of the Instagram API
                $scope.instagram.time_ago = parseTimeAgo(post.caption.created_time*1000);
                $scope.instagram.itemClick = function(){
                    var browserUri = encodeURI(post.link);
                    window.open(browserUri, '_system');
                };
                safeApply($timeout, $scope);
            });
        }
    });

	angular.module('twitter').controller('TwitterController', function($timeout, $scope, TwitterService) {
		// initialize scope object
		$scope.twitter = {
			username: secrets.twitter.username,
			refresh: updateTwitterStatus
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

		// update twitter status
		updateTwitterStatus();

		function updateTwitterStatus(){
			$scope.twitter.status = null;
			$scope.twitter.time_ago = null;
			$scope.twitter.tweetClick = null;
			$scope.twitter.error = false;
			safeApply($timeout, $scope);
			TwitterService.getLatestStatus(function(err, statuses){
				if (err || !statuses){
					console.error(err);
					$scope.twitter.error = true;
					return;
				}
				var status = statuses[0];
				$scope.twitter.status = getStatusText(status);
				$scope.twitter.time_ago = parseTimeAgo(status.created_at);
				$scope.twitter.tweetClick = function(){
					var browserUri = encodeURI('http://twitter.com/' + secrets.twitter.username + '/status/' + status.id_str);
					var appUri = encodeURI('twitter://status?id=' + status.id_str);

					checkApplication(browserUri, appUri, function(uri){
						window.open(uri, '_system');
					});
				};
				safeApply($timeout, $scope);
			});
		}

		/**
		 * Return the text of a status. Converts t.co links into actual links
		 * @param status
		 */
		function getStatusText(status){
			var text = status.text;
			for (var i = 0; i < status.entities.urls.length; i+=1){
				var url = status.entities.urls[i];
				text = text.replace(url.url, url.display_url);
			}
			return text;
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

	angular.module('youTube').controller('YouTubeController', function($timeout, $scope, YouTubeService){
		$scope.youTube = {
			refresh: refresh,
			username: secrets.youTube.username
		};

		$scope.youTube.logoClick = function logoClick(){
			window.open(encodeURI('http://youtube.com/user/' + secrets.youTube.username), '_system');
		};

		// view
		var linkElem = document.querySelector('#youTube-video-link');
		linkify(linkElem);

		refresh();

		function refresh() {
			$scope.youTube.error = false;
			$scope.youTube.video = null;
			safeApply($timeout, $scope);
			YouTubeService.getLatestVideo(function onVideo(error, video) {
				if (error || !video) {
					console.error(error);
					$scope.youTube.error = true;
				} else {
					$scope.youTube.video = video;
					$scope.youTube.videoClick = function () {
						window.open(encodeURI('http://youtube.com/watch?v=' + video.id.videoId), '_system');
					};
				}
			});
		}
	});

	angular.module('hitbox').controller('HitboxController', function($timeout, $scope, HitboxService){
		$scope.hitbox = {
			onClick: onClick,
			refresh: refresh,
			username: secrets.hitbox.username
		};

		// view
		var linkElem = document.querySelector('#hitbox-clickable');
		linkify(linkElem);

		refresh();

		function onClick() {
			var uri = encodeURI('http://www.hitbox.tv/' + secrets.hitbox.username);
			window.open(uri, '_system');
		}

		function refresh() {
			$scope.hitbox.status = null;
			$scope.hitbox.error = false;
			safeApply($timeout, $scope);
			HitboxService.getUser(function (error, data) {
				if (error || !data) {
					console.error(error);
					$scope.hitbox.error = true;
				} else {
					if (!data){
						$scope.hitbox.status = null;
						$scope.hitbox.lastOnline = null;
						return;
					}
					$scope.hitbox.status = data.is_live;
					$scope.hitbox.lastOnline = parseTimeAgo(data.live_since + ' Z');
					HitboxService.getInfo(function (error, info) {
						if (error) {
							// TODO something
							console.error(error);
						} else {
							$scope.hitbox.description = info;
						}
					});
				}
			});
		}
	});

	/**
	 * http://stackoverflow.com/a/6549563/1222411
	 * @param tdate
	 * @returns {string}
	 */
	function parseTimeAgo(tdate) {
		var system_date = moment(tdate);
		var user_date = moment();
		var diff = Math.floor((user_date - system_date) / 1000);
		if (diff <= 1) {return "just now";}
		if (diff < 20) {return diff + " seconds ago";}
		if (diff < 40) {return "half a minute ago";}
		if (diff < 60) {return "less than a minute ago";}
		if (diff <= 90) {return "one minute ago";}
		if (diff <= 3540) {return Math.round(diff / 60) + " minutes ago";}
		if (diff <= 5400) {return "1 hour ago";}
		if (diff <= 86400) {return Math.round(diff / (60*60)) + " hours ago";}
		if (diff <= 129600) {return "1 day ago";}
		if (diff < 604800) {return Math.round(diff / (60*60*24)) + " days ago";}
		if (diff <= 777600) {return "1 week ago";}
		if (diff <= 1814400) {return Math.round(diff / (60*60*24*7)) + " weeks ago"}
		return "on " + system_date;
	}

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

	function safeApply($timeout, $scope){
		$timeout(function(){
			$scope.$apply();
		});
	}

	window.safeApply = safeApply;
})();
