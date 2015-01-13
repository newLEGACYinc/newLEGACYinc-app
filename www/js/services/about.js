(function() {
	'use strict';

	angular.module('about').service('AboutService', function($http){
		function getPage(callback){
			$http.get('about.md').success(function(data){
				// remove 'About' header
				data = data.replace('# About', '');

				callback(false, data);
			}).error(function(data){
				callback(data);
			});
		}

		return {
			getPage: getPage
		};
	});
})();