(function(){
    'use strict';

    document.addEventListener('deviceready', function setWindowDeviceReady(){
        window.deviceReady = true;
    });

    document.addEventListener('deviceready', function bootstrapApp(){
        var module = angular.module('app', ['onsen', 'sampleFactory', 'appController',
            'detail', 'master', 'pushNotifications']);
        module.run(['PushProcessingService', function (PushProcessingService){
            console.log(PushProcessingService);
            PushProcessingService.initialize();
        }]);
        angular.bootstrap(document, ['app']);
    }, false);
})();

