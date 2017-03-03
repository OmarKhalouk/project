var express = require('express');
var router = express.Router();
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;

var User=require('../models/user');

     router.get('/',function(req,res){
        res.render('index.html');
     });
     router.get('/Sign_up',function(req,res){
        res.render('Sign_up.html');
    });
     router.get('/Sign_up2',function(req,res){
     	res.render('Sign_up2.html');
     });
     router.get('/Log_in',function(req,res){
     	res.render('Log_in.html');
     });
     router.get('/Log_in2',function(req,res){
     	res.render('Log_in2.html');
     });
     router.get('/Log_in3',function(req,res){
     	res.render('Log_in3.html');
     });
     router.get('/View_no_Pass',function(req,res){
     	res.render('View_no_Pass.html');
     });
     router.get('/View',function(req,res){
     	res.render('View.html');
     });

        router.post('/Log_in',
 	passport.authenticate('local',{successRedirect:'View',failureRedirect:'Log_in3',failureFlash:true}),
 	function(req,res){
 		res.redirect('/');
 	});
 router.post('/Log_in2',
 	passport.authenticate('local',{successRedirect:'View',failureRedirect:'Log_in3',failureFlash:true}),
 	function(req,res){
 		res.redirect('/');
 	});

  router.post('/Log_in3',
 	passport.authenticate('local',{successRedirect:'View',failureRedirect:'Log_in3',failureFlash:true}),
 	function(req,res){
 		res.redirect('/');
 	});
 

 router.post('/Sign_up2',function(req,res){
       var Fname=req.body.Fname;
       var Lname=req.body.Lname;
       var UserName=req.body.UserName;
       var Password=req.body.Password;


       req.checkBody('Fname','You have to insert a first name').notEmpty();
       req.checkBody('Lname','You have to insert a last name').notEmpty();
       req.checkBody('UserName','You have to insert a User name').notEmpty();
       req.checkBody('Password','You have to insert a Password').notEmpty();


       var errors = req.validationErrors();
       if(errors){
       	res.redirect('Sign_up2');
       }else{
       	var newUser=new User({
       		Fname:Fname,
       		Lname:Lname,
       		UserName:UserName,
       		Password:Password
       	});
       	User.createUser(newUser,function(err,user){
       		if(err) throw err;
       		console.log(User);
       	});

       	req.flash('sucess_msg','Registered');
       res.redirect('Log_in2');
   }
   });


     router.post('/Sign_up',function(req,res){
       var Fname=req.body.Fname;
       var Lname=req.body.Lname;
       var UserName=req.body.UserName;
       var Password=req.body.Password;


       req.checkBody('Fname','You have to insert a first name').notEmpty();
       req.checkBody('Lname','You have to insert a last name').notEmpty();
       req.checkBody('UserName','You have to insert a User name').notEmpty();
       req.checkBody('Password','You have to insert a Password').notEmpty();


       var errors = req.validationErrors();
       if(errors){
       	res.redirect('Sign_up2');
       }else{
       	var newUser=new User({
       		Fname:Fname,
       		Lname:Lname,
       		UserName:UserName,
       		Password:Password
       	});
       	User.createUser(newUser,function(err,user){
       		if(err) throw err;
       		console.log(User);
       	});

       	req.flash('sucess_msg','Registered');
       res.redirect('Log_in2');
   }
   });
     passport.use(new LocalStrategy(
  function(UserName, Password, done) {
   User.getUserByUserName(UserName, function(err, user){
   	if(err) throw err;
   	if(!User){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(Password, User.Password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid Password'});
   		}
   	});
   });
  }));


passport.serializeUser(function(User, done) {
  done(null, User.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, User) {
    done(err, User);
  });
});


   




module.exports=router;
