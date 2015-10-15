'use strict';

var somevar='init';

//Declare app level module which depends on filters, and services

var myApp = angular.module('myApp', ['ngResource',
                         'ngBreadcrumbs',
                         'ui.bootstrap',
                         'ui.router',
                         'myApp.controllers',
                         'myApp.filters',
                         'myApp.services',
                         'myApp.directives',
                         
                         ])
                         .config(function($stateProvider,$urlRouterProvider,$httpProvider){
                        	 //For any unmatched url, redirect to home
                        	 $urlRouterProvider.otherwise("/home");
                        	 
                        	 $stateProvider
                        	 	.state('home',{
                        	 		url: '/home',
                        	 		templateUrl: 'partials/home'
                        	 	})
                        	 	.state('patients',{
                        	 		url: '/patients',
                        	 		templateUrl: 'partials/patients',
                        	 		controller: 'PatientsCtrl',
                           		    resolve:{
                           			     'JsonServicePromiseData':function(JsonServicePromise){
                           				 return JsonServicePromise.promise;
                           			   }
                           		    }
                        	 	})
                        	 	.state('patient',{
                        	 		url: '/patient/:id',
                        	 		templateUrl: 'partials/patient',
                        	 		controller: 'PatientCtrl',
                           		    resolve:{
                           			     'JsonServicePromiseData':function(JsonServicePromise){
                           				 return JsonServicePromise.promise;
                           			   }
                           		    }
                        	 	})
                        	 	.state('patient.model',{
                        	 		url: '/:modelId',
                        	 		templateUrl: 'partials/patientAnalysis',
                        	 		controller: 'PatientAnalysisCtrl',
                           		    resolve:{
                           			     'JsonServicePromiseData':function(JsonServicePromise){
                           				 return JsonServicePromise.promise;
                           			   }
                           		    }
                        	 	})
                        	    .state('models',{
                        	 		url: '/models',
                        	 		templateUrl: 'partials/models',
                        	 		controller: 'ModelsCtrl',
                           		    resolve:{
                           			     'JsonServicePromiseData':function(JsonServicePromise){
                           				 return JsonServicePromise.promise;
                           			   }
                           		    }
                        	 	})
                        	 	.state('models_list',{
                        	 		url: '/models_list',
                        	 		templateUrl: 'partials/models_list',
                        	 		controller: 'ModelsListCtrl',
                           		    resolve:{
                           			     'JsonServicePromiseData':function(JsonServicePromise){
                           				 return JsonServicePromise.promise;
                           			   }
                           		    }
                        	 	})
                        	 	.state('models_run',{
                        	 		url: '/models_run',
                        	 		templateUrl: 'partials/models_run',
                        	 		controller: 'ModelsRunCtrl',
                           		    resolve:{
                           			     'JsonServicePromiseData':function(JsonServicePromise){
                           				 return JsonServicePromise.promise;
                           			   }
                           		    }
                        	 	})
                        	 	
                        	 	.state('model',{
                        	 		url: '/model/:modelId',
                        	 		templateUrl: 'partials/model',
                        	 		controller: 'ModelCtrl',
                           		    resolve:{
                           			     'JsonServicePromiseData':function(JsonServicePromise){
                           				 return JsonServicePromise.promise;
                           			   }
                           		    }
                        	 	})
                        	 	
                        	 	;
                        	 
                        	    delete $httpProvider.defaults.headers.common['X-Requested-With'];	
                        	 
                         })
                         .config(function ($routeProvider, $locationProvider, $httpProvider, $controllerProvider) {
                        	 //for the breadCrumbService - not entirely sure what this is needed - but it doesn't work without it -	
                        	 $controllerProvider.register( 'foo', function( $scope, BreadCrumbsService ) {
                        		 $scope.pushSomething = function() {
                        			 BreadCrumbsService.push( 'home', {
                        				 href: '#/library/data/foo',
                        				 label: 'Foo'
                        			 } );
                        		 };
                        	 } );	 

                        	 /*
                        	 $routeProvider
                        	 .when('/',{
                        		    controller:'AppCtrl',
                        		    template:'<div id="xxx">From PatientsService: XXXX <pre>{{patientsData | json}}</pre></div>',
                        		    resolve:{
                    		    	 'JsonServicePromiseData':function(JsonServicePromise){
                    		    		return JsonServicePromise.promise;
                           			 },
                        		     'PatientsServiceData':function(PatientsService){
                        		        return PatientsService.promise;
                        		      }
                        		    }
                        	 })
                        	 
                        	 .when('/view1', {
                        		 templateUrl: 'partials/partial1',
                        		 controller: 'MyCtrl1'
                        	 })
                        	 .when('/view2', {
                        		 templateUrl: 'partials/partial2',
                        		 controller: 'MyCtrl2'
                        	 })
                        	 .when('/home', {
                        		 templateUrl: 'partials/home',
                        		 controller: 'HomeCtrl',
                        		 resolve:{
                    		    	 'JsonServicePromiseData':function(JsonServicePromise){
                    		    		return JsonServicePromise.promise;
                           			 },
                        		     'PatientsServiceData':function(PatientsService){
                        		        return PatientsService.promise;
                        		      }
                        		    }
                        	 })
                        	 .when('/analysis/:patientID/:modelID', {
                        		 templateUrl: 'partials/analysis',
                        		 controller: 'AnalysisCtrl',
                        		 resolve:{
                        			 'JsonServicePromiseData':function(JsonServicePromise){
                        				 return JsonServicePromise.promise;
                        			 }
                        		 }
                        	 })
                        	 .when('/patient/:patientID', {
                        		 templateUrl: 'partials/patient',
                        		 controller: 'PatientCtrl',
                        		 resolve:{
                        			 'JsonServicePromiseData':function(JsonServicePromise){
                        				 return JsonServicePromise.promise;
                        			 }
                        		 }
                        	 })
                        	 .when('/patients', {
                        		 templateUrl: 'partials/patients',
                        		 controller: 'PatientsCtrl',
                        		 resolve:{
                        			 'JsonServicePromiseData':function(JsonServicePromise){
                        				 return JsonServicePromise.promise;
                        			 }
                        		 }
                        	 })
                        	 .otherwise({
                        		 redirectTo: '/home',
                        			 resolve:{
                        		    	 'JsonServicePromiseData':function(JsonServicePromise){
                        		    		return JsonServicePromise.promise;
                               			 },
                            		     'PatientsServiceData':function(PatientsService){
                            		        return PatientsService.promise;
                            		      }
                            		    }
                        	 });
                        	  */
                        	 $locationProvider.html5Mode(true);
                        	 delete $httpProvider.defaults.headers.common['X-Requested-With'];
                         })
                         .run(


                         );

myApp.filter('orderObjectBy', function(){
	 return function(input, attribute) {
	    if (!angular.isObject(input)) return input;
	    var array = new Array();
	    for(var objectKey in input) {
	        array.push(input[objectKey]);
	    }

	    array.sort(function(a, b){
	        a = parseFloat(a[attribute]); //should handle also int in parseInt()
	        b = parseFloat(b[attribute]);
	        return b - a; //sort descending
	    });
	    
	    
	    
	    return array;
	 };
	});

//BreadCrumbs
angular.module('ngBreadcrumbs', []).factory('BreadCrumbsService', function($rootScope, $log) {
	var data = {};
	var ensureIdIsRegistered = function(id) {
		if (angular.isUndefined(data[id])) {
			data[id] = [];
		}
	};
	return {
		push: function(id, item) {
			ensureIdIsRegistered(id);
			data[id].push(item);
			$log.log( "$broadcast" );
			$rootScope.$broadcast( 'breadcrumbsRefresh' );
		},
		get: function(id) {
			ensureIdIsRegistered(id);
			return angular.copy(data[id]);
		},
		setLastIndex: function( id, idx ) {
			ensureIdIsRegistered(id);
			if ( data[id].length > 1+idx ) {
				data[id].splice( 1+idx, data[id].length - idx );
			}
		},
		reset: function() {
			data = [];
			$rootScope.$broadcast( 'breadcrumbsRefresh' );
		}        
	};
}).directive('breadCrumbs', function($log, BreadCrumbsService) {
	return {
		restrict: 'A',
		template: '<ul class="breadcrumb"><li ng-repeat=\'bc in breadcrumbs\' ng-class="{\'active\': {{$last}} }"><a ng-click="unregisterBreadCrumb( $index )" ng-href="{{bc.href}}">{{bc.label}}</a><span class="divider" ng-show="! $last">|</span></li></ul>',
		replace: true,
		compile: function(tElement, tAttrs) {
			return function($scope, $elem, $attr) {
				var bc_id = $attr['id'],
				resetCrumbs = function() {
					$scope.breadcrumbs = [];
					angular.forEach(BreadCrumbsService.get(bc_id), function(v) {
						$scope.breadcrumbs.push(v);
					});
				};
				resetCrumbs();
				$scope.unregisterBreadCrumb = function( index ) {
					BreadCrumbsService.setLastIndex( bc_id, index );
					resetCrumbs();
				};
				$scope.$on( 'breadcrumbsRefresh', function() {
					$log.log( "$on" );
					resetCrumbs();
				} );
			};
		}
	};
});



