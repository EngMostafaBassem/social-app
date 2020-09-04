const BLOGS=require('../Models/blogModel')
exports.addBlog=(req,res)=>{
    
    const {title,content}=req.body
    const userID=req.userID
   
    
    BLOGS.create({title,content,user:userID}).then(blog=>{
        res.redirect('/home')
    }).catch(err=>console.log(err))
}