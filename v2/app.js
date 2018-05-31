var express      = require("express"),
    app          = express(),
    bodyParser   = require("body-parser"),
    mongoose     = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


// Schema SetUp
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Granite Hill", 
//         image: "https://images.unsplash.com/photo-1470399542183-e6245d78c479?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2f37382c0d0203b8be43fea0a8380965&auto=format&fit=crop&w=500&q=60",
//         description: "This is a huge granite hill, no bathrooms. No Water. Beautiful granite only!"
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("Newly created campground");
//             console.log(campground);
//         }
//     });


app.get("/", function(req, res){
    res.render("landing");
});

// INDEX Route - Show all campgrounds
app.get("/campgrounds", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds: allCampgrounds});
        }
    });
});


// CREATE Route - add new campground to DB
app.post("/campgrounds", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    // create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            // redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

// NEW Route - Shows form to create a new campground
app.get("/campgrounds/new", function(req, res){
    res.render("new");
});


// SHOW Route - Shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    // find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            // render SHOW template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp App is running");
});