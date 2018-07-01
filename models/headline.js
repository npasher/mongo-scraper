//Headline Model.//

const mongoose=require("mongoose");//Requiring Mongoose.//

let Schema=mongoose.Schema;//Schema creation utilizing Mongoose's method.//

let headlineSchema=new Schema({//Creation of headlineSchema.//
  headline:{//Headline:required and will be a string.//
    type:String,
    required:true,
    unique:{index:{unique:true}}
  },
  summary:{//Summary:required and will be a string.//
    type:String,
    required:true
  },
  url:{//URL:required and will be a string.//
    type:String,
    required:true
  },
  date:{//Date:will be a string with the default being the current value.//
    type:Date,
    default:Date.now
  },
  saved:{
    type:Boolean,
    default:false
  }
});
//Creation of Headline model utilizing headlineSchema.//
let Headline=mongoose.model("Headline",headlineSchema);

module.exports=Headline;//Exporting the model.//