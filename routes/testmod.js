module.exports=function(env){
	var module={};
	
	module.hostinfo = function(req,res){
			res.json({
			    host: "aaa.bbb.ccc",
			    port: 9000
			  });
	}
	
	return module;
};