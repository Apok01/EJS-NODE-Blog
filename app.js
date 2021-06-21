//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash/fp");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
const posts = [];
const portServer = 3000;
const linkAdress = "localhost:";

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public/"));



app.get("/", (req,res) => {
  if(posts[0] === undefined || posts[0] === null){
    let bodyData = {
      postTitle: "Buen dia",
      postBody: "Hello World"
    }
    posts.push(bodyData);
      res.render("home", {
        posts: posts,
    
      });
    
  } else { 
      res.render("home", {
      posts: posts,
  });
  }
});


app.get("/contact",(req,res) =>{
  res.render("contact",{
    contactContent: contactContent
  });
});


app.get("/about", (req,res) =>{
  res.render("about", {
    aboutContent:aboutContent
  });
});


app.get("/compose", (req,res) => {
  res.render("compose");
});
app.post("/compose", (req,res)=>{
  let linkData = linkAdress + portServer + "/posts/" +_.kebabCase(req.body.postTitle);
  let bodyData = {
    postTitle: req.body.postTitle,
    postBody: req.body.postBody,
    postLink: linkData
  };
// console.log("Title: " + bodyData.postTitle);
//console.log("Post: " + bodyData.postBody);
  posts.push(bodyData);
  //console.log(posts);
  res.redirect("/");

});

app.get("/posts/:postName", (req,res)=>{
  let requestedTitle = _.kebabCase(req.params.postName);
  posts.forEach((content)=>{
    let storedTitle = _.kebabCase(content.postTitle);
    if (storedTitle === requestedTitle) {
      res.render("post", {
        postTitle: content.postTitle,
        postBody: content.postBody


      }) ;
    } 
  });
});














app.get("*", (req,res) =>{
  res.render("404");
})
app.listen(portServer, () => {
  console.log("Server started on port: "+ portServer);
  //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
  //bdc2ba3a6a76d00a8c59023d28d71aaf
});
