(function() {
	'use strict';

	angular.module('appController', []).controller('AppController', function($scope, $data) {
		$scope.doSomething = function() {
			setTimeout(function() {
				alert('tappaed');
			}, 100);
		};

		$scope.status = device.platform;
	});
})();