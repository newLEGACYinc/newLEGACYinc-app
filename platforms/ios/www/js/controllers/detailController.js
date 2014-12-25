(function() {
	'use strict';
	document.addEventListener('deviceready', function(){
		angular.module('detail',[]).controller('DetailController', function($scope, $data) {
			$scope.item = $data.selectedItem;
		});
	}, false);
})();