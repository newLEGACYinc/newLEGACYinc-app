(function(){
    'use strict';

    document.addEventListener('deviceready', function setWindowDeviceReady(){
        window.deviceReady = true;
    });

    document.addEventListener('deviceready', function bootstrapApp(){
        // bind angular to application
        var module = angular.module('app', ['onsen', 'about', 'twitter', 'youTube',
            'hitbox', 'pushNotifications', 'settings']);

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