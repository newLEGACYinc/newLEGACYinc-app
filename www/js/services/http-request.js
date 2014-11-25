(function(){
	'use strict';

	angular.module('http-request', []).factory('RequestFactory', function(){
		// TODO the below is a hacky work-around and should probably be changed
		var initInjector = angular.injector(['ng']);
		var $http = initInjector.get('$http');

		return {
			request: function(method, url, data, okCallback, errCallback){
				$http({
					method: method,
					url: url,
					data: data
				}).success(okCallback).error(errCallback);
			}
		};
	});
})();