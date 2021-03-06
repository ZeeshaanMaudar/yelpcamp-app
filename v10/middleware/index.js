var Campground = require("../models/campground");
var Comment = require("../models/comment");


// all the middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                console.log(err);
                res.redirect("back");
            } else {
                // does user own the campground,
                if(foundCampground.author.id.equals(req.user._id)){
                   next(); 
                } else {
                    // otherwise, redirect
                    res.redirect("back");
                }
            }
        });
    } else {
        // if not logged in, redirect
        res.redirect("back");
    }
}



middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                console.log(err);
                res.redirect("back");
            } else {
                // does user own the comment,
                if(foundComment.author.id.equals(req.user._id)){
                   next(); 
                } else {
                    // otherwise, redirect
                    res.redirect("back");
                }
            }
        });
    } else {
        // if not logged in, redirect
        res.redirect("back");
    }
}



middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect("/login");
}


module.exports = middlewareObj;