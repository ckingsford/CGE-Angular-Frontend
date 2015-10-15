exports.model = function(req, res){

    //var h = new HashTable({one: 1, two: 2, three: 3, "i'm no 4": 4});

    //console.log('original length: ' + h.length);
    //console.log('value of key "one": ' + h.getItem('one'));

	var mysql = require('mysql');
	var analysisId = 439;
	var limit = '';
	limit = '';
	//var factors = Array();
    var factors = {};  //should be converted to hash
    var connection = mysql.createConnection('mysql://web_readonly:r3adOn!yUs3r@expression.ml.cmu.edu/life');
    connection.query('select featureId,featureValue from AnalysisResults where AnalysisId = ' + analysisId + limit , function(err, rows, fields) { //selecting cvPercent just for testing
        if (err) throw err;
        var a = "NA";
        for (var i = 0; i < rows.length; i++) {
              //var obj = {
              		//featureId: rows[i].featureId
              //};
              //factors.push(obj);
              factors[rows[i].featureId] = rows[i].featureValue;
              //a =  rows[i].featureId;
              //console.log(factors[rows[i].featureId]);
        }
        console.log("LAST feature: " + a + " " + factors[a]);
        console.log("MODEL RECEIVED! id:" + analysisId+ " size:"+Object.keys(factors).length); //.length);

        res.json({
            model: factors
        });

	});
	connection.end();
};
