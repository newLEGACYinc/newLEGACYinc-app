(function() {
	'use strict';

	angular.module('settings', []).controller('SettingsController', function($scope, $settingsList) {
		$scope.items = $settingsList;
	});
})();