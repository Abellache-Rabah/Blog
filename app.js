//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require("mongoose");

const aboutContent = "hello.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/blog");


/*globel*/
const posts=[];
const postSchema = new mongoose.Schema({ title: 'string',  body : "string"});

const Post = mongoose.model("post" , postSchema);

const homePost = new Post ({
  title : "Home Page",
  body : "welcome to rabah's blog a personal blog by rabah abellache if u want to know about me go to the about me page in navbar or you wana contact me go to contact page above!."
});

const defaultPosts =[homePost];







app.get("/",function(req , res){

  Post.find({},function(err,result){
    if(err){
      res.redirect("/")
    }else {
    res.render("home", {homeStartingContent: homePost.body, posts: result});
      
    }
});

});











app.get("/posts/:topic" ,function(req , res){
  const reqTitle = _.lowerCase(req.params.topic);
 
  Post.findById(req.params.topic, function (err, results) {
    if (err) {
      console.log(err);
      res.render("not-found");
    } else {
      res.render("post",{
        postsTitle: results.title,
        postBody : results.body
      });
    }
  });
});














app.get("/about",function(req , res){
  res.render("about", {
    aboutContent : aboutContent
  });
  
});



app.get("/zidpost",function(req , res){
  res.render("zidpost");
  
});

app.post("/zidpost",function(req , res){

  const post = new Post ({
    title : req.body.postTitle,
    body : req.body.postBody
  });

  post.save();
  res.redirect("/");

});












app.listen(3000, function() {
  console.log("Server started on port 3000");
});
