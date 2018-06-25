//Dependencies.//
const express=require("express");
const mongoose=require("mongoose");
const exphbs=require("express-handlebars");
const bodyParser= require("body-parser");

const PORT=process.env.PORT || 3000;

const app=express();//Intializing Express.//

const routes=require("./routes");

app.use(express.static("public"));//Sets use of public folders.//

// Handlebars engine.//
app.engine("handlebars",exphbs({ defaultLayout:"main"}));
app.set("view engine","handlebars");

// Body Parser.//
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(routes);//Route use.//

// Use the deployed database otherwise use the local mongoHeadlines database.//
var MONGODB_URI=process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.Promise=Promise;//Assigns mongoose promise library.//
mongoose.connect(MONGODB_URI);//Connect to Mongo DB.//

// Start the server
app.listen(PORT,function(){
    console.log("Running on port:"+PORT);
});