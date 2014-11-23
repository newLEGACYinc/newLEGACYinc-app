(function(){
    'use strict';
    var module = angular.module('app', ['onsen']);

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

    module.factory('$data', function() {
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

