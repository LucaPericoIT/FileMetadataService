var http = require('http');
var fs = require('fs');
var multiparty = require('multiparty');
var util = require('util');

var server = http.createServer(function(request, response) {

     if(request.method=='POST') {
 	
	var form = new multiparty.Form({maxFilesSize:5000});
	var size = {"size": null};
	// Errors may be emitted 
	// Note that if you are listening to 'part' events, the same error may be 
	// emitted from the `form` and the `part`. 
	form.on('error', function(err) {
	  console.log('Error parsing form: ' + err.stack);
	});

	form.on('file', function(name, file){
		size.size = file.size;
		response.writeHead(200, {"Content-Type": "application/json"});
                response.end(JSON.stringify(size));
        });
	// Parse req 
	form.parse(request);
     }
     else{
	fs.readFile("index.html", function(err, data){
   		if(err){
      			response.writeHead(404);
	     	 	response.write("Not Found!");
   		}
  		else{
	      		response.writeHead(200, {'Content-Type': 'text/html'});
      			response.write(data);
   		}
   	response.end();
    	});
    }

});

server.listen(8080);
