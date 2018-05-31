var express                = require("express"),
    app                    = express(),
    bodyParser             = require("body-parser"),
    mongoose               = require("mongoose"),
    Campground             = require("./models/campground"),
    seedDB                 = require("./seeds"),
    Comment                = require("./models/comment"),
    passport               = require("passport"),
    LocalStrategy          = require("passport-local"),
    passportLocalMongoose  = require("passport-local-mongoose"),
    User                   = require("./models/user"),
    campgroundRoutes       = require("./routes/campgrounds"),
    commentRoutes          = require("./routes/comments"),
    indexRoutes            = require("./routes/index")
    

mongoose.connect("mongodb://localhost/yelp_camp_8");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
// seedDB();

// Passport Configuration
app.use(require("express-session")({
    secret: "Zeeshaan is freaking good!!!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});


app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use(indexRoutes);

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


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp App is running");
});