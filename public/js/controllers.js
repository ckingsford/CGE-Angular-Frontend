'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

  /////////////////////////////////////////   MainCtrl
.controller('MainCtrl', function ($scope,$location) {
	  $scope.isLoggedIn = false;
	  $scope.physicianName = "";
	  
	  var verifyLoginInput = function (username,password){ //potentially need to use OAuth 2.0 and be verified with the database
		  var verified = false;
		  if (username && username != "" && password && password != ""){
			  verified = true;
		  }
		  return verified;
	  };
	  
	  $scope.login = function(username, password) {
		  	if (!verifyLoginInput(username,password)){
		  		alert("Please check your login credentials");
		  		$scope.isLoggedIn = false;
		  	}else{
			  	$scope.isLoggedIn = true;
			    $scope.physicianName = username;
			    $location.path( "/patients" );
		  	}
	  }; 
  })
  
  /////////////////////////////////////////   IndexCtrl
 .controller('IndexCtrl', function ($scope, PatientsService) {
/*	  $scope.fff = true;
	  PatientsService.getPromise().success(function(data){
		  setTimeout(function() {
			  //alert(data);
			  $scope.patientsData = data;	
			  $scope.$apply();
		  }, 5000);
	  });
	*/  
  }, ['$scope', 'PatientsService']) //specifically naming the parameters to the function to avoid problems in minimization
 
  /////////////////////////////////////////   App CTRL
  .controller('AppCtrl', function ($scope, $http, $routeParams, PatientsService) {
	  $scope.xxx = 7;
	  //$scope.patientsData = "sdf";
	  $scope.modelID = $routeParams.modelID;
  	  $scope.patientID = $routeParams.patientID;
 	  var patientsData = PatientsService.doStuff();
 	  console.log(patientsData);
	  $scope.patientsData = patientsData;
  	  
//    $http({
//        method: 'GET',
//        url: '/api/name2'
//      }).
//          success(function (data, status, headers, config) {
//            $scope.name2 = data.name;
//          }).
//          error(function (data, status, headers, config) {
//            $scope.name2 = 'Error!'
//          });
//    $http({
//      method: 'GET',
//      url: '/api/guy'
//    }).
//        success(function (data, status, headers, config) {
//          $scope.guy = data.id;
//        }).
//        error(function (data, status, headers, config) {
//          $scope.guy = 'Error!'
//        });

	// Bind the event using $scope and in the controller the event will be triggered
    $scope.calc = function(somevar) {
    	$scope.modelPlaceholder = "Calculate was clicked with somevar: "+somevar;
    	alert('Yay!');
        console.log($scope);
    };
    
  })

  /////////////////////////////////////////   My CTRL 1
  .controller('MyCtrl1', function ($scope) {
    // write Ctrl here

  })
   /////////////////////////////////////////   My CTRL 2
  .controller('MyCtrl2', function ($scope) {
    // write Ctrl here

  })  
  
   /////////////////////////////////////////   Home 1
  .controller('HomeCtrl', function ($scope,$http,BreadCrumbsService) {
	  BreadCrumbsService.reset();
  })
  
  /////////////////////////////////////////   ModelsCtrl
  .controller('ModelsCtrl', function ($scope, $state, $http, $resource, JsonServicePromise) {
	//$state.go('patient.model', { id:patientId, modelId:$scope.models.modelIds[0]}); 

	  var data = JsonServicePromise.getData();

	  //alert("models template");
	  $scope.models = "";
	  $scope.modelsResource = $resource(
			  data.host+'\\:'+data.port+'/cge/models/list'
	  ).get(function(){	  
		     $scope.models = $scope.modelsResource.list;
	  });
  })
  
  /////////////////////////////////////////   ModelsListCtrl
  .controller('ModelsListCtrl', function ($scope, $http, $resource, JsonServicePromise) {
	  var data = JsonServicePromise.getData();
	  $scope.models = "";
	  $scope.modelsReceived = false;
	  $scope.modelsResource = $resource(
			  data.host+'\\:'+data.port+'/cge/models/list'
	  ).get(function(){	  
		     $scope.models = $scope.modelsResource.list; 
		     $scope.modelsReceived = true;
	  });
	  
	  $scope.removeModel = function(id) {
		  $scope.modelsReceived = false;
		  $scope.removeResponse = $resource(
				  data.host+'\\:'+data.port+'/cge/models/remove/'+id
		  ).get(function(){	 
			     $scope.modelsResource = $resource(
						  data.host+'\\:'+data.port+'/cge/models/list'
				  ).get(function(){	  
					     $scope.models = $scope.modelsResource.list;   
					     $scope.modelsReceived = true;
			      });
				  	
		  });
	  };
  })
    /////////////////////////////////////////   ModelsRunCtrl
  .controller('ModelsRunCtrl', function ($scope, $http, $resource, JsonServicePromise) {
	  $scope.saveModelToDB = false;
	  $scope.modelRunReceived = 0;
	  $scope.runModel = function(type) {
		  if ($scope.saveModelToDB && ($scope.modelName == null || $scope.modelName.trim() == "")) {
			  alert("Storing models into the database requires providing a name for the analysis");
			  return;
		  }
		  var data = JsonServicePromise.getData();
		  $scope.modelRunReceived = 1;
		  $scope.output="Running algorithm";
		  var additionalParams = "";
		  if ($scope.saveModelToDB){
			  $scope.modelName = $scope.modelName.replace(/\s/g, "_"); //removing whitespace
			  additionalParams += "&override=storeTargets mysql analysis-name " + $scope.modelName;
		  }
		  console.log(data.host+'\\:'+data.port+'/cge/models/run?type='+type+additionalParams);
		  $scope.res = $resource(data.host+'\\:'+data.port+'/cge/models/run?type='+type+additionalParams)
		  .get(function(){	  
			  $scope.modelRunReceived = 2;
			  $scope.output = $scope.res.output.split(/\t/);
			  //console.log($scope.output.length);
		  }); 
	  };
	  $scope.toggleSelection = function() {
		  $scope.saveModelToDB = !$scope.saveModelToDB;
	  };
  })
  
    /////////////////////////////////////////   ModelCtrl
  .controller('ModelCtrl', function ($scope, $stateParams, $http, $resource, JsonServicePromise) {
	  var data = JsonServicePromise.getData();
	  $scope.modelId = $stateParams.modelId;
	  $scope.model = "";
	  $scope.modelRecieved = false;
	  $scope.modelResource = $resource(
			  data.host+'\\:'+data.port+'/cge/models/'+$scope.modelId+"?full=true"
	  ).get(function(){	 
		     $scope.model = $scope.modelResource;
		     $scope.modelReceived = true;
		     //console.log($scope.model.model);
	  });
  })
  
   /////////////////////////////////////////   PatientsService CTRL
  .controller('PatientsServiceCtrl', function ($scope, $http, $resource, JsonServicePromise, PatientsService) {
	 var patientsData = PatientsService.doStuff();
	 $scope.patientsData = patientsData; 
	 
  })
   /////////////////////////////////////////   Patients CTRL
  .controller('PatientsCtrl', function ($scope, $http, $resource, JsonServicePromise,BreadCrumbsService) {
	  var data = JsonServicePromise.getData();

	  $scope.patients = $resource(
			  data.host+'\\:'+data.port+'/cge/patients/list'
	  ).get(function(){	  
		     var patients = $scope.patients.patients;
		     
			  //console.log("patients:" + JSON.stringify($scope.patients));
			 // alert("patients:" + JSON.stringify($scope.patients)); 
		      //var obj = JSON.parse($scope.patients);
			  //var names = $scope.{'patients'}.patients[0];
			  //alert(obj.count);
		      var data = [];
		      var patientsName2Id = new Hash();
		      for (var k in patients){
		  	     //console.log("k:"+patients[k].name);
		    	 var name = patients[k].name;
		  	     data[k] = name;
		  	     patientsName2Id.setItem(name, patients[k].id);  
		      }
		      console.log(data.length+ " " + patientsName2Id.length);
		      //patientsName2Id.getItems();
		      data.sort();
		      //var data = ["aardvark","animal","ball","bat","charlie","zulu"];
			  var Alpha = new AlphaSplit(data, patientsName2Id);
			  //alert(patientsName2Id.length);
			  Alpha.create();
	  });

	  function AlphaSplit(data, patientsName2Id) {
	  	var self = {
	  		data: data,
	  		html: "",
	  		buttons: [],
	  		patientsName2Id: patientsName2Id
	  	};  	

	  	self.create = function ()	 {
	  		
	  		window["All"] = [];
	  		self.buttons.push("All");
	  		for (var i = 0; i < self.data.length; i++) {
	  			var array_name = self.data[i].trim().substring(0,1).toUpperCase();
	  			if (!window[array_name]) {
	  				window[array_name] = [];
	  				self.buttons.push(array_name.trim());
	  			}
	  			window[array_name].push(self.data[i]);
	  			window["All"].push(self.data[i]);
	  		}
	  		
	  		for(var i=0; i < self.buttons.length; i++) {		
	  			var buttonClass = "AlphaSplitShowDataButton";
	  				if (i==self.buttons.length-1){
	  				buttonClass+=" buttons-last";
	  			}
	  			$("#AlphaSplitButtons").append(
  					$("<span/>")
  					.text(self.buttons[i]) 
	  				.attr("id", "AlphaSplitShow-" + self.buttons[i])
	  				.addClass(buttonClass)
	  				.click(self.show)
	  			);
	  		} 	
	  		
	  	    //showing All in the beginning:
  			var array = window["All"];
	  		var itemClass = "AlphaSplitDataItem";
	  		
	  		$("#AlphaSplitData").html("");  		
	  		for (var i=0; i < array.length; i++) {
	  			$("#AlphaSplitData").append(
	  				//$("<span/>")
	  				//.text("<a href='patients/" + self.patientsName2Id.getItem(array[i])+"'>" +array[i] +"</a>")
	  				//.addClass(itemClass)
	  				"<p class='" + itemClass+"'><a href='patient/" + self.patientsName2Id.getItem(array[i])+"'>" +array[i] +"</a></p>"
	  			);
	  		}
	  	};
	  	self.show = function () {
	  		var array_name = $(this).attr("id").replace("AlphaSplitShow-", "");
	  		var array = window[array_name];
	  		var itemClass = "AlphaSplitDataItem";
	  		$("#AlphaSplitData").html("");
	  		for (var i=0; i < array.length; i++) {
	  			$("#AlphaSplitData").append(
	  				//$("<div/>")
	  				//.text(array[i])
	  				//.text("<a href='patients/" + self.patientsName2Id.getItem(array[i])+"'>" +array[i] +"</a>")
	  				//.addClass(itemClass)
	  				"<p class='" + itemClass+"'><a href='patient/" + self.patientsName2Id.getItem(array[i])+"'>" +array[i] +"</a></p>"
	  			);
	  			$("#AlphaSplitData").append("");
	  		}
	  	};
	  	return self;
	  }
	  /*
	  BreadCrumbsService.push("home", {
		  href: '/home',
	      label: 'Home'
	  });
	  */	    
  })
  
  
  ///////////////////////////////////////// PATIENT CTRL
  .controller('PatientCtrl', function ($scope,$stateParams, $state, $location,$route, $routeParams, $http, $resource, JsonServicePromise, BreadCrumbsService) {
	 /* BreadCrumbsService.push("home", {
		  href: '/patients',
	      label: 'Patients'
	  });
	   */ 
	  //The $routeParams service allows you to retrieve the current set of route parameters. [http://docs.angularjs.org/api/ngRoute.$routeParams]
	  var data = JsonServicePromise.getData();
	  var patientId = $stateParams.id;

	  $scope.patient = $resource(
			  data.host+'\\:'+data.port+'/cge/patients/:patientID', 
			  {patientID:patientId}
			  //{patientID:$routeParams.patientID}
	  ).get(function() {
		    $scope.patientInfo = jQuery.parseJSON( $scope.patient.info );
			//console.log($scope.patient.info +" " + typeof $scope.patient.info);
		    //console.log($scope.patientInfo);
	  });
	  $scope.models = $resource(
			  data.host+'\\:'+data.port+'/cge/patients/:patientID/models', 
			  {patientID:patientId}
			  //{patientID:$routeParams.patientID}
	  ).get(function() {
		    //console.log($scope.models.modelIds);
		    //$location.path( "patient/"+patientId+"/"+$scope.models.modelIds[0] );
		    $state.go('patient.model', { id:patientId, modelId:$scope.models.modelIds[0]});
	  });
	  
    })
    
    /////////////////////////////////////////   PatientAnalysis CTRL
    .controller('PatientAnalysisCtrl', function ($scope, $stateParams, $http, $resource, $routeParams, JsonServicePromise, BreadCrumbsService) {
    	$scope.modelReceived = false;
    	var data = JsonServicePromise.getData();
    	var patientId = $stateParams.id;
    	var modelId = $stateParams.modelId;
    	
   	  
  	    $scope.modelInfo = $resource(
  	    		data.host+'\\:'+data.port+'/cge/models/:modelID?full=false', {modelID:modelId}
	        ).get(function(){
	        
	        });
        	
  	  
  	    $scope.analysis = $resource(
  	    		data.host+'\\:'+data.port+'/cge/patients/:patientID/models/:modelID', 
  	    		{patientID:patientId,modelID:modelId}
  	    	).get(function(){
  	    		$scope.modelReceived = true;
  	    		var predictionValue = $scope.analysis.predictions[0].value * 100;
  	    		$scope.predictionValue = predictionValue.toFixed(2);
  	    		//console.log(JSON.stringify($scope.analysis.features)); //need to allow filtering options
  	    		
  	    	});
  	    
  	  $scope.modelId = modelId;
  	  $scope.patientId = patientId;
  	  
  	  //console.log("pat:" + patientId + " model:"+modelId);
    })
    
    /////////////////////////////////////////   Analysis CTRL
    .controller('AnalysisCtrl-DEPRECATED', function ($scope, $http, $resource, $routeParams, JsonServicePromise, BreadCrumbsService) {
    	var data = JsonServicePromise.getData();

  	  
	    var Patient = $resource(
	    		data.host+'\\:'+data.port+'/cge/patients/:patientID', 
	    		{patientID:$routeParams.patientID}
	    	).get();
	    $scope.patient = Patient;

  	    $scope.analysis = $resource(
  	    		data.host+'\\:'+data.port+'/cge/patients/:patientID/models/:modelID', 
  	    		{patientID:$routeParams.patientID,modelID:$routeParams.modelID}
  	    	).get();
  	    
  	  $scope.modelID = $routeParams.modelID;
  	  $scope.patientID = $routeParams.patientID;

  	  /*
  	  BreadCrumbsService.push("home", {
		  href: '/patient/'+ $routeParams.patientID,
	      label: 'Patient: '+$routeParams.patientID
	  });
*/
    })
    
    .controller('FileUploadCtrl',
    ['$scope', '$rootScope', 'uploadManager', 
    function ($scope, $rootScope, uploadManager) {
	    $scope.files = [];
	    $scope.percentage = 0;
	
	    $scope.upload = function () {
	        uploadManager.upload();
	        $scope.files = [];
	    };
	
	    $rootScope.$on('fileAdded', function (e, call) {
	        $scope.files.push(call);
	        $scope.$apply();
	    });
	
	    $rootScope.$on('uploadProgress', function (e, call) {
	        $scope.percentage = call;
	        $scope.$apply();
	    });
  }]);


