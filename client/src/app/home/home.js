(function() {
  'use strict';

  /**
   * @name  config
   * @description config block
   */
  function config($stateProvider) {
    $stateProvider
      .state('root.home', {
        url: '/',
        views: {
          '@': {
            templateUrl: 'src/app/home/home.tpl.html',
            controller: 'HomeCtrl as home',
            resolve: {
              data: function(DataService) {
                return DataService.get();
              }
            }
          }
        }
      });
  }

  /**
   * @name  HomeCtrl
   * @description Controller
   */
  function HomeCtrl($scope, $log, $state, Backand, BackandService, DynamicFormService) {
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
              
              DynamicFormService.update('form',id, data).then(function(response){
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
        { name: 'id', enableCellEdit: false, displayName: 'Id', width: '5%' },
        { name: 'templateId', enableCellEdit: false, enableFiltering:false, displayName: 'TemplateId', width: '10%' },
        { name: 'fromJson', enableCellEdit: false, displayName: 'Form JSON', width: '60%' },
        { name: 'created', enableCellEdit: false, enableFiltering:false, displayName: 'Created', width: '15%' },
        { name: 'action', displayName: 'Actions', enableFiltering:false, cellTemplate: 
             '<div class="grid-action-cell">'+
             '<a href ui-sref="root.form({templateId: row.entity.templateId, id: row.entity.id })">View</a></div>', width: '10%'}
             //'<a ng-click="$event.stopPropagation(); grid.appScope.viewThisForm(row.entity);" href="#">View</a></div>', width: '10%'}
      ];

    $scope.load = function () {
        DynamicFormService.readAll('form',$scope.pagination.pageSize, $scope.pagination.pageNumber, $scope.sort,$scope.filter)  
          .then(function (response) {
            $scope.gridOptions.data = response.data;
            $scope.pagination.totalItems = response.totalRows;
        });
    }

    $scope.load();

    $scope.viewThisForm = function(rowEntity) {
      $state.go('root.form', { templateId: rowEntity.templateId, id: rowEntity.id });
    };

    $scope.selectForm= function(){
      $state.go('root.form-option');
    };

  }

  angular.module('home', ['ngTouch','ui.grid', 'ui.grid.edit'])
    .config(config)
    .controller('HomeCtrl',['$scope','$log', '$state', 'Backand','BackandService','DynamicFormService',HomeCtrl]);
})();
