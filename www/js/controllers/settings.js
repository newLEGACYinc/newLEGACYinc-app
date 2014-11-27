(function() {
	'use strict';

	angular.module('settings', ['http-request']).controller('SettingsController', function($scope, $settings) {
		// initialize settings to values from server
		$settings.get(function(err, data){
			if (err){
				// TODO
				console.log(err);
				return;
			}

			// remove loading icon
			var loadingIcon = document.getElementById('settings-get-loading');
			angular.element(loadingIcon).remove();

			// push changes to UI
			$scope.settings = data;
			$scope.$apply();
		});


	});
})();