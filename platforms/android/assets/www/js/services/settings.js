(function() {
	'use strict';

	angular.module('settings').factory('$settings', function(RequestFactory){
		return {
			get: function get(callback){
				if (!window.localStorage.deviceId || !window.localStorage.deviceType){
					console.log('SETTINGS\tDevice id not found');
					return callback("Device id not found");
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
			},
			set: function set(data, callback){
				RequestFactory.request(
					{
						'id': window.localStorage.deviceId,
						'type': window.localStorage.deviceType
					},
					'PUT',
					'/settings',
					data,
					function(data,stats){
						callback(false,data);
					},
					function(data,status){
						callback(data);
					}
				);
			}
		};
	});
})();