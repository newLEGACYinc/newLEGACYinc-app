(function(){
    'use strict';

    document.addEventListener('deviceready', function(){
        angular.module('app', ['onsen', 'sampleFactory', 'appController', 'detail', 'master']);
        angular.bootstrap(document, ['app']);
    }, false);
})();

