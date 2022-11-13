var express = require('express');
var app = express();
var path = require('path');
var view = __dirname + "/views/";
var public = __dirname + "/public/";

app.get('/', function(req, res) {
 res.sendFile(path.join(view + "index.html"));
});
app.use('/', express.static(public));
app.listen(PORT); 
