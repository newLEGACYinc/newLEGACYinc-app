(function(){
	'use strict';

	// twitter
	angular.module('twitter').service('TwitterService', function($http){
		function getLatestStatus(callback){
			var request = {
				'method': 'GET',
				'url': 'https://' + secrets.serverUrl + '/data/twitter'
			};

			$http(request).success(function (data){
				callback(false, data);
			}).error(function (err){
				callback(err);
			})
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
				'url': 'https://' + secrets.serverUrl + '/data/youtube'
			};

			$http(request).success(function onSuccess(data){
				console.log(data);
				var items = data.items;
				if (items.length !== 1){
					callback('not the correct number of videos');
				} else {
					callback(false, items[0]);
				}
			}).error(function onError(data){
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
				callback(data);
			});
		}

		function getInfo(callback){
			var request = {
				'method': 'GET',
				'url': 'http://api.hitbox.tv/media'
			};
			$http(request).success(function onSuccess(data){
				try {
					var livestream = data['livestream'];
					for (var i = 0; i < livestream.length; i++){
						var element = livestream[i];
						if (element['media_user_name'].toUpperCase() === secrets.hitbox.username.toUpperCase()) {
							var status = element['media_status'];
							return callback(false, status);
						}
					}
				} catch(e){
					console.error(e.stack);
					return callback(e);
				}
			}).error(function onError(data){
				callback(data);
			});
		}

		return {
			getInfo: getInfo,
			isLive: isLive
		};
	});
})();