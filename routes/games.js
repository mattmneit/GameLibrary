var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var {ensureAuthenticated} = require("../helper/auth");

//load game model
require("../models/Game");
var Game = mongoose.model("games");

router.get("/games", function(req, res){
    Game.find({user:req.user.id}).then(function(games){
        console.log(games);
        res.render("gameentry/index", {
            games:games
        });
    });
    
});

//post request
router.post("/gameentry", ensureAuthenticated, function(req, res){
    console.log(req.body);
    var errors = [];

    if(!req.body.title){
        errors.push({text:"please add a title, fool"})
    }
    if(!req.body.price){
        errors.push({text:"please add a price, fool"})
    }
    if(!req.body.description){
        errors.push({text:"please add a description, fool"})
    }
    if(errors.length > 0){
        res.render("gameentry/gameentryadd",{
            errors:errors,
            title:req.body.title,
            price:req.body.price,
            description:req.body.description
        });
    }else{
        //res.send(req.body);
        var newUser = {
            title:req.body.title,
            price:req.body.price,
            description:req.body.description,
            user:req.user.id
        }
        Game(newUser).save().then(function(games){
            //console.log(games);
            req.flash("success_msg", "Gamb abdede");
            res.redirect("games");
        });
    }
    
});


router.get("/gameentry/gameentryadd", ensureAuthenticated,function(req, res){
    res.render("gameentry/gameentryadd");
});
router.put("/gameedit/:id", ensureAuthenticated,function(req, res){
    Game.findOne({
        _id:req.params.id
    }).then(function(game){
        game.title = req.body.title;
        game.price = req.body.price;
        game.description = req.body.description;

        game.save().then(function(game){
            req.flash("success_msg", "Gamb Edbitd");
            res.redirect("/game/games");
        })
    })
})
router.delete("/gamesdelete/:id", ensureAuthenticated,function(req, res){
    Game.remove({
        _id:req.params.id
    }).then(function(){
        req.flash("success_msg", "Gamb deleteleteletele");
        res.redirect("/game/games")
    });
});
router.get("/gameentry/gameentryedit/:id",ensureAuthenticated, function(req, res){
    Game.findOne({
        _id:req.params.id
    }).then(function(games){

        if(Game.user != req.user.id){
            req.flash('error_msg', 'Not Authorized');
            res.redirect('games');
        }
        else{
            res.render("gameentry/gameentryedit",{
            games:games
        });
    }
    });    
});

module.exports = router;