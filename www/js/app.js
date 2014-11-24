(function(){
    'use strict';

    document.addEventListener('deviceready', function(){
        var module = angular.module('app', ['onsen', 'sampleFactory', 'appController', 'detail', 'master', 'pushNotifications']);
        angular.bootstrap(document, ['app']);
        module.run(function(){
            PushProcessingService.initialize();
        });
    }, false);
})();

