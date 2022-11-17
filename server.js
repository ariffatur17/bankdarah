var express = require('express');
var curl = require("curl/ayodonor.php");
var app = express();
var path = require('path');
var view = __dirname + "/views/";
var public = __dirname + "/public/";
const PORT = process.env.PORT || 3000;

app.get('/', function(req, res) {
 res.sendFile(path.join(view + "index.html"));
});
app.use('/', express.static(public));
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
