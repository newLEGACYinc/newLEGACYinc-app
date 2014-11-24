(function(){
    'use strict';

    document.addEventListener('deviceready', function setWindowDeviceReady(){
        window.deviceReady = true;
    });

    document.addEventListener('deviceready', function bootstrapApp(){
        var module = angular.module('app', ['onsen', 'sampleFactory', 'appController',
            'detail', 'master', 'pushNotifications']);
        angular.bootstrap(document, ['app']);
    }, false);
})();

