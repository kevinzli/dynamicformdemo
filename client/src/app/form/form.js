(function(){
	'use strict';

	/**
   * @name  config
   * @description config block
   */
  function config($stateProvider,formlyConfigProvider, BackandProvider) {
    $stateProvider
      .state('root.form', {
        url: '/form?templateId&id',
        views: {
          '@': {
            templateUrl: 'src/app/form/form.tpl.html',
            controller: 'FormCtrl as vm'
          }
        }
      });

      formlyConfigProvider.setType({
      name: 'input',
      templateUrl: 'input-template.html',
      wrapper: ['bootstrapLabel', 'bootstrapHasError'],
      overwriteOk: true
    	});
    
   		BackandProvider.setAppName('dynamicformdemo');
		BackandProvider.setSignUpToken('f11d9bc3-0233-44d6-905b-b580379549d3');
		BackandProvider.setAnonymousToken('cbbe5b31-fd4d-4648-bd98-e0425d3380fe');
  }

   /**
   * @name  formCtrl
   * @description Controller
   */
       function FormCtrl($state, formservice, $stateParams) {

        var vm = this;

        //parameters
        vm.templateId= $stateParams.templateId;
        vm.id= $stateParams.id;

        vm.finishWizard = finishWizard;

        vm.isCreateNew = vm.id?false:true;
        vm.viewmode=vm.id?true:false;

        //get the dynamic form from javascript objects
        var dynamicForm;
        if(vm.templateId==1){
        	dynamicForm= formservice.getFormFromJavascriptObjects('requestinspection');
    	}

        //get form from JSON string
        /*var dynamicForm= formservice.getFormFromJSON('requestinspection');
        vm.viewmode=true;*/

        // The model object that we reference
	    // on the  element in index.html
	    vm.model = dynamicForm.model;
	    console.log(JSON.stringify(vm.model).escapeSpecialChars());

	    //option to make the form readonly
	    vm.options = {
	      formState: {
	        readOnly: false,
	        disabled: vm.viewmode
	      }
	    };

	    // An array of our form fields with configuration
	    // and options set. We make reference to this in
	    // the 'fields' attribute on the  element
	    //vm.fields = dynamicForm.fields;
	    vm.fields=[];
	    console.log(JSON.stringify(vm.fields).escapeSpecialChars());
		    
		vm.originalFields = angular.copy(vm.fields);

		//get the dynamic form from the formservice
       formservice.getFormFromServer(vm.templateId).success(function(response){
       		vm.fields= JSON.parse(response.templateJson);
       		vm.originalFields = angular.copy(vm.fields);
       });

       if(vm.id){
	       formservice.getModelFromServer(vm.id).success(function(response){
	       		vm.model= JSON.parse(response.fromJson);
	       		vm.viewmode=true;
       			vm.options.formState.disabled=vm.viewmode;
	       });
	   }

		// function definition
	    function finishWizard() {
	    	if(vm.options.formState.disabled){
	    		alert("Form is in View Mode!");
	    		return;
	    	};

	    	var stringifiedmodel= JSON.stringify(vm.model);
	    	var escapedStringifiedModel= stringifiedmodel.escapeSpecialChars();
	    	//console.log(stringifiedmodel);
	    	console.log(escapedStringifiedModel);
	      	alert(JSON.stringify(vm.model), null, 2);

	      	//created time: 2015-12-02T06:11:37.315Z
	      	var currentdate = new Date(); 
			var created = currentdate.getFullYear() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getDate() + "T"  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds()+ ".315Z";

	      	var data={
	      		"templateId": vm.templateId.toString(),
	      		"fromJson": escapedStringifiedModel,
	      		"created": created
	      	};

	      formservice.createNewForm(data)  
	          .then(function (response) {
	            $state.go('root.home');
	        });
	    }
	};


	String.prototype.escapeSpecialChars = function() {
    	return this.replace(/\\/g, "\\\\");
    			   //.replace(/\"/g, "\\\"");
	};

	angular.module('form', ['formly', 'formlyBootstrap', 'mgo-angular-wizard','backand', 'ui.router'])
		.config(config)
		.controller('FormCtrl', ['$state', 'formservice', '$stateParams', FormCtrl]);

})();
