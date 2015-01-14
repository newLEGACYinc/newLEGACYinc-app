(function() {
	'use strict';

	angular.module('settings', ['http-request']).controller('SettingsController', function init($timeout, $scope, $settings) {
		// set save button to be greyed out
		$scope.saveDisabled = true;

		// initialize settings to values from server
		$settings.get(function(err, data){
			if (err || !data){
				console.log(err);
				$scope.error = true;
				window.safeApply($timeout, $scope);
				return;
			}

			// remove loading icon
			var loadingIcon = document.getElementById('settings-get-loading');
			angular.element(loadingIcon).remove();

			// enable save icon
			$scope.saveDisabled = false;

			// push changes to UI
			$scope.settings = data;
			window.safeApply($timeout, $scope);
		});

		$scope.saveSettings = function(){
			// disable save button
			$scope.saveDisabled = true;
			$settings.set($scope.settings, function(err, data){
				if (err){
					console.log(err);
					alert("ERROR: " + err);
				}
				$scope.saveDisabled = false;
				window.safeApply($timeout, $scope);
			});
		};
	});
})();