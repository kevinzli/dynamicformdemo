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
            controller: 'GettingStartedCtrl'
          }
        }
      });
  }

  /**
   * @name  gettingStartedCtrl
   * @description Controller
   */
  function GettingStartedCtrl($scope, $log, $state, Backand, BackandService, DynamicFormService) {
    $scope.gridOptions = {
        excludeProperties: '__metadata',
        enablePaginationControls: false,
        useExternalSorting: true,
        useExternalFiltering: true,
        enableFiltering: true,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            //declare the events

            $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
              $scope.sort = [];
              angular.forEach(sortColumns, function(sortColumn) {
                $scope.sort.push({fieldName: sortColumn.name, order: sortColumn.sort.direction});
              });
  
              $scope.load();
            });

            $scope.gridApi.core.on.filterChanged($scope, function () {
              $scope.filter = [];

              var grid = this.grid;
              angular.forEach(grid.columns, function (column) {
                  var fieldName = column.field;
                  var value = column.filters[0].term;
                  var operator = "contains";
                  if (value) {
                      if (fieldName == "id") operator = "equals";
                      else if (fieldName == "price") operator = "greaterThanOrEqualsTo";
                      $scope.filter.push({
                          fieldName: fieldName,
                          operator: operator,
                          value: value
                      })
                  }
              });
              $scope.load();
          });

          $scope.gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
              var id = rowEntity.__metadata.id;
              var data = {};
              data[colDef.name] = newValue;
              
              DynamicFormService.update('formTemplate',id, data).then(function(response){
                  $scope.load(); //The change may trigger other server side action that may change additional data
                  //$scope.$apply();
              });
          });
        }
    };

    $scope.pagination = {
        pageSize: 5,
        pageNumber: 1,
        totalItems: null,
        getTotalPages: function () {
            return Math.ceil(this.totalItems / this.pageSize);
        },
        nextPage: function () {
            if (this.pageNumber < this.getTotalPages()) {
                this.pageNumber++;
                $scope.load();
            }
        },
        previousPage: function () {
            if (this.pageNumber > 1) {
                this.pageNumber--;
                $scope.load();
            }
        }
    };

    $scope.gridOptions.columnDefs = [
        { name: 'id', enableCellEdit: false, width: '5%' },
        { name: 'name', enableCellEdit: false, displayName: 'Name', width: '15%' },
        { name: 'description', enableCellEdit: false, displayName: 'Description', width: '15%' },
        { name: 'version', enableCellEdit: false, displayName: 'version', width: '10%' },
        { name: 'templateJson', enableCellEdit: false, displayName: 'Template JSON', width: '40%' },
        { name: 'created', enableCellEdit: false, displayName: 'Created', width: '15%'}

      ];

    $scope.load = function () {
        DynamicFormService.readAll('formTemplate',$scope.pagination.pageSize, $scope.pagination.pageNumber, $scope.sort,$scope.filter)  
          .then(function (response) {
            $scope.gridOptions.data = response.data;
            $scope.pagination.totalItems = response.totalRows;
        });
    }

    $scope.load();
  }

  angular.module('getting-started', ['ngTouch','ui.grid', 'ui.grid.edit'])
    .config(config)
    .controller('GettingStartedCtrl', ['$scope','$log', '$state', 'Backand','BackandService','DynamicFormService', GettingStartedCtrl]);
})();
