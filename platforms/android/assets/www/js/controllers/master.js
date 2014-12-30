
(function() {
	'use strict';

	// initialize module
	// TODO this code should be somewhere else
	angular.module('twitter', []);
	angular.module('youTube', []);
	angular.module('hitbox', []);

	angular.module('twitter').controller('TwitterController', function($scope, TwitterService) {
		// twitter
		$scope.twitter = {
			username: secrets.twitter.username
		};
		TwitterService.getLatestStatus(function(status){
			$scope.twitter.status = status[0].text;
			$scope.$apply();
		});
	});

	angular.module('youTube').controller('YouTubeController', function($scope, YouTubeService){
		// youTube
		$scope.youTube = {
			username: secrets.youTube.username
		};

		// view
		var linkElemn = document.querySelector('#youTube-video-link');
		angular.element(linkElemn).on('touchstart', function(e){
			angular.element(this).addClass('fake-active');
		});
		angular.element(linkElemn).on('touchend', function(e){
			angular.element(this).removeClass('fake-active');
		});
		angular.element(linkElemn).on('tap', function(e){
			e.preventDefault();
			//angular.element(this).removeClass('fake-active');
			return false;
		});

		YouTubeService.getLatestVideo(function onVideo(error, video){
			if (error){
				// TODO visual feedback
				console.error(error);
			} else {
				$scope.youTube.video = video;
				$scope.youTube.videoClick = function(){
					window.open(encodeURI('http://youtube.com/watch?v=' + video.id.videoId), '_system', 'location=yes');
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
})();