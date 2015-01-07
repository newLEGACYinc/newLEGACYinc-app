(function() {
	'use strict';

	// initialize modules
	// TODO this code should be somewhere else
	angular.module('about', []);

	angular.module('about').controller('AboutController', function($scope, $sce, AboutService){
		AboutService.getPage(function(error, data){
			if (error){
				console.error(error);
			} else {
				// parse markdown to html
				var renderer = new marked.Renderer();
				renderer.link = function(href, title, text){
					console.log(href,title,text);
					return '<a href="#" onClick="window.open(\'' + href + '\', \'_system\')">' +
						text + '</a>';
				};
				var html = marked(data, {breaks: true, renderer: renderer});

				// insert into page
				$scope.page = $sce.trustAsHtml(html);
			}
		});
	});
})();