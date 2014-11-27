(function() {
	'use strict';

	angular.module('settings').factory('$settings', function(RequestFactory){
		return {
			get: function(){
				// TODO return from server
				return ['hitbox', 'Twitch', 'Youtube'];
			}
		};
	});
})();