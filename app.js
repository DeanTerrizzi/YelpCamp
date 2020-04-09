var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    var campgrounds = [
        {name: "Salmon Creek", image: "https://pixabay.com/get/57e1dd4a4350a514f1dc84609620367d1c3ed9e04e507441732b7ed7974bc3_340.jpg"},
        {name: "Granite Hill", image: "https://pixabay.com/get/57e8d0424a5bae14f1dc84609620367d1c3ed9e04e507441732b7ed7974bc3_340.jpg"},
        {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/55e8dc404f5aab14f1dc84609620367d1c3ed9e04e507441732b7cd59e49c6_340.jpg"}
    ];

    res.render("campgrounds",{campgrounds: campgrounds});
});

app.listen(3000, function(){
    console.log("Listening on Port 3000");
});