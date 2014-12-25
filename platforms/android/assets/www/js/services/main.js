(function(){
	'use strict';
	angular.module('main').factory('$data', function() {
		var data = {};

		data.items = [
			{
				title: 'Item 1 Title',
				desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
			},
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