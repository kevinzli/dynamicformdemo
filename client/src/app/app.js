(function() {
  'use strict';

  angular.element(document).ready(function() {
    angular.bootstrap(document, ['app']);
  });

  function config(BackandProvider, $stateProvider, $urlRouterProvider, $logProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/');
    $logProvider.debugEnabled(true);

    /*BackandProvider.setAppName('dynamicformdemo');
    BackandProvider.setSignUpToken('f11d9bc3-0233-44d6-905b-b580379549d3');
    BackandProvider.setAnonymousToken('cbbe5b31-fd4d-4648-bd98-e0425d3380fe');
*/
    $httpProvider.interceptors.push('httpInterceptor');
    $stateProvider
      .state('root', {
        views: {
          'header': {
            templateUrl: 'src/common/header.tpl.html',
            controller: 'HeaderCtrl'
          },
          'footer': {
            templateUrl: 'src/common/footer.tpl.html',
            controller: 'FooterCtrl'
          }
        }
      });
  }

  function MainCtrl($log) {
    $log.debug('MainCtrl loaded!');
  }

  function run($log) {
    $log.debug('App is running!');
  }

  angular.module('app', [
      'ui.router',
      'backand',
      'home',
      'getting-started',
      'common.header',
      'common.footer',
      'common.services.backand',
      'common.services.data',
      'common.directives.version',
      'common.filters.uppercase',
      'common.interceptors.http',
      'templates',
      'ngTouch',
      'ui.grid',
      'ui.grid.edit'
    ])
    .config(config)
    .run(run)
    .controller('MainCtrl', MainCtrl)
    .value('version', '1.1.0')
    .service('DynamicFormService', ['$http','Backand', DynamicFormService]);

    function DynamicFormService($http,Backand) {
        var self = this;
        /*var baseUrl = Backand.getApiUrl() +'/1/objects/';
        var anonymousToken = {
            'AnonymousToken': 'cbbe5b31-fd4d-4648-bd98-e0425d3380fe'
        };
        
        var objectName = 'formTemplate';*/
        
        var baseUrl = 'https://api.backand.com/1/objects/';
        var anonymousToken = {
            'AnonymousToken': '78020290-5df3-44b8-9bdb-7b3b4fea2f25'
        };

        var objectName = 'products';

        self.readAll = function (pageSize, pageNumber,sort, filter) {
            return $http({
                method: 'GET',
                url: baseUrl + objectName,
                params: {
                    pageSize: pageSize,
                    pageNumber: pageNumber,
                    sort: sort,
                    filter: filter
                },
                headers: anonymousToken
            }).then(function (response) {
                return response.data;
            });
        };
        self.readOne = function (id) {
            return $http({
                method: 'GET',
                url: baseUrl + objectName + '/' + id,
                headers: anonymousToken
            }).then(function (response) {
                return response.data;
            });
        };
        self.create = function (data) {
            return $http({
                method: 'POST',
                url: baseUrl + objectName,
                data: data,
                params: {
                    returnObject: true
                },
                headers: anonymousToken
            }).then(function (response) {
                return response.data;
            });
        };
        self.update = function (id, data) {
            return $http({
                method: 'PUT',
                url: baseUrl + objectName + '/' + id,
                data: data,
                headers: anonymousToken
            }).then(function (response) {
                return response.data;
            });
        };
        self.delete = function (id) {
            return $http({
                method: 'DELETE',
                url: baseUrl + objectName + '/' + id,
                headers: anonymousToken
            });
        };
    }
})();
