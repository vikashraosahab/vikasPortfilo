// IMPORT NODEJS MODULE
const http = require ("http");
const path = require ("path");
const fs = require ("fs");

// ASSIGN PORTNUMBER FOR SERVER
const portNumber = process.env.PORT || 3000;

// CREATE A SERVER
const Server = http.createServer ((req,res) =>{
   if (req.url == '/') {
   	 // FINDING THE PATH OF INDEXFILE
   	 const indexFile = path.join (__dirname,"../public/html/index.html");
       // READ DATA ON THE SERVER
       streamFile (res,indexFile,"text/html");
   }
   else if (req.url =='/resume') {
   	const resumeFile = path.join (__dirname,"../public/html/resume.html");
   	streamFile (res,resumeFile,"text/html");
   }
   else if (req.url == '/portfilo') {
   	const portfiloFile = path.join (__dirname,"../public/html/portfilo.html");

   	streamFile (res,portfiloFile,"text/html");
   }
   else if (req.url == '/form') {
   	const formFile = path.join (__dirname,"../public/html/form.html");

   	streamFile (res,formFile,"text/html");
   }
   // FOR SERVER CSS WITHIN NODE JS SERVER
   else if (req.url = '/csss/style.css') {
   	// FINDING THE PATH OF CSS FILE
   	const cssFile = path.join (__dirname,"../public/css/style.css");

      // READ DATA ON THE SERVER
      streamFile (res,cssFile,"text/css");
   }
   else {
   	res.writeHead(404,{"ContentType" : "text/plain"});
   	res.end ("Sorry this is 404 error page");
   }
});

// SERVER LISTEN
Server.listen (portNumber,(err)=>{
	if (err) throw error;
    else console.log (`application is running on the server ${portNumber}`);
});

// CREATE STREAMFILE
function streamFile (res,file,contentType) {
	const stream = fs.createReadStream(file);
	res.writeHead(200,{"ContentType" : contentType});
	stream.on ('error',(error)=>{
     	res.writeHead (500,{"ContentType" : "text/plain"});
     	res.end(`Server failed error`);
	});
	stream.pipe(res);
}
