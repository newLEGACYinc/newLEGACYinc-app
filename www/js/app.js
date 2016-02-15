(function(){
    'use strict';

    document.addEventListener('deviceready', function setWindowDeviceReady(){
        window.deviceReady = true;
    });

    document.addEventListener('deviceready', function bootstrapApp(){
        // compile app module
        var module = angular.module('app', ['onsen', 'about', 'instagram', 'twitter', 'youTube',
            'hitbox', 'pushNotifications', 'settings']);

        // feature directive
        // this is needed to resize the gradient with the image
        angular.module('app').directive('featureimage', function ($timeout){
            return function (scope, element, attrs){
                // initialize height
                scope.gradientHeight = window.innerHeight + 10;

                window.onresize = function(){
                    window.safeApply($timeout, scope);
                };

                scope.watchHeight = function(){
                    // get image child
                    var img = element[0].querySelector('img');
                    return img.clientHeight;
                };

                scope.$watch(scope.watchHeight, function(newHeight){
                    scope.featureHeight = newHeight;
                    if (!scope.listFooterHeight) {
                        scope.gradientHeight = scope.featureHeight + 10;
                    } else {
                        scope.gradientHeight = Math.min(scope.featureHeight, scope.listFooterHeight) + 10;
                    }
                    window.safeApply($timeout, scope);
                }, true);
            };
        });
        angular.module('app').directive('mainlist', function ($timeout){
            return function (scope, element, attrs){
                scope.watchListHeight = function(){
                    return element[0].clientHeight;
                };

                scope.watchPageHeight = function(){
                    return element.parent()[0].clientHeight;
                };

                scope.$watch(scope.watchListHeight, watchFunction);
                scope.$watch(scope.watchPageHeight, watchFunction);

                function watchFunction(){
                    var parent = element.parent();
                    scope.listFooterHeight = parent[0].clientHeight - element[0].clientHeight;
                    if (!scope.featureHeight){
                        scope.gradientHeight = scope.listFooterHeight + 10;
                    } else {
                        scope.gradientHeight = Math.min(scope.featureHeight, scope.listFooterHeight) + 10;
                    }
                    window.safeApply($timeout, scope);
                }
            };
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
