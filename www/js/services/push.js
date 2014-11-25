//http://intown.biz/2014/04/11/android-notifications/
(function(){
    'use strict';

    angular.module('pushNotifications', ['http-request'])
        .factory('PushProcessingService', ['RequestFactory', function (RequestFactory){
            function onDeviceReady(){
                console.log('PUSH\tRegistering with GCM server');
                var pushNotification = window.plugins.pushNotification;
                if(window.device.platform.toLowerCase() === 'android'){
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
                        //document.addEventListener('deviceready', onDeviceReady, false);
                    }
                },
                registerID : function (id){
                    // TODO
                    //Insert code here to store the user's ID on your notification server.
                    //You'll probably have a web service (wrapped in an Angular service of course) set up for this.
                    //For example:
                    RequestFactory.request(
                        'PUT',
                        'https://www.' + window.secrets.serverUrl + '/gcm/register',
                        {
                            'password': window.secrets.serverPassword,
                            'registrationId': id
                        },
                        function success(){
                            console.log('NOTIFY  Registration succeeded');
                        },
                        function failure(){
                            console.log('NOTIFY  Registration failed');
                        }
                    );
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
        console.log('EVENT -> RECEIVED:' + e.event + '');
        switch (e.event){
            case 'registered':
                if (e.regid.length > 0){
                    console.log('Registered with GCM Server -> REGID: ' + e.regid + '');

                    // TODO
                    //call back to web service in Angular.
                    //This works for me because in my code I have a factory called
                    //      PushProcessingService with method registerID
                    var $injector = angular.injector(['pushNotifications']);
                    var myService = $injector.get('PushProcessingService');
                    myService.registerID(e.regid);
                }
                break;
            case 'message':
                // if this flag is set, this notification happened while we were in the foreground.
                // you might want to play a sound to get the user's attention, throw up a dialog, etc.
                if (e.foreground)
                {
                    //we're using the app when a message is received.
                    console.log('--INLINE NOTIFICATION--' + '');

                    // if the notification contains a soundname, play it.
                    //var my_media = new Media(&quot;/android_asset/www/&quot;+e.soundname);
                    //my_media.play();
                    alert(e.payload.message);
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
                break;
            case 'error':
                console.log('ERROR -&gt; MSG:' + e.msg + '');
                break;

            default:
                console.log('EVENT -&gt; Unknown, an event was received and we do not know what it is');
                break;
        }

    }
})();