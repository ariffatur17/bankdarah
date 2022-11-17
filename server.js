var express = require('express');
var app = express();
var path = require('path');
var view = __dirname + "/views/";
var public = __dirname + "/public/";
const PORT = process.env.PORT || 3000;

app.get('/', function(req, res) {
 res.sendFile(path.join(view + "index.php"));
});
app.use('/', express.static(public));
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
