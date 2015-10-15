 var Hash = function Hash() {
	 this.length = 0;
	 this.items = new Array();
	 for (var i = 0; i < arguments.length; i += 2) {
		 if (typeof(arguments[i + 1]) != 'undefined') {
			 this.items[arguments[i]] = arguments[i + 1];
			 this.length++;
		 }
	 }

	 this.removeItem = function(in_key)
	 {
		 var tmp_value = null;
		 if (typeof(this.items[in_key]) != 'undefined') {
			 this.length--;
			 tmp_value = this.items[in_key];
			 delete this.items[in_key];
		 }
		 return tmp_value;
	 };

	 this.getItem = function(in_key) {
		 return this.items[in_key];
	 };

	 this.setItem = function(in_key, in_value)
	 {
		 if (typeof(in_value) != 'undefined') {
			 if (typeof(this.items[in_key]) == 'undefined') {
				 this.length++;
			 }

			 this.items[in_key] = in_value;
		 }
		 return in_value;
	 };

	 this.hasItem = function(in_key)
	 {
		 return typeof(this.items[in_key]) != 'undefined';
	 };
	 
	 this.printItems = function(){
		 for (var i in this.items) {
		        console.log('key is: ' + i + ', value is: ' + this.items[i]);
		 } 
	 };
	 /*
    var myHash = new Hash('one',1,'two', 2, 'three',3 );

    for (var i in myHash.items) {
        alert('key is: ' + i + ', value is: ' + myHash.items[i]);
    }
	  */
 };

