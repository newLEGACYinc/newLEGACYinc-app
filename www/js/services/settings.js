(function() {
	'use strict';

	angular.module('settings').factory('$settings', function(RequestFactory){
		return {
			get: function get(callback){
				if (!window.localStorage.deviceId || !window.localStorage.deviceType){
					console.log('SETTINGS\tDevice id not found');
					return null;
				}
				RequestFactory.request(
					{
						'id': window.localStorage.deviceId,
						'type': window.localStorage.deviceType
					},
					'GET',
					'/settings',
					null,
					function(data,status){
						callback(false, data);
					},
					function(data,status){
						console.log('error getting settings:' + data + status);
						callback(data);
					}
				);
			}
		};
	});
})();