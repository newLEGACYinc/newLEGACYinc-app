(function() {
	'use strict';

	angular.module('settings', ['http-request']).controller('SettingsController', function init($timeout, $scope) {
		function setupListeners(data){
			for (var topic in data) {
				if (data[topic]) {
					FCMPlugin.subscribeToTopic(topic);
				} else {
					FCMPlugin.unsubscribeFromTopic(topic);
				}
			}
		}

		// set save button to be greyed out
		$scope.saveDisabled = true;

		var DEFAULT_DATA = {
			Hitbox: true,
			Twitch: true,
			YouTube: true
		};

		// initialize settings to values from LocalStorage
		var storage = window.localStorage;
		var data = JSON.parse(storage.getItem("settings"));
		if (!data){
			data = DEFAULT_DATA;
			storage.setItem("settings", JSON.stringify(data));
			setupListeners(data);
		};

		// enable save icon
		$scope.saveDisabled = false;

		// push changes to UI
		$scope.settings = data;
		window.safeApply($timeout, $scope);

		$scope.saveSettings = function(){
			storage.setItem("settings", JSON.stringify($scope.settings));
			setupListeners($scope.settings);
		};
	});
})();