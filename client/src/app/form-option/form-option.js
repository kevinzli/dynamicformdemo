(function() {
  'use strict';

  /**
   * @name  config
   * @description config block
   */
  function config($stateProvider) {
    $stateProvider
      .state('root.form-option', {
        url: '/form-option',
        views: {
          '@': {
            templateUrl: 'src/app/form-option/form-option.tpl.html',
            controller: 'FormOptionCtrl'
          }
        }
      });
  }

  /**
   * @name  FormOptionCtrl
   * @description Controller
   */
  function FormOptionCtrl($scope, $log, $state, Backand, BackandService, DynamicFormService) {

    $scope.load = function () {
        DynamicFormService.readAll('formTemplate')  
          .then(function (response) {
            $scope.data = response.data;
        });
    }

    $scope.status = {
        isopen: false
    };


    $scope.load();
  }

  angular.module('form-option', ['ngTouch','ui.bootstrap'])
    .config(config)
    .controller('FormOptionCtrl', ['$scope','$log', '$state', 'Backand','BackandService','DynamicFormService', FormOptionCtrl]);
})();
