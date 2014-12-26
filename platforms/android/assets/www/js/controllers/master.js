
(function() {
	'use strict';

	angular.module('main', []).controller('MasterController', function($scope, $data, TwitterService) {
		$scope.items = $data.items;

		// twitter
		$scope.twitter = {
			username: secrets.twitter.username
		}
		TwitterService.getLatestStatus(function(status){
			console.log(status);
			$scope.twitter.status = status[0].text;
			$scope.$apply();
		});

		$scope.showDetail = function(index) {
			var selectedItem = $data.items[index];
			$data.selectedItem = selectedItem;
			$scope.ons.navigator.pushPage('detail.html', {title : selectedItem.title});
		};
	});
})();