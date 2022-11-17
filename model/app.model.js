const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const appSchema=new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
  },{
    timestamps:true,
    versionKey:false
}
)
module.exports=new mongoose.model("student",appSchema);