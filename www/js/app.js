(function(){
    'use strict';

    document.addEventListener('deviceready', function setWindowDeviceReady(){
        window.deviceReady = true;
    });

    document.addEventListener('deviceready', function bootstrapApp(){
        // compile app module
        var module = angular.module('app', ['onsen', 'about', 'twitter', 'youTube',
            'hitbox', 'pushNotifications', 'settings']);

        // feature directive
        // this is needed to resize the gradient with the image
        angular.module('app').directive('featureimage', function (){
            return function (scope, element, attrs){
                window.onresize = function(){
                    scope.$apply();
                };

                scope.watchHeight = function(){
                    // get image child
                    var img = element[0].querySelector('img');
                    return img.clientHeight;
                }
                scope.$watch(scope.watchHeight, function(newHeight){
                    scope.gradientHeight = newHeight;
                }, true)
            }
        });

        // initialize push processing service
        module.run(['PushProcessingService', function (PushProcessingService){
            PushProcessingService.initialize();
        }]);

        // setup on resume functionality
        document.addEventListener('resume', function(){
            console.log('on resume called');

            // refresh twitter
            var twitterScope = angular.element(document.getElementById('twitter')).scope().twitter;
            twitterScope.refresh();

            // refresh YouTube
            var youTubeScope = angular.element(document.getElementById('youTube')).scope().youTube;
            youTubeScope.refresh();

            // refresh hitbox
            var hitboxScope = angular.element(document.getElementById('hitbox')).scope().hitbox;
            hitboxScope.refresh();
        }, false);

        // bootstrap angular to document
        angular.bootstrap(document, ['app']);

        // hide splash screen
        if (navigator.splashscreen){
            setTimeout(function(){
                navigator.splashscreen.hide();
            }, 500);
        } else {
            console.log("MAIN\tnavigator.splashscreen not found");
        }
    }, false);
})();