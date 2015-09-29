var BeaconEncoder = (function () {

    function BeaconEncoder() {
    }

    BeaconEncoder.prototype.transformarray = function (val, style, width, arraywidth) {
	var return_val = '' ;
	var temp = ''; 
	if( Object.prototype.toString.call(val ) === '[object Array]' ) {
	    for( var k in val) {
	        return_val = temp; 
	        if (temp !== '') { 
		    temp += ',';
	        }
	        temp += this.transform(val[k], style, width) ;
	        if (temp.length + 2 > arraywidth) { 
		    return '[' + return_val + ']'; 	
	        } 
	    } 
	    return '[' + temp + ']'; 
	}
	else { 
	    return 'error: not an array'; 
	}
    }

    BeaconEncoder.prototype.transform = function (val, style, width) {
	var return_val = '' ;
	if (style  === BeaconEncoder.TRUNCATION_STRING_LEFT && (typeof val === 'string') ) { // left trim 
	    return_val = val.substr(-width);
	}
	else if (style  === BeaconEncoder.TRUNCATION_STRING_RIGHT && (typeof val === 'string' ) ) { //right trim 
	    return_val = val.substr(0, width);
	} 
	else if (style  === BeaconEncoder.TRUNCATION_INTEGER && (typeof val === 'number' ) ) { // integer 
	    if (val >= 0 ) { 
	        var max = Math.pow(10, width) -1 ;
		return_val = val > max ? max : val; 
		return_val = Math.floor(return_val);
	    }
	    else {  ///negative 
	        var max = -(Math.pow(10, width-1 ) -1) ;
		return_val = val > max ? val : max; 
		return_val = Math.floor(return_val);
	    } 
	} 
	else { 
		return_val = 'error: not correct input' ; 
	} 
	return return_val; 
    }

/* data is a map with string keys and values which are of type number, string, number arrays or string arrays */
    BeaconEncoder.prototype.encode = function (data) {
	var mydata =''; 
	for( var key in data) {
	    if (this.rules[key] !== undefined) { 
	        if (this.rules[key]['arraywidth'] !== undefined ) {
    		    var val = this.transformarray(data[key], this.rules[key]['style'], this.rules[key]['width'], this.rules[key]['arraywidth']); 
	    	}
	    	else {  
    		    var val = this.transform(data[key], this.rules[key]['style'], this.rules[key]['width']);
	    	}
	    	if (mydata !=='') {
		    mydata += '&';
	        }
	    	mydata += key + '=' + val; 	
	    }
        }
    	return mydata;
    };

/* the style parameter should be one of TRUNCATION_STRING_LEFT, TRUNCATION_STRING_RIGHT or TRUNCATION_INTEGER */
    BeaconEncoder.prototype.addFieldTruncationRule =
	/* string, number, number) */
	
	function (fieldName, style, maxWidth ) {	
	    // TODO 	
	    this.rules[fieldName] = {'style':style, 'width':maxWidth};
	    return this;
	};

/* the elemStyle parameter should be one of TRUNCATION_STRING_LEFT, TRUNCATION_STRING_RIGHT or TRUNCATION_INTEGER */

    BeaconEncoder.prototype.addArrayTruncationRule =
	/* string, number, number, number */
	function (fieldName, maxArrayWidth, elemStyle, maxElemWidth ) {
	    // TODO
	    this.rules[fieldName] = { 'style':elemStyle, 'width':maxElemWidth, 'arraywidth':maxArrayWidth};
	    return this;
   	};

    BeaconEncoder.prototype.rules = [];
    BeaconEncoder.TRUNCATION_STRING_LEFT = 0;
    BeaconEncoder.TRUNCATION_STRING_RIGHT = 1;
    BeaconEncoder.TRUNCATION_INTEGER = 2;

    return BeaconEncoder;

})();
/*
var result = new BeaconEncoder().
    addFieldTruncationRule("left2",
	BeaconEncoder.TRUNCATION_STRING_LEFT, 2).
    addFieldTruncationRule("left3",
	BeaconEncoder.TRUNCATION_STRING_LEFT, 3).
    addFieldTruncationRule("right2",
	BeaconEncoder.TRUNCATION_STRING_RIGHT, 2).
    addFieldTruncationRule("right3",
	BeaconEncoder.TRUNCATION_STRING_RIGHT, 3).
    addFieldTruncationRule("int2",
	BeaconEncoder.TRUNCATION_INTEGER, 2).
    addFieldTruncationRule("int3",
	BeaconEncoder.TRUNCATION_INTEGER, 3).
    addArrayTruncationRule("array1", 10,
	BeaconEncoder.TRUNCATION_STRING_RIGHT, 3).
    encode({
	"array1" : ["ABC", "EF", "IJ"],
	"int2" : 100,
	"int3" : 100,
	"left2" : "ABC",
	"left3" : "ABC",
	"right2" : "ABC",
	"right3" : "ABC",
	"ignored" : "1234" });

// result is: "array1=[ABC,EF]&int2=99&int3=100&left2=BC&left3=ABC&right2=AB&right3=ABC";
console.log(result);
alert(result);
*/
