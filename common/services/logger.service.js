(function(){
    'use strict';
    angular.module('blocks.logger', [])
        .service('Logger', Logger);
    Logger.$inject = ['$log', 'Notification'];
    function Logger($log, Notification){
        var service = {
            showToasts: true,
            error   : error,
            info    : info,
            success : success,
            warning : warning,
            // straight to console; bypass Notification
            log     : $log.log
        };

        return service;
        /////////////////////

        function error(message, title, data) {
            Notification.error({message: message, title: title});
            $log.error('Error: ' + message, data);
        }

        function info(message, title, data) {
            Notification.info({message: message, title: title});
            $log.info('Info: ' + message, data);
        }

        function success(message, title, data) {
            Notification.success({message: message, title: title});
            $log.info('Success: ' + message, data);
        }

        function warning(message, title, data) {
            Notification.warning({message: message, title: title});
            $log.warn('Warning: ' + message, data);
        }

    }
}());