(function() {
	'use strict';

	angular.module('detail',[]).controller('DetailController', function($scope, $data) {
		$scope.item = $data.selectedItem;
	});
})();