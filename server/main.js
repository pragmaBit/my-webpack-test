var express = require('express');
var app = express();

var server = require('https');

var fs = require('fs');

var options ={
	key : fs.readFileSync('/var/www/cert/pragmabit.com/_.pragmabit.com_private_key.key'),
	cert : fs.readFileSync('/var/www/cert/pragmabit.com/pragmabit.com_ssl_certificate.cer')
	
};

var io = require('socket.io')(server);
//app.enable('trust proxy');
app.use(express.static(process.env.SERVE_DIRECTORY || 'dist'));
/*
app.use(function(request, response, next) {

    if (process.env.NODE_ENV != 'development' && !request.secure) {
       return response.redirect("https://" + request.headers.host + request.url);
    }

    next();
});
*/
app.get('/',function(req,res){
	res.status(200).send("Hola Mundillo 2!");
});


io.on('connection',function(socket){
	console.log('Alguien se ha conectado...');
	socket.emit('messages',{
		id: 1,
		text: 'Ya estás conectado',
		via: "Servidor"
	});
});
/*
server.listen(8081,function(){
	console.log('Server corriendo')
});*/

server.createServer(options,app).listen(process.env.SERVER_PORT || 8443,function(){
	console.log("My HTTPS server listening on port 8443 ...");
});
