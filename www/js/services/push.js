//http://intown.biz/2014/04/11/android-notifications/
(function(){
    'use strict';

    angular.module('pushNotifications', []).factory('PushProcessingService', function (){
        function onDeviceReady(){
            console.log('PUSH: Registering with server');
            var pushNotification = window.plugins.pushNotification;
            if(window.device.platform.toLowerCase() === 'android'){
                pushNotification.register(gcmSuccessHandler, gcmErrorHandler, {
                    'senderID': window.secrets.gcmAppID,
                    'ecb': 'onNotificationGCM'
                });
            }
        }
        function gcmSuccessHandler(result){
            console.log('pushNotification register success. ' + result);
        }
        function gcmErrorHandler(error){
            console.log(error);
        }
        return {
            initialize: function (){
                console.log('PUSH   Initializing');
                if (window.deviceReady){
                    onDeviceReady();
                } else {
                    document.addEventListener('deviceready', onDeviceReady, false);
                }
            },
            registerID : function (id){
                // TODO
                //Insert code here to store the user's ID on your notification server.
                //You'll probably have a web service (wrapped in an Angular service of course) set up for this.
                //For example:
                MyService.registerNotificationID(id).then(function(response){
                    if (response.data.Result) {
                        console.log('NOTIFY  Registration succeeded');
                    } else {
                        console.log('NOTIFY  Registration failed');
                    }
                });
            },
            unregister : function () {
                console.info('unregister');
                var pushNotification = window.plugins.pushNotification;
                if (pushNotification){
                    pushNotification.unregister(function (){
                       console.info('unregister success');
                    });
                }
            }
        };
    }).run(function(PushProcessingService){
        // TODO move run function to somewhere that actually makes sense
        console.log('running pushprocessingservice initialize');
        PushProcessingService.initialize();
    });

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
                    var elem = angular.element(document.querySelector('[ng-app]'));
                    var injector = elem.injector();
                    var myService = injector.get('PushProcessingService');
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