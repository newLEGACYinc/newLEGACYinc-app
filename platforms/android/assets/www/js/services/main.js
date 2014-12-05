(function(){
	'use strict';
	angular.module('main').factory('$data', function() {
		var data = {};

		data.items = [
			{
				title: 'Another Item Title',
				desc: 'Ut enim ad minim veniam.'
			},
			{
				title: 'Yet Another Item Title',
				desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
			},
			{
				title: 'Yet Another Item Title',
				desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
			},
			{
				title: 'Yet Another Item Title',
				desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
			},
			{
				title: 'Yet Another Item Title',
				desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
			}
		];

		return data;
	});
})();