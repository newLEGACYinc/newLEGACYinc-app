(function() {
	'use strict';

	angular.module('settings', ['http-request']).controller('SettingsController', function($scope, $settings) {
		$scope.items = $settings.get();
	});
})();