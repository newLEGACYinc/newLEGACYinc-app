(function() {
	'use strict';

	angular.module('settings').factory('$settingsList', function(){
		// TODO return from server
		return ['hitbox', 'Twitch', 'Youtube'];
	});
})();