(function() {
	'use strict';

	angular.module('hitbox').service('HitboxService', function($http){
		function getUser(callback){
			var request = {
				'method': 'GET',
				'url': 'http://api.hitbox.tv/user/' + secrets.hitbox.username
			};
			$http(request).success(function onSuccess(data){
				callback(false, data);
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
					var livestream = data.livestream;
					for (var i = 0; i < livestream.length; i++){
						var element = livestream[i];
						if (element.media_user_name.toUpperCase() === secrets.hitbox.username.toUpperCase()) {
							var status = element.media_status;
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
			getUser: getUser,
			getInfo: getInfo
		};
	});
})();
