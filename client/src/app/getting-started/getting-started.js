(function() {
  'use strict';

  /**
   * @name  config
   * @description config block
   */
  function config($stateProvider) {
    $stateProvider
      .state('root.getting-started', {
        url: '/getting-started',
        views: {
          '@': {
            templateUrl: 'src/app/getting-started/getting-started.tpl.html',
            controller: 'GettingStartedCtrl as start'
          }
        }
      });
  }

  /**
   * @name  gettingStartedCtrl
   * @description Controller
   */
  function GettingStartedCtrl($log, $state, Backand, BackandService, DynamicFormService) {

    var start = this;

    start.gridOptions = {
        excludeProperties: '__metadata',
    };

    start.load = function () {
        DynamicFormService.readAll().then(function (response) {
            start.gridOptions.data = response.data;
        });
    }

    start.load();
  }

  angular.module('getting-started', ['ngTouch','ui.grid'])
    .config(config)
    .controller('GettingStartedCtrl', ['$log', '$state', 'Backand','BackandService','DynamicFormService', GettingStartedCtrl]);
})();
