(function() {
	'use strict';

	angular.module('appController', []).controller('AppController', function($scope, $data) {
		$scope.doSomething = function() {
			window.open('https://youtube.com', '_system');
		};
	});
})();