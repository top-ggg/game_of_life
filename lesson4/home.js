// var express = require("Express");
// var app = express();

// app.use(express.static("your_project_folder_name"));

// app.get("/", function(req, res){
//    res.redirect("your_project_html_name");
// });

// app.listen(3000, function(){
//    console.log("Example is running on port 3000");
// });



var express = require("Express");
var app = express();

 

app.get("/google", function(req, res){
    res.redirect("https://www.google.com/")
 });


app.get("/google/:value", function(req, res){
    var value = req.params.value;
    res.redirect("https://www.google.com/search?q="+value)
 });

app.get("/*", function(req, res){
    res.send("<h1>404 error</h1>");
 });
 
app.listen(3000, function(){
   console.log("Example is running on port 3000");
});
