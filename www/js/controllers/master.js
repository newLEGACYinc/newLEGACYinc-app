
(function() {
	'use strict';

	// initialize modules
	// TODO this code should be somewhere else
    angular.module('instagram', []);
	angular.module('twitter', []);
	angular.module('youTube', []);
	angular.module('twitch', []);

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
                $scope.instagram.time_ago = moment(post.caption.created_time*1000).fromNow();
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
				$scope.twitter.time_ago = moment(status.created_at).fromNow();
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

	angular.module('twitch').controller('TwitchController', function($timeout, $scope, TwitchService){
		$scope.twitch = {
			onClick: onClick,
			refresh: refresh,
			username: secrets.twitch.username
		};

		// view
		var linkElem = document.querySelector('#twitch-clickable');
		linkify(linkElem);

		refresh();

		function onClick() {
			var uri = encodeURI('https://www.twitch.tv/' + secrets.twitch.username);
			window.open(uri, '_system');
		}

		function refresh() {
			$scope.twitch.status = null;
			$scope.twitch.error = false;
			safeApply($timeout, $scope);
			TwitchService.getInfo(function (error, data) {
				if (error) {
					console.error(error);
					$scope.twitch.error = true;
				} else {
					if (!data){
						$scope.twitch.status = null;
						TwitchService.getLastOnline(function (error, lastOnline) {
							if (error) {
								// TODO ???
								console.error(error);
							} else {
								$scope.twitch.lastOnline = moment(lastOnline).fromNow();
							}
						});
					} else {
						$scope.twitch.status = "LIVE";
						$scope.twitch.description = data.channel.status;
					}
				}
			});
		}
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

	function safeApply($timeout, $scope){
		$timeout(function(){
			$scope.$apply();
		});
	}

	window.safeApply = safeApply;
})();
