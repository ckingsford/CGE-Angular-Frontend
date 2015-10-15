'use strict';

/* Services */

var globalhostinfo = {
		host : '0.0.0.0',
		port: 80
};


//Demonstrate how to register services
angular.module('myApp.services', [])
	.value('version', '0.1')
	.factory('JsonServicePromise', function($http) {
		var myData = null;
	
		var promise = $http.get('/api/server').success(function (data) {
			myData = data;
			//alert('address request from /api/server/ - ' + JSON.stringify(myData));
		});
	
		return {
			promise:promise,
			setData: function (data) {
				//alert('Json service - setData()' + JSON.stringify(data));
				myData = data;
			},
			getData: function () {
				//alert('Json service - getData()' + JSON.stringify(myData));
				return myData;
			}
		};
	})
	.factory('PatientsService', function($http) {
		var patients = null;
		var xxx = $http.get('/patientTest');
		
		var loadedPatients = {};
		
		var promise = xxx.success(function (patientsInput) {
			patients = patientsInput;
		});

		return {
			promise:promise,
			setData: function (data) {
				alert('/patientTest'+JSON.stringify(patients));
				patients = data;
			},
			doStuff: function () {	
				return patients;
			},
			getPromise: function() {
				return xxx;
			},
			getPatientData: function(patiId, promise) {
				if (loadedPatients[patiId]) {
					promise(loadedPatients[patiId]);
					return;
				}
				
				$http.get('/patientTest/' +  patiId).success(function(data) {
					loadedPatients[patiId] = data;
					promise(data);					
				}); 	
			},
			getData: function () {	
				return patients;
			}
		};

	});

	/*
	.factory('uploadManager', function ($rootScope) {
		var _files = [];
		return {
			add: function (file) {
				_files.push(file);
				$rootScope.$broadcast('fileAdded', file.files[0].name);
			},
			clear: function () {
				_files = [];
			},
			files: function () {
				var fileNames = [];
				$.each(_files, function (index, file) {
					fileNames.push(file.files[0].name);
				});
				return fileNames;
			},
			upload: function () {
				$.each(_files, function (index, file) {
					file.submit();
				});
				this.clear();
			},
			setProgress: function (percentage) {
				$rootScope.$broadcast('uploadProgress', percentage);
			},
			testMe: function (it) {
				//alert('hello '+it);
				$rootScope.itis = $rootScope.model + " GUY " + it;
			},
			loadModel: function (model) {
				$rootScope.model = model;
			},
			updateProgress: function(){
	
			},
			loaded: function(evt){
	
				var model = $rootScope.model;
				//console.log(JSON.stringify(model));
				//if ( model.hasOwnProperty("chr10.326894") ) {
				//    alert("exist");
				//}
				var fileString = evt.target.result;
				var chrPos = 0;
				var locPos = 1;
				var snpIdPos = 2;
				var refPos = 3;
				var altPos = 4;
				var infoPos = 9;  //currently ignoring quality
				var output = [];
				var lines = fileString.split("\n");
				for(var i in lines) {
					if(lines[i] && lines[i].substring(0,1)!="#"){
						var cells = lines[i].split("\t");
						var chr = cells[chrPos];
						if (chr.substring(0,1).toLowerCase() != "c"){ //TODO: not robust enough assumption 'chr' needs to be appended - 'm' for mitochondria
							chr = 'chr'+chr;
						}else{
							chr =  chr.toLowerCase();
						}
						var loc = cells[locPos]
						var featureId = chr+"."+loc;
						console.log(featureId);
						if (model.hasOwnProperty(featureId)){   //assuming our model are position-based rather than snpId-based  - skipping elements not in the model
							console.log("found");
							if (! (typeof cells[infoPos] === 'undefined')) {
								var infoRaw =  cells[infoPos].split(":");
								infoRaw = infoRaw[0].split(/[\/\|]/);        //ignore phasing
								var info = 0;         //switching to 0/1/2 schema
								if (infoRaw[0] != "0") info++;
								if (chr != "y" && chr != "chry"){      //Y chromosome has only one option
									if (infoRaw[1] != "0") info++;   //notice multiple alternatives are possible
								}
								var obj = {
										chr: chr,
										loc: loc,
										snpId: cells[snpIdPos],
										ref: cells[refPos],
										alt: cells[altPos],  //notice multiple alternatives are possible
										info: info ,
										modelWeight:model[featureId].toFixed(3)
								}
								output.push(obj);
							}else{
								console.log("Error: " + lines[i]);
							}
						}
					}
				}
				//$rootScope.output = output;
				$rootScope.snps = output;
				//this.applyModelToVCF(output);   //TODO: this refers to fileReader - how do I refer to the function in the parent?
				//document.getElementById('snps').innerHTML = JSON.stringify(output);  //not that way it should be done, but it still works
	
			},
			errorHandler: function(){
				alert('Error');
			},
			abortRead: function(){
				alert('File read cancelled');
			},
			startVCFread: function(VCFFile) {
				var reader = new FileReader();
				reader.readAsText(VCFFile,"UTF-8");
				// Handle progress, success, and errors
				reader.onprogress = this.updateProgress;
				reader.onload = this.loaded;
				reader.onerror = this.errorHandler;
				reader.onabort = this.abortRead;
			},
			applyModelToVCF: function(VCFinfo) {
	
			}
		};
	});
	*/
