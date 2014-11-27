(function() {
	'use strict';

	angular.module('settings', ['http-request']).controller('SettingsController', function($scope, $settings) {
		$settings.get(function(err, data){
			if (err){
				// TODO
				console.log(err);
				return;
			}
			$scope.settings = data;
			var loadingIcon = document.getElementById('settings-get-loading');
			angular.element(loadingIcon).remove();
			$scope.$apply(); // push changes to UI
		});
	});
})();