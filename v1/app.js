var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgroundsArr = [
    {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1504074299048-b3e1c4828ee9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=72c25401d20bf51f6094db67a3c09b34&auto=format&fit=crop&w=500&q=60"},
    {name: "Granite Hill", image: "https://images.unsplash.com/photo-1470399542183-e6245d78c479?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2f37382c0d0203b8be43fea0a8380965&auto=format&fit=crop&w=500&q=60"},
    {name: "Mountain Goat's Rest", image: "https://images.unsplash.com/photo-1488182820465-cc89025bb254?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=899be9120ac747528141ce992dcd4a7e&auto=format&fit=crop&w=500&q=60"},
    {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1504074299048-b3e1c4828ee9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=72c25401d20bf51f6094db67a3c09b34&auto=format&fit=crop&w=500&q=60"},
    {name: "Mountain Goat's Rest", image: "https://images.unsplash.com/photo-1488182820465-cc89025bb254?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=899be9120ac747528141ce992dcd4a7e&auto=format&fit=crop&w=500&q=60"},
    {name: "Granite Hill", image: "https://images.unsplash.com/photo-1470399542183-e6245d78c479?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2f37382c0d0203b8be43fea0a8380965&auto=format&fit=crop&w=500&q=60"},
    {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1504074299048-b3e1c4828ee9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=72c25401d20bf51f6094db67a3c09b34&auto=format&fit=crop&w=500&q=60"},
    {name: "Granite Hill", image: "https://images.unsplash.com/photo-1470399542183-e6245d78c479?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2f37382c0d0203b8be43fea0a8380965&auto=format&fit=crop&w=500&q=60"},
    {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1504074299048-b3e1c4828ee9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=72c25401d20bf51f6094db67a3c09b34&auto=format&fit=crop&w=500&q=60"},
    {name: "Granite Hill", image: "https://images.unsplash.com/photo-1470399542183-e6245d78c479?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2f37382c0d0203b8be43fea0a8380965&auto=format&fit=crop&w=500&q=60"}
]

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgroundsArr});
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});


app.post("/campgrounds", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name
    var image = req.body.image
    var newCampground = {name: name, image: image};
    campgroundsArr.push(newCampground);
    // redirect back to campgrounds page
    res.redirect("/campgrounds");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp App is running");
});