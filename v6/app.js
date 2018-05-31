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
    User                   = require("./models/user")
    

mongoose.connect("mongodb://localhost/yelp_camp_6");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

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
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
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
    res.render("campgrounds/new");
});


// SHOW Route - Shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    // find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            // render SHOW template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});


// =====================
// COMMENTS Routes
// =====================

// New Route - Comments
app.get("/campgrounds/:id/comments/new",isLoggedIn, function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
    
});


// Create Route - Comments
app.post("/campgrounds/:id/comments",isLoggedIn, function(req, res){
    // Lookup campground using id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            // Create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    // Connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    // redirect campground show page
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
            
        }
    });
    
});



// ================
// Authentication Routes

// Show register form
app.get("/register", function(req, res){
    res.render("register");
});

// handle sign up logic
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        } 
            passport.authenticate("local")(req, res, function(){
                res.redirect("/campgrounds");
            });
    });
});

// Show login form
app.get("/login", function(req, res){
    res.render("login");
});

// handle login logic
app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res){
});

// logout Route
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect("/login");
}





app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp App is running");
});