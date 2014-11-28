(function() {
	'use strict';

	angular.module('settings', ['http-request']).controller('SettingsController', function init($scope, $settings) {
		// set save button to be greyed out
		$scope.saveDisabled = true;

		// initialize settings to values from server
		$settings.get(function(err, data){
			if (err){
				// TODO
				console.log(err);
				alert("ERROR: " + err);
				return;
			}

			// remove loading icon
			var loadingIcon = document.getElementById('settings-get-loading');
			angular.element(loadingIcon).remove();

			// enable save icon
			$scope.saveDisabled = false;

			// push changes to UI
			$scope.settings = data;
			$scope.$apply();
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
				$scope.$apply();
			});
		};
	});
})();