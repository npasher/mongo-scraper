const router=require("express").Router();

router.get("/",function(req,res){//Homepage rendered.//
  res.render("home");
});

router.get("/saved",function(req,res){//Rendered handlebars saved.//
  res.render("saved");
});

module.exports=router;