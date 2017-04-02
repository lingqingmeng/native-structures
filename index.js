//Everybody wants to be a bodybuilder but no one wanna lift some heavy ass weight!
//--Ronnie Coleman
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.listen(port,function (){
  console.log("Data structures browser is running at localhost:" + port)
});