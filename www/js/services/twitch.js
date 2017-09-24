(function() {
	'use strict';

	angular.module('twitch').service('TwitchService', function($http){
		function getLastOnline(callback){
			var request = {
				'method': 'GET',
				'url': window.secrets.serverUrl + '/data/twitch/lastOnline'
			};
			$http(request).success(function onSuccess(data){
				callback(false, data);
			}).error(function onError(data){
				callback(data);
			});
		}

		function getInfo(callback){
			const url = window.secrets.serverUrl + '/data/twitch';
			var request = {
				'method': 'GET',
				'url': url
			};
			$http(request).success(function onSuccess(data){
				callback(false, data);
			}).error(function onError(data){
				callback(data);
			});
		}

		return {
			getLastOnline: getLastOnline,
			getInfo: getInfo
		};
	});
})();
