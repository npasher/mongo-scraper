const db=require("../models");

module.exports={
  findOne:function(req,res){//Finds one specific note.//
    db.Note
      .findOne(req.query)
      .then(function(dbNote){
        res.json(dbNote);
    });
  },
  create:function(req,res){//Creates new note.//
    db.Note
      .create(req.body)
      .then(function(dbNote){
        res.json(dbNote);
    });
  },
  delete:function(req,res){//Deletes note with a specific id.//
    db.Note
      .remove({ _id:req.params.id})
      .then(function(dbNote){
        res.json(dbNote);
    });
  }
};