(function(){
    'use strict';
    var module = angular.module('app', ['onsen', 'sampleFactory']);

    module.controller('AppController', function($scope, $data) {
        $scope.doSomething = function() {
            setTimeout(function() {
                alert('tappaed');
            }, 100);
        };

        $scope.status = device.platform;
    });

    module.controller('DetailController', function($scope, $data) {
        $scope.item = $data.selectedItem;
    });

    module.controller('MasterController', function($scope, $data) {
        $scope.items = $data.items;

        $scope.showDetail = function(index) {
            var selectedItem = $data.items[index];
            $data.selectedItem = selectedItem;
            $scope.ons.navigator.pushPage('detail.html', {title : selectedItem.title});
        };
    });

    document.addEventListener('deviceready', function(){
        console.log("deviceready");
        module.run(function(){
            console.log("function");
            /*var pushNotification = window.plugins.pushNotification;
            if (device.platform.toLowerCase() === 'android'){
                console.log("android");
                pushNotification.register(
                    successHandler,
                    errorHandler,
                    {
                        "senderID":"replace_with_sender_id",
                        "ecb":"onNotification"
                    }
                );
            } else {
                console.log("UNKNOWN");
            }*/
        });
    });

    function successHandler(){
        console.log("Success!");
    }

    function errorHandler(){
        console.log("Error");
    }
})();

