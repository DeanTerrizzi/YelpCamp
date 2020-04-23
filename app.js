var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//Schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {    
//         name: "Granite Hill", 
//         image: "https://cdn.pixabay.com/photo/2018/05/16/15/49/camper-3406137_960_720.jpg",
//         description: "This is a huge gramite hill, no bathrooms, no water, beautiful granite!"
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//            console.log("Newly created campground") ;
//            console.log(campground);
//         }
//     });

// var campgrounds = [
//     {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2017/09/26/13/50/rv-2788677_960_720.jpg"},
//     {name: "Granite Hill", image: "https://cdn.pixabay.com/photo/2018/05/16/15/49/camper-3406137_960_720.jpg"},
//     {name: "Mountain Goat's Rest", image: "https://cdn.pixabay.com/photo/2016/01/26/23/32/camp-1163419_960_720.jpg"},
//     {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2017/09/26/13/50/rv-2788677_960_720.jpg"},
//     {name: "Granite Hill", image: "https://cdn.pixabay.com/photo/2018/05/16/15/49/camper-3406137_960_720.jpg"},
//     {name: "Mountain Goat's Rest", image: "https://cdn.pixabay.com/photo/2016/01/26/23/32/camp-1163419_960_720.jpg"},
//     {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2017/09/26/13/50/rv-2788677_960_720.jpg"},
//     {name: "Granite Hill", image: "https://cdn.pixabay.com/photo/2018/05/16/15/49/camper-3406137_960_720.jpg"},
//     {name: "Mountain Goat's Rest", image: "https://cdn.pixabay.com/photo/2016/01/26/23/32/camp-1163419_960_720.jpg"}
// ];

app.get("/", function(req, res){
    res.render("landing");
});

//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index",{campgrounds: allCampgrounds});
        }
    });
});

//CREATE - add new campground to DB
app.post("/campgrounds", function (req, res){
    //get data from form and add to campgrounds
    var name = req.body.name;
    var image = req.body.image;
    var desc = rew.body.description;
    var newCampground = {name: name, image: image, description: desc};
    //Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            //redirect back to campgrounds page
            res.redirect("/campgrounds"); 
        }
    });
});

//NEW -show form to create new campground
app.get("/campgrounds/new.", function(req, res){
    res.render("new");
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with the provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(3000, function(){
    console.log("Listening on Port 3000");
});