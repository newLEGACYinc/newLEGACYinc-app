(function(){
	'use strict';

	angular.module('http-request', []).factory('RequestFactory', function(){
		// TODO the below is a hacky work-around and should probably be changed
		var initInjector = angular.injector(['ng']);
		var $http = initInjector.get('$http');

		return {
			request: function(headers, method, path, data, okCallback, errCallback){
				headers["password"] = window.secrets.serverPassword;
				var config = {
					headers: headers,
					method: method,
					url: 'https://www.' + window.secrets.serverUrl + path,
					data: data
				};
				$http(config).success(okCallback).error(errCallback);
			}
		};
	});
})();