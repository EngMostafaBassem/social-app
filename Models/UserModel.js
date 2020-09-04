const mongoose=require('mongoose')
const Schema=mongoose.Schema
const userSchema=new Schema({

    firstName:{
        type:String,
        required:true,
       

    },
    lastName:{
        type:String,
        required:true,
  

    },
    userName:{
        type:String,
        required:true,
      

    },
    email:{
        type:String,
        required:true,
       
    },
    password:{
        type:String,
        required:true,
      
    },
    jobRole:{
        type:String,
        required:true,
    },

    
},{timestamps:true})

const USERS=mongoose.model('USER',userSchema)
module.exports=USERS