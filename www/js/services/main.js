(function(){
	'use strict';

    // instagram
    angular.module('instagram').service('InstagramService', function($http){
        function getLatestPost(callback){
            var request = {
                'method': 'GET',
                'url': 'https://' + secrets.serverUrl + '/data/instagram'
            };

            $http(request).success(function(data){
                callback(false, data);
            }).error(function(err){
                callback(err);
            });
        }

        return {
            getLatestPost: getLatestPost
        }
    });

	// twitter
	angular.module('twitter').service('TwitterService', function($http){
		function getLatestStatus(callback){
			var request = {
				'method': 'GET',
				'url': 'https://' + secrets.serverUrl + '/data/twitter'
			};

			$http(request).success(function (data){
				callback(false, data);
			}).error(function (err){
				callback(err);
			})
		}

		return {
			getLatestStatus: getLatestStatus
		};
	});

	// youTube
	angular.module('youTube').service('YouTubeService', function($http){
		function getLatestVideo(callback){
			var request = {
				'method': 'GET',
				'url': 'https://' + secrets.serverUrl + '/data/youtube'
			};

			$http(request).success(function onSuccess(data){
				console.log(data);
				var items = data.items;
				if (items.length !== 1){
					callback('not the correct number of videos');
				} else {
					callback(false, items[0]);
				}
			}).error(function onError(data){
				callback(data);
			});
		}

		return {
			getLatestVideo: getLatestVideo
		};
	});
})();