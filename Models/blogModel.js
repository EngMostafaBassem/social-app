const mongoose=require('mongoose')
const Schema=mongoose.Schema
const blogSchema=new Schema({
 
    title:{
        type:String,
        required:true
    },
     content:{
         type:String,
         required:true
     },
     user:{
         type:Schema.Types.ObjectId,
         ref:"USER"
     }
},{timestamps:true})
const BLOGS=mongoose.model('BLOG',blogSchema)
module.exports=BLOGS