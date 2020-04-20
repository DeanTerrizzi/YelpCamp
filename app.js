var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
    {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2017/09/26/13/50/rv-2788677_960_720.jpg"},
    {name: "Granite Hill", image: "https://cdn.pixabay.com/photo/2018/05/16/15/49/camper-3406137_960_720.jpg"},
    {name: "Mountain Goat's Rest", image: "https://cdn.pixabay.com/photo/2016/01/26/23/32/camp-1163419_960_720.jpg"},
    {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2017/09/26/13/50/rv-2788677_960_720.jpg"},
    {name: "Granite Hill", image: "https://cdn.pixabay.com/photo/2018/05/16/15/49/camper-3406137_960_720.jpg"},
    {name: "Mountain Goat's Rest", image: "https://cdn.pixabay.com/photo/2016/01/26/23/32/camp-1163419_960_720.jpg"},
    {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2017/09/26/13/50/rv-2788677_960_720.jpg"},
    {name: "Granite Hill", image: "https://cdn.pixabay.com/photo/2018/05/16/15/49/camper-3406137_960_720.jpg"},
    {name: "Mountain Goat's Rest", image: "https://cdn.pixabay.com/photo/2016/01/26/23/32/camp-1163419_960_720.jpg"}
];

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds",{campgrounds: campgrounds});
});

app.post("/campgrounds", function (req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    //redirect back to campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

app.listen(3000, function(){
    console.log("Listening on Port 3000");
});