// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var os = require('os');


// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));


// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


app.get("/api", function(request, response) {
  //response.send(request.ip);
  var ip = request.headers['x-forwarded-for'].split(',')[0];
  var lang = request.headers["accept-language"].split(',')[0];
  var regex = /\(([^\)]+)\)/;
  var software = regex.exec(request.headers["user-agent"])[1];
  response.json({ip: ip, language: lang, software: software});
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
