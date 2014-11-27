//http://intown.biz/2014/04/11/android-notifications/
(function(){
    'use strict';

    angular.module('pushNotifications', ['http-request'])
        .factory('PushProcessingService', ['RequestFactory', function (RequestFactory){
            function onDeviceReady(){
                if (!window.plugins || !window.plugins.pushNotification){
                    console.log("PUSH\tPush plugin not available");
                    return;
                }
                var pushNotification = window.plugins.pushNotification;
                if(window.device.platform.toLowerCase() === 'android'){
                    console.log('PUSH\tRegistering with GCM server');
                    window.onNotificationGCM = onNotificationGCM;
                    pushNotification.register(gcmSuccessHandler, gcmErrorHandler, {
                        'senderID': window.secrets.gcmProjectNumber,
                        'ecb': 'window.onNotificationGCM'
                    });
                }
            }
            function gcmSuccessHandler(result){
                console.log('PUSH\tRegister success. Result = ' + result);
            }
            function gcmErrorHandler(error){
                console.log(error);
            }
            return {
                initialize: function (){
                    console.log('PUSH\tInitializing');
                    if (window.deviceReady){
                        onDeviceReady();
                    } else {
                        console.log('ERROR\tDevice not yet ready');
                        document.addEventListener('deviceready', onDeviceReady, false);
                    }
                },
                registerID : function (id){
                    RequestFactory.request(
                        {},
                        'PUT',
                        'https://www.' + window.secrets.serverUrl + '/gcm/register',
                        {
                            'id': id
                        },
                        function success(){
                            console.log('PUSH  Registration with app server success');
                        },
                        function failure(){
                            console.log('PUSH  Registration with app server failure');
                        }
                    );
                    window.localStorage.setItem("deviceId", id);
                },
                unregister : function () {
                    console.info('PUSH\tunregister');
                    var pushNotification = window.plugins.pushNotification;
                    if (pushNotification){
                        pushNotification.unregister(function (){
                            console.info('PUSH\tunregister success');
                        });
                    }
                }
            };
        }]);

    function onNotificationGCM(e){
        console.log('onNotificationGCM received event ' + e.event + '');
        switch (e.event){
            case 'registered':
                if (e.regid.length > 0){
                    console.log('Registered with GCM Server -> REGID: ' + e.regid + '');
                    var $injector = angular.injector(['pushNotifications']);
                    var myService = $injector.get('PushProcessingService');
                    myService.registerID(e.regid);
                }
                break;
            case 'message':
                messageHandler(e);
                break;
            case 'error':
                console.log('ERROR -&gt; MSG:' + e.msg + '');
                break;

            default:
                console.log('EVENT -&gt; Unknown, an event was received and we do not know what it is');
                break;
        }

    }

    function messageHandler(e){
        // if this flag is set, this notification happened while we were in the foreground.
        // you might want to play a sound to get the user's attention, throw up a dialog, etc.
        if (e.foreground)
        {
            //we're using the app when a message is received.
            console.log('--INLINE NOTIFICATION--' + '');
        }
        else
        {
            // otherwise we were launched because the user touched a notification in the notification tray.
            if (e.coldstart) {
                console.log('--COLDSTART NOTIFICATION--' + '');
            } else {
                console.log('--BACKGROUND NOTIFICATION--' + '');
            }
            // TODO
        }

        console.log('MESSAGE -&gt; MSG: ' + e.payload.message + '');
        console.log('MESSAGE: '+ JSON.stringify(e.payload));
    }
})();