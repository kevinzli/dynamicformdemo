// scripts/formservice.js
(function(){

    'use strict';

    angular
        .module('form')
        .factory('formservice', formservice);
        
            function formservice($http,Backand) {
                function getExpeditedConcealDate(today){
                var expeditedConcealDate = new Date();
                var dd = expeditedConcealDate.getDate();
                if(!today){
                 dd += 2; //add two more days
                };

                var mm = expeditedConcealDate.getMonth()+1; //January is 0!
                var yyyy = expeditedConcealDate.getFullYear();

                if(dd<10) {
                    dd='0'+dd
                } 

                if(mm<10) {
                    mm='0'+mm
                } 

                expeditedConcealDate = mm+'/'+dd+'/'+yyyy;

                return expeditedConcealDate;
            }

            function getFormFromServer(id){
                var form ={};

               return $http({
                    method: 'GET',
                    url: Backand.getApiUrl() + '/1/objects/formTemplate/' + id,
                  });
            }

            function getModelFromServer(id){
                var form ={};

                return $http({
                    method: 'GET',
                    url: Backand.getApiUrl() + '/1/objects/form/' + id,
                  });
            }

            function createNewForm(data){
                return $http({
                    method: 'POST',
                    url: Backand.getApiUrl() + '/1/objects/form',
                    data: data,
                    params: {
                        returnObject: true
                    }
                }).then(function (response) {
                    return response.data;
                });
            }

            function updateAForm(id, data){
                return $http({
                    method: 'PUT',
                    url: Backand.getApiUrl() + '/1/objects/form/' + id,
                    data: data,
                    params: {
                        returnObject: true
                    }
                }).then(function (response) {
                    return response.data;
                });
            }

            function getFormFromJSON(type){
                var form ={};

                if(type=='requestinspection'){
                    //new 
                    //var savedModel="{\"expeditedConcealDate\":\"11/26/2015\",\"permitNumber\":\"EL-249067-2015\",\"installationAddress\":\"#1 Smithers Road Kitimat BC\",\"workDescription\":\"-Transfer of Bantrel Scope\\n-GTC West\",\"voltage\":\"\",\"amps\":\"\",\"phase\":\"\",\"fsrName\":\"MARK WORDEN\",\"originalFsrName\":\"MARK WORDEN\",\"fsrDeclarationDate\":\"11/24/2015\"}";

                    //update
                    var savedModel="{\"expeditedConcealDate\":\"11/26/2015\",\"permitNumber\":\"EL-249067-2015\",\"installationAddress\":\"#1 Smithers Road Kitimat BC\",\"workDescription\":\"-Transfer of Bantrel Scope\\n-GTC West\",\"voltage\":\"240\",\"amps\":\"40\",\"phase\":\"3\",\"fsrName\":\"MARK WORDEN\",\"originalFsrName\":\"MARK WORDEN\",\"fsrDeclarationDate\":\"11/24/2015\",\"inspectionType_roughwirecomplete\":true,\"inspectionType_readyForConnection\":false,\"roughWire\":\"partial\",\"serviceType\":\"serviceChange\",\"groundingElectrodeType\":\"other\",\"installationName\":\"cccccc\",\"declaration\":true,\"partialRoughWiringArea\":\"aaaaaa\",\"notesForSO\":\"bbbbbbbb\"}";
                    
                    //var schema='[{"name":"step1","formName":"vm.forms.step1","title":"INSPECTION TYPE","header":"Inspection Type","buttonText":"Continue","fields":[{"key":"inspectionType","type":"multiCheckbox","templateOptions":{"label":"INSPECTION TYPE","options":[{"id":"wip","title":"Work in Progress"},{"id":"oneEightyDays","title":"180-Day Safety Check"},{"id":"final","title":"Final - All Work Complete"}],"valueProp":"id","labelProp":"title"},"expressionProperties":{"templateOptions.disabled":"formState.disabled"}},{"key":"inspectionType_roughwirepartial","type":"checkbox","templateOptions":{"label":"Rough Wiring Inspection (Partial)"},"expressionProperties":{"templateOptions.disabled":"formState.disabled"}},{"key":"inspectionType_roughwirecomplete","type":"checkbox","templateOptions":{"label":"Rough Wiring Inspection (Complete)"},"expressionProperties":{"templateOptions.disabled":"formState.disabled"}},{"hideExpression":"!model.inspectionType_roughwirepartial&&!model.inspectionType_roughwirecomplete","fieldGroup":[{"key":"roughWire","type":"radio","templateOptions":{"label":"","required":true,"options":[{"name":"COMPLETE","value":"complete"},{"name":"PARTIAL","value":"partial"},{"name":"SLAB","value":"slab"},{"name":"UFER GROUND","value":"UFERGround"},{"name":"UNDERGROUND","value":"underground"}]},"expressionProperties":{"templateOptions.disabled":"formState.disabled"}},{"key":"partialRoughWiringArea","type":"input","templateOptions":{"label":"PARTIAL ROUGH WIRING AREA","readOnly":false},"expressionProperties":{"templateOptions.disabled":"formState.disabled"},"hideExpression":"!(model.roughWire===\\"partial\\")"},{"key":"expeditedConcealDate","type":"input","templateOptions":{"label":"Expedited Conceal Date (if submitted before 8:00 pm):","readOnly":true},"expressionProperties":{"templateOptions.disabled":"formState.disabled"}}]},{"key":"inspectionType_readyForConnection","type":"checkbox","templateOptions":{"label":"Electrical Installation Ready for Connection"},"expressionProperties":{"templateOptions.disabled":"formState.disabled"}},{"hideExpression":"!model.inspectionType_readyForConnection","fieldGroup":[{"key":"serviceType","type":"radio","templateOptions":{"label":"","required":true,"options":[{"name":"NEW SERVICE","value":"newService"},{"name":"SERVICE REPAIR","value":"serviceRepair"},{"name":"SERVICE CHANGE","value":"serviceChange"}]},"expressionProperties":{"templateOptions.disabled":"formState.disabled"}},{"hideExpression":"!(model.serviceType===\\"newService\\")&&!(model.serviceType===\\"serviceChange\\")","fieldGroup":[{"key":"oldServiceSize","type":"input","templateOptions":{"label":"OLD SERVICE SIZE"},"expressionProperties":{"templateOptions.disabled":"formState.disabled"},"hideExpression":"!(model.serviceType===\\"serviceChange\\")"},{"key":"newServiceSize","type":"input","templateOptions":{"label":"NEW SERVICE SIZE"},"expressionProperties":{"templateOptions.disabled":"formState.disabled"}},{"key":"groundingElectrodeType","type":"radio","templateOptions":{"label":"TYPE OF GROUNDING ELECTRODE","required":true,"options":[{"name":"ROD","value":"rod"},{"name":"UFER","value":"ufer"},{"name":"PLATE","value":"plate"},{"name":"OTHER","value":"other"}]},"expressionProperties":{"templateOptions.disabled":"formState.disabled"}},{"key":"groundingElectrodeTypeOther","type":"input","templateOptions":{"label":""},"expressionProperties":{"templateOptions.disabled":"formState.disabled"},"hideExpression":"!(model.groundingElectrodeType===\\"other\\")"}]}]},{"key":"notesForSO","type":"textarea","templateOptions":{"label":"NOTES FOR SAFETY OFFICER (OPTIONAL)","rows":3,"cols":15},"expressionProperties":{"templateOptions.disabled":"formState.disabled"}}]},{"name":"step2","formName":"vm.forms.step2","title":"INSTALLATION DETAILS","header":"Installation Details","buttonText":"Continue","fields":[{"key":"permitNumber","type":"input","templateOptions":{"label":"PERMIT NUMBER","readOnly":true},"expressionProperties":{"templateOptions.disabled":"formState.disabled"}},{"key":"installationAddress","type":"input","templateOptions":{"label":"INSTALLATION ADDRESS","readOnly":true},"expressionProperties":{"templateOptions.disabled":"formState.disabled"}},{"key":"installationName","type":"input","templateOptions":{"label":"INSTALLATION NAME"},"expressionProperties":{"templateOptions.disabled":"formState.disabled"}},{"key":"workDescription","type":"textarea","templateOptions":{"required":true,"label":"WORK DESCRIPTION","rows":2,"cols":15},"expressionProperties":{"templateOptions.disabled":"formState.disabled"}},{"key":"voltage","type":"select","templateOptions":{"label":"VOLTAGE (LINE-TO-LINE)","required":true,"options":[{"name":"Please Select","value":""},{"name":"ClassII","value":"ClassII"},{"name":"120","value":"120"},{"name":"208","value":"208"},{"name":"240","value":"240"},{"name":"277","value":"277"},{"name":"347","value":"347"},{"name":"480","value":"480"},{"name":"600","value":"600"},{"name":"24900","value":"24900"},{"name":"138000","value":"138000"}]},"expressionProperties":{"templateOptions.disabled":"formState.disabled"}},{"key":"amps","type":"select","templateOptions":{"label":"AMPS","required":true,"options":[{"name":"Please Select","value":""},{"name":"ClassII","value":"ClassII"},{"name":"15","value":"15"},{"name":"20","value":"20"},{"name":"30","value":"30"},{"name":"40","value":"40"},{"name":"60","value":"60"},{"name":"100","value":"100"},{"name":"600","value":"600"},{"name":"2000","value":"2000"},{"name":"3000","value":"3000"}]},"expressionProperties":{"templateOptions.disabled":"formState.disabled"}},{"key":"phase","type":"select","templateOptions":{"label":"PHASE","required":true,"options":[{"name":"Please Select","value":""},{"name":"1","value":"1"},{"name":"3","value":"3"}]},"expressionProperties":{"templateOptions.disabled":"formState.disabled"}}]},{"name":"step3","formName":"vm.forms.step3","title":"DECLARATION","header":"Declaration","buttonText":"Continue","fields":[{"key":"fsrName","type":"input","templateOptions":{"label":"FSR NAME","required":true},"expressionProperties":{"templateOptions.disabled":"formState.disabled"}},{"key":"fsrNumber","type":"input","templateOptions":{"label":"FSR NUMBER","required":true},"expressionProperties":{"templateOptions.disabled":"formState.disabled"},"hideExpression":"model.fsrName===model.originalFsrName"},{"key":"declaration","type":"checkbox","templateOptions":{"label":"","required":true},"expressionProperties":{"templateOptions.disabled":"formState.disabled","templateOptions.label":"\\"I, \\" + model.fsrName + \\", a Field Safety Representative for the above-licensed contractor, hereby declare that the electrical installation authorized under the above-mentioned permit is safe to inspect and has been installed to comply with the Safety Standards Act and Regulations of British Columbia. Checking this box and submitting this form to BC Safety Authority constitutes your declaration as the Field Safety Representative named here that you have physically examined the electrical work to confirm compliance under the Safety Standards Act. This has the same effect as submitting a handwritten signature.\\"","validation.show":"!model.declaration"}},{"key":"fsrDeclarationDate","type":"input","templateOptions":{"label":"FSR DECLARATION DATE","required":true},"expressionProperties":{"templateOptions.disabled":"formState.disabled"}}]}]';
                    var schema="[{\"name\":\"step1\",\"formName\":\"vm.forms.step1\",\"title\":\"INSPECTION TYPE\",\"header\":\"Inspection Type\",\"buttonText\":\"Continue\",\"fields\":[{\"key\":\"inspectionType\",\"type\":\"multiCheckbox\",\"templateOptions\":{\"label\":\"INSPECTION TYPE\",\"options\":[{\"id\":\"wip\",\"title\":\"Work in Progress\"},{\"id\":\"oneEightyDays\",\"title\":\"180-Day Safety Check\"},{\"id\":\"final\",\"title\":\"Final - All Work Complete\"}],\"valueProp\":\"id\",\"labelProp\":\"title\"},\"expressionProperties\":{\"templateOptions.disabled\":\"formState.disabled\"}},{\"key\":\"inspectionType_roughwirepartial\",\"type\":\"checkbox\",\"templateOptions\":{\"label\":\"Rough Wiring Inspection (Partial)\"},\"expressionProperties\":{\"templateOptions.disabled\":\"formState.disabled\"}},{\"key\":\"inspectionType_roughwirecomplete\",\"type\":\"checkbox\",\"templateOptions\":{\"label\":\"Rough Wiring Inspection (Complete)\"},\"expressionProperties\":{\"templateOptions.disabled\":\"formState.disabled\"}},{\"hideExpression\":\"!model.inspectionType_roughwirepartial&&!model.inspectionType_roughwirecomplete\",\"fieldGroup\":[{\"key\":\"roughWire\",\"type\":\"radio\",\"templateOptions\":{\"label\":\"\",\"required\":true,\"options\":[{\"name\":\"COMPLETE\",\"value\":\"complete\"},{\"name\":\"PARTIAL\",\"value\":\"partial\"},{\"name\":\"SLAB\",\"value\":\"slab\"},{\"name\":\"UFER GROUND\",\"value\":\"UFERGround\"},{\"name\":\"UNDERGROUND\",\"value\":\"underground\"}]},\"expressionProperties\":{\"templateOptions.disabled\":\"formState.disabled\"}},{\"key\":\"partialRoughWiringArea\",\"type\":\"input\",\"templateOptions\":{\"label\":\"PARTIAL ROUGH WIRING AREA\",\"readOnly\":false},\"expressionProperties\":{\"templateOptions.disabled\":\"formState.disabled\"},\"hideExpression\":\"!(model.roughWire===\\\"partial\\\")\"},{\"key\":\"expeditedConcealDate\",\"type\":\"input\",\"templateOptions\":{\"label\":\"Expedited Conceal Date (if submitted before 8:00 pm):\",\"readOnly\":true},\"expressionProperties\":{\"templateOptions.disabled\":\"formState.disabled\"}}]},{\"key\":\"inspectionType_readyForConnection\",\"type\":\"checkbox\",\"templateOptions\":{\"label\":\"Electrical Installation Ready for Connection\"},\"expressionProperties\":{\"templateOptions.disabled\":\"formState.disabled\"}},{\"hideExpression\":\"!model.inspectionType_readyForConnection\",\"fieldGroup\":[{\"key\":\"serviceType\",\"type\":\"radio\",\"templateOptions\":{\"label\":\"\",\"required\":true,\"options\":[{\"name\":\"NEW SERVICE\",\"value\":\"newService\"},{\"name\":\"SERVICE REPAIR\",\"value\":\"serviceRepair\"},{\"name\":\"SERVICE CHANGE\",\"value\":\"serviceChange\"}]},\"expressionProperties\":{\"templateOptions.disabled\":\"formState.disabled\"}},{\"hideExpression\":\"!(model.serviceType===\\\"newService\\\")&&!(model.serviceType===\\\"serviceChange\\\")\",\"fieldGroup\":[{\"key\":\"oldServiceSize\",\"type\":\"input\",\"templateOptions\":{\"label\":\"OLD SERVICE SIZE\"},\"expressionProperties\":{\"templateOptions.disabled\":\"formState.disabled\"},\"hideExpression\":\"!(model.serviceType===\\\"serviceChange\\\")\"},{\"key\":\"newServiceSize\",\"type\":\"input\",\"templateOptions\":{\"label\":\"NEW SERVICE SIZE\"},\"expressionProperties\":{\"templateOptions.disabled\":\"formState.disabled\"}},{\"key\":\"groundingElectrodeType\",\"type\":\"radio\",\"templateOptions\":{\"label\":\"TYPE OF GROUNDING ELECTRODE\",\"required\":true,\"options\":[{\"name\":\"ROD\",\"value\":\"rod\"},{\"name\":\"UFER\",\"value\":\"ufer\"},{\"name\":\"PLATE\",\"value\":\"plate\"},{\"name\":\"OTHER\",\"value\":\"other\"}]},\"expressionProperties\":{\"templateOptions.disabled\":\"formState.disabled\"}},{\"key\":\"groundingElectrodeTypeOther\",\"type\":\"input\",\"templateOptions\":{\"label\":\"\"},\"expressionProperties\":{\"templateOptions.disabled\":\"formState.disabled\"},\"hideExpression\":\"!(model.groundingElectrodeType===\\\"other\\\")\"}]}]},{\"key\":\"notesForSO\",\"type\":\"textarea\",\"templateOptions\":{\"label\":\"NOTES FOR SAFETY OFFICER (OPTIONAL)\",\"rows\":3,\"cols\":15},\"expressionProperties\":{\"templateOptions.disabled\":\"formState.disabled\"}}]},{\"name\":\"step2\",\"formName\":\"vm.forms.step2\",\"title\":\"INSTALLATION DETAILS\",\"header\":\"Installation Details\",\"buttonText\":\"Continue\",\"fields\":[{\"key\":\"permitNumber\",\"type\":\"input\",\"templateOptions\":{\"label\":\"PERMIT NUMBER\",\"readOnly\":true},\"expressionProperties\":{\"templateOptions.disabled\":\"formState.disabled\"}},{\"key\":\"installationAddress\",\"type\":\"input\",\"templateOptions\":{\"label\":\"INSTALLATION ADDRESS\",\"readOnly\":true},\"expressionProperties\":{\"templateOptions.disabled\":\"formState.disabled\"}},{\"key\":\"installationName\",\"type\":\"input\",\"templateOptions\":{\"label\":\"INSTALLATION NAME\"},\"expressionProperties\":{\"templateOptions.disabled\":\"formState.disabled\"}},{\"key\":\"workDescription\",\"type\":\"textarea\",\"templateOptions\":{\"required\":true,\"label\":\"WORK DESCRIPTION\",\"rows\":2,\"cols\":15},\"expressionProperties\":{\"templateOptions.disabled\":\"formState.disabled\"}},{\"key\":\"voltage\",\"type\":\"select\",\"templateOptions\":{\"label\":\"VOLTAGE (LINE-TO-LINE)\",\"required\":true,\"options\":[{\"name\":\"Please Select\",\"value\":\"\"},{\"name\":\"ClassII\",\"value\":\"ClassII\"},{\"name\":\"120\",\"value\":\"120\"},{\"name\":\"208\",\"value\":\"208\"},{\"name\":\"240\",\"value\":\"240\"},{\"name\":\"277\",\"value\":\"277\"},{\"name\":\"347\",\"value\":\"347\"},{\"name\":\"480\",\"value\":\"480\"},{\"name\":\"600\",\"value\":\"600\"},{\"name\":\"24900\",\"value\":\"24900\"},{\"name\":\"138000\",\"value\":\"138000\"}]},\"expressionProperties\":{\"templateOptions.disabled\":\"formState.disabled\"}},{\"key\":\"amps\",\"type\":\"select\",\"templateOptions\":{\"label\":\"AMPS\",\"required\":true,\"options\":[{\"name\":\"Please Select\",\"value\":\"\"},{\"name\":\"ClassII\",\"value\":\"ClassII\"},{\"name\":\"15\",\"value\":\"15\"},{\"name\":\"20\",\"value\":\"20\"},{\"name\":\"30\",\"value\":\"30\"},{\"name\":\"40\",\"value\":\"40\"},{\"name\":\"60\",\"value\":\"60\"},{\"name\":\"100\",\"value\":\"100\"},{\"name\":\"600\",\"value\":\"600\"},{\"name\":\"2000\",\"value\":\"2000\"},{\"name\":\"3000\",\"value\":\"3000\"}]},\"expressionProperties\":{\"templateOptions.disabled\":\"formState.disabled\"}},{\"key\":\"phase\",\"type\":\"select\",\"templateOptions\":{\"label\":\"PHASE\",\"required\":true,\"options\":[{\"name\":\"Please Select\",\"value\":\"\"},{\"name\":\"1\",\"value\":\"1\"},{\"name\":\"3\",\"value\":\"3\"}]},\"expressionProperties\":{\"templateOptions.disabled\":\"formState.disabled\"}}]},{\"name\":\"step3\",\"formName\":\"vm.forms.step3\",\"title\":\"DECLARATION\",\"header\":\"Declaration\",\"buttonText\":\"Continue\",\"fields\":[{\"key\":\"fsrName\",\"type\":\"input\",\"templateOptions\":{\"label\":\"FSR NAME\",\"required\":true},\"expressionProperties\":{\"templateOptions.disabled\":\"formState.disabled\"}},{\"key\":\"fsrNumber\",\"type\":\"input\",\"templateOptions\":{\"label\":\"FSR NUMBER\",\"required\":true},\"expressionProperties\":{\"templateOptions.disabled\":\"formState.disabled\"},\"hideExpression\":\"model.fsrName===model.originalFsrName\"},{\"key\":\"declaration\",\"type\":\"checkbox\",\"templateOptions\":{\"label\":\"\",\"required\":true},\"expressionProperties\":{\"templateOptions.disabled\":\"formState.disabled\",\"templateOptions.label\":\"\\\"I, \\\" + model.fsrName + \\\", a Field Safety Representative for the above-licensed contractor, hereby declare that the electrical installation authorized under the above-mentioned permit is safe to inspect and has been installed to comply with the Safety Standards Act and Regulations of British Columbia. Checking this box and submitting this form to BC Safety Authority constitutes your declaration as the Field Safety Representative named here that you have physically examined the electrical work to confirm compliance under the Safety Standards Act. This has the same effect as submitting a handwritten signature.\\\"\",\"validation.show\":\"!model.declaration\"}},{\"key\":\"fsrDeclarationDate\",\"type\":\"input\",\"templateOptions\":{\"label\":\"FSR DECLARATION DATE\",\"required\":true},\"expressionProperties\":{\"templateOptions.disabled\":\"formState.disabled\"}}]}]";
                    form={
                        model: JSON.parse(savedModel),
                        fields: JSON.parse(schema)
                    };
                };

                return form;

            }

            function getFormFromJavascriptObjects(type) {
                var form={};

                if(type=='requestinspection'){
                    form={
                        model: {
                            expeditedConcealDate: getExpeditedConcealDate(),
                            permitNumber: 'EL-249067-2015',
                            installationAddress: '#1 Smithers Road Kitimat BC',
                            workDescription: '-Transfer of Bantrel Scope\n-GTC West',
                            voltage: '',
                            amps: '',
                            phase: '',
                            fsrName: 'JAMES WOODS',
                            originalFsrName: 'JAMES WOODS',
                            fsrDeclarationDate: getExpeditedConcealDate(true),
                        },
                        fields: [
                        {
                            name: 'step1',
                            formName: 'vm.forms.step1',
                            title: 'INSPECTION TYPE',
                            header: 'Inspection Type',
                            buttonText: 'Continue',
                            fields: [
                        {
                            key: 'inspectionType',
                            type: 'multiCheckbox',
                            templateOptions: {
                                label: 'INSPECTION TYPE',
                                options: [
                                    {id: "wip", title: "Work in Progress"},
                                    {id: "oneEightyDays", title: "180-Day Safety Check"},
                                    {id: "final", title: "Final - All Work Complete"},
            /*                      {id: "roughwirepartial", title: "Rough Wiring Inspection (Partial)"},
                                    {id: "roughwirecomplete", title: "Rough Wiring Inspection (Complete)"},
                                    {id: "readyForConnection", title: "Electrical Installation Ready for Connection"}*/
                                ],
                                valueProp: 'id',
                                labelProp: 'title'
                            },
                            expressionProperties: {
                                "templateOptions.disabled": "formState.disabled"
                            }
                        },
                        {
                            key: 'inspectionType_roughwirepartial',
                            type: 'checkbox',
                            templateOptions: {
                                label: 'Rough Wiring Inspection (Partial)',
                            },
                            expressionProperties: {
                                "templateOptions.disabled": "formState.disabled"
                            }
                        },
                        {
                            key: 'inspectionType_roughwirecomplete',
                            type: 'checkbox',
                            templateOptions: {
                                label: 'Rough Wiring Inspection (Complete)',
                            },
                            expressionProperties: {
                                "templateOptions.disabled": "formState.disabled"
                            }
                        },
                        {
                            hideExpression: '!model.inspectionType_roughwirepartial&&!model.inspectionType_roughwirecomplete',
                            fieldGroup: [
                                {
                                    key: 'roughWire',
                                    type: 'radio',
                                    templateOptions: {
                                        label: '',
                                        required: true,
                                        options: [
                                            {name: 'COMPLETE', value: 'complete'},
                                            {name: 'PARTIAL', value: 'partial'},
                                            {name: 'SLAB', value: 'slab'},
                                            {name: 'UFER GROUND', value: 'UFERGround'},
                                            {name: 'UNDERGROUND', value: 'underground'}
                                        ]
                                    },
                                    expressionProperties: {
                                        "templateOptions.disabled": "formState.disabled"
                                    }
                                },
                                {
                                    key: 'partialRoughWiringArea',
                                    type: 'input',
                                    templateOptions: {
                                        label: 'PARTIAL ROUGH WIRING AREA',
                                        readOnly: false
                                    },
                                    expressionProperties: {
                                        "templateOptions.disabled": "formState.disabled"
                                    },
                                    hideExpression: '!(model.roughWire==="partial")'
                                },
                                {
                                    key: 'expeditedConcealDate',
                                    type: 'input',
                                    templateOptions: {
                                        label: 'Expedited Conceal Date (if submitted before 8:00 pm):',
                                        readOnly: true,
                                    },
                                    expressionProperties: {
                                        "templateOptions.disabled": "formState.disabled"
                                    }
                                }
                            ]
                        },
                        {
                            key: 'inspectionType_readyForConnection',
                            type: 'checkbox',
                            templateOptions: {
                                label: 'Electrical Installation Ready for Connection',
                            },
                            expressionProperties: {
                                "templateOptions.disabled": "formState.disabled"
                            }
                        },
                        {
                            hideExpression: '!model.inspectionType_readyForConnection',
                            fieldGroup: [
                                {
                                    key: 'serviceType',
                                    type: 'radio',
                                    templateOptions: {
                                        label:'',
                                        required: true,
                                        options: [
                                            {name: 'NEW SERVICE', value: 'newService'},
                                            {name: 'SERVICE REPAIR', value: 'serviceRepair'},
                                            {name: 'SERVICE CHANGE', value: 'serviceChange'},
                                        ]
                                    },
                                    expressionProperties: {
                                        "templateOptions.disabled": "formState.disabled"
                                    }
                                },
                                {
                                    hideExpression: '!(model.serviceType==="newService")&&!(model.serviceType==="serviceChange")',
                                    fieldGroup: [
                                        {
                                            key: 'oldServiceSize',
                                            type: 'input',
                                            templateOptions: {
                                                label: 'OLD SERVICE SIZE',
                                            },
                                            expressionProperties: {
                                                "templateOptions.disabled": "formState.disabled"
                                            },
                                            hideExpression: '!(model.serviceType==="serviceChange")'
                                        },
                                        {
                                            key: 'newServiceSize',
                                            type: 'input',
                                            templateOptions: {
                                                label: 'NEW SERVICE SIZE',
                                            },
                                            expressionProperties: {
                                                "templateOptions.disabled": "formState.disabled"
                                            }
                                        },
                                        {
                                            key: 'groundingElectrodeType',
                                            type: 'radio',
                                            templateOptions: {
                                                label: 'TYPE OF GROUNDING ELECTRODE',
                                                required: true,
                                                options: [
                                                    {name: 'ROD', value: 'rod'},
                                                    {name: 'UFER', value: 'ufer'},
                                                    {name: 'PLATE', value: 'plate'},
                                                    {name: 'OTHER', value: 'other'}
                                                ]
                                            },
                                            expressionProperties: {
                                                "templateOptions.disabled": "formState.disabled"
                                            }
                                        },
                                        {
                                            key: 'groundingElectrodeTypeOther',
                                            type: 'input',
                                            templateOptions: {
                                                label: '',
                                            },
                                            expressionProperties: {
                                                "templateOptions.disabled": "formState.disabled"
                                            },
                                            hideExpression: '!(model.groundingElectrodeType==="other")'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            key: 'notesForSO',
                            type: 'textarea',
                            templateOptions: {
                                label: 'NOTES FOR SAFETY OFFICER (OPTIONAL)',
                                rows: 3,
                                cols: 15
                            },
                            expressionProperties: {
                                "templateOptions.disabled": "formState.disabled"
                            }
                        }
                        
                      ]
                  },
                    {
                        name: 'step2',
                        formName: 'vm.forms.step2',
                        title: 'INSTALLATION DETAILS',
                        header: 'Installation Details',
                        buttonText: 'Continue',
                        fields: [
                        {
                            key: 'permitNumber',
                            type: 'input',
                            templateOptions: {
                                label: 'PERMIT NUMBER',
                                readOnly: true,
                            },
                            expressionProperties: {
                                "templateOptions.disabled": "formState.disabled"
                            }
                        },
                        {
                            key: 'installationAddress',
                            type: 'input',
                            templateOptions: {
                                label: 'INSTALLATION ADDRESS',
                                readOnly: true,
                            },
                            expressionProperties: {
                                "templateOptions.disabled": "formState.disabled"
                            }
                        },
                        {
                            key: 'installationName',
                            type: 'input',
                            templateOptions: {
                                label: 'INSTALLATION NAME',
                            },
                            expressionProperties: {
                                "templateOptions.disabled": "formState.disabled"
                            }
                        },
                        {
                            key: 'workDescription',
                            type: 'textarea',
                            templateOptions: {
                                required: true,
                                label: 'WORK DESCRIPTION',
                                rows: 2,
                                cols: 15
                            },
                            expressionProperties: {
                                "templateOptions.disabled": "formState.disabled"
                            }
                        },
                        {
                          key: 'voltage',
                          type: 'select',
                          templateOptions: {
                            label: 'VOLTAGE (LINE-TO-LINE)',
                            required: true,
                            options: [
                                {
                                    name: 'Please Select',
                                    value: ''
                                },
                                {
                                    name: 'ClassII',
                                    value: 'ClassII'
                                },
                                {
                                    name: '120',
                                    value: '120'
                                },
                                {
                                    name: '208',
                                    value: '208'
                                },
                                {
                                    name: '240',
                                    value: '240'
                                },
                                {
                                    name: '277',
                                    value: '277'
                                },
                                {
                                    name: '347',
                                    value: '347'
                                },
                                {
                                    name: '480',
                                    value: '480'
                                },
                                {
                                    name: '600',
                                    value: '600'
                                },
                                {
                                    name: '24900',
                                    value: '24900'
                                },
                                {
                                    name: '138000',
                                    value: '138000'
                                },

                            ]
                          },
                          expressionProperties: {
                                "templateOptions.disabled": "formState.disabled"
                            }
                        },
                        {
                          key: 'amps',
                          type: 'select',
                          templateOptions: {
                            label: 'AMPS',
                            required: true,
                            options: [
                                {
                                    name: 'Please Select',
                                    value: ''
                                },
                                {
                                    name: 'ClassII',
                                    value: 'ClassII'
                                },
                                {
                                    name: '15',
                                    value: '15'
                                },
                                {
                                    name: '20',
                                    value: '20'
                                },
                                {
                                    name: '30',
                                    value: '30'
                                },
                                {
                                    name: '40',
                                    value: '40'
                                },
                                {
                                    name: '60',
                                    value: '60'
                                },
                                {
                                    name: '100',
                                    value: '100'
                                },
                                {
                                    name: '600',
                                    value: '600'
                                },
                                {
                                    name: '2000',
                                    value: '2000'
                                },
                                {
                                    name: '3000',
                                    value: '3000'
                                },

                            ]
                          },
                          expressionProperties: {
                                "templateOptions.disabled": "formState.disabled"
                            }
                        },
                        {
                          key: 'phase',
                          type: 'select',
                          templateOptions: {
                            label: 'PHASE',
                            required: true,
                            options: [
                                {
                                    name: 'Please Select',
                                    value: ''
                                },
                                {
                                    name: '1',
                                    value: '1'
                                },
                                {
                                    name: '3',
                                    value: '3'
                                },
                            ]
                          },
                          expressionProperties: {
                                "templateOptions.disabled": "formState.disabled"
                            }
                        }
                      ]
                  },
                  {
                        name: 'step3',
                        formName: 'vm.forms.step3',
                        title: 'DECLARATION',
                        header: 'Declaration',
                        buttonText: 'Continue',
                        fields: [
                        {
                            key: 'fsrName',
                            type: 'input',
                            templateOptions: {
                                label: 'FSR NAME',
                                required: true,
                            },
                            expressionProperties: {
                                "templateOptions.disabled": "formState.disabled"
                            }
                        },
                        {
                            key: 'fsrNumber',
                            type: 'input',
                            templateOptions: {
                                label: 'FSR NUMBER',
                                required: true,
                            },
                            expressionProperties: {
                                "templateOptions.disabled": "formState.disabled"
                            },
                            hideExpression: 'model.fsrName===model.originalFsrName',
                        },
                        {
                            key: 'declaration',
                            type: 'checkbox',
                            templateOptions: {
                                //label: 'I, MARK COLIN WORDE, a Field Safety Representative for the above-licensed contractor, hereby declare that the electrical installation authorized under the above-mentioned permit is safe to inspect and has been installed to comply with the Safety Standards Act and Regulations of British Columbia. Checking this box and submitting this form to BC Safety Authority constitutes your declaration as the Field Safety Representative named here that you have physically examined the electrical work to confirm compliance under the Safety Standards Act. This has the same effect as submitting a handwritten signature. ',
                                label: '',
                                required: true,
                            },
                            expressionProperties: {
                                "templateOptions.disabled": "formState.disabled",
                                'templateOptions.label': '"I, " + model.fsrName + ", a Field Safety Representative for the above-licensed contractor, hereby declare that the electrical installation authorized under the above-mentioned permit is safe to inspect and has been installed to comply with the Safety Standards Act and Regulations of British Columbia. Checking this box and submitting this form to BC Safety Authority constitutes your declaration as the Field Safety Representative named here that you have physically examined the electrical work to confirm compliance under the Safety Standards Act. This has the same effect as submitting a handwritten signature."',
                                'validation.show': '!model.declaration'
                            },
                        },
                        {
                            key: 'fsrDeclarationDate',
                            type: 'input',
                            templateOptions: {
                                label: 'FSR DECLARATION DATE',
                                required: true,
                            },
                            expressionProperties: {
                                "templateOptions.disabled": "formState.disabled"
                            },
                        },
                      ]
                  }
        
                    ] 
                }
            }
               
               return form;
            }

            return {
                getFormFromJavascriptObjects: getFormFromJavascriptObjects,
                getFormFromServer: getFormFromServer,
                getFormFromJSON: getFormFromJSON,
                getModelFromServer: getModelFromServer,
                createNewForm: createNewForm,
                updateAForm: updateAForm
            }
        }
})();
