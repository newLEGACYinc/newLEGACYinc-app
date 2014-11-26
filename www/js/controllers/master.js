
(function() {
	'use strict';

	angular.module('main', []).controller('MasterController', function($scope, $data) {
		$scope.items = $data.items;

		$scope.showDetail = function(index) {
			var selectedItem = $data.items[index];
			$data.selectedItem = selectedItem;
			$scope.ons.navigator.pushPage('detail.html', {title : selectedItem.title});
		};
	});
})();