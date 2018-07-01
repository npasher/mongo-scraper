// Note Model.//

// Requiring Mongoose.//
let mongoose=require("mongoose");
let Schema=mongoose.Schema;//Schema creation utilizing Mongoose's method.//

let noteSchema=new Schema({//Creation of headlineSchema.//

  _headlineId:{//Headline is the associated article with note.//
    type:Schema.Types.ObjectId,
    ref:"Headline"
  },
  date:{//Date is a string.//
    type:Date,
    default:Date.now
  },
  noteText:String
});
///Creation of Note model utilizing noteSchema.//
let Note = mongoose.model("Note",noteSchema);

module.exports = Note;//Exporting the model.//