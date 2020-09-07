const BLOGS=require('../Models/blogModel')


exports.showBlogs=(req,res)=>{
    
    BLOGS.find({}).populate('user').then(blogs=>{
        res.status(200).json({data:blogs})
    }).catch(err=>res.status(406).json({msg:'failed to show blogs',err}))
    
}


exports.showBlogsByUser=(req,res)=>{
    
    const userID=req.userID
    BLOGS.find({user:userID}).populate('user').then(blogs=>{
        res.status(200).json({data:blogs})
    }).catch(err=>res.status(406).json({msg:'failed to show blogs',err}))
    
}

exports.addBlog=(req,res)=>{
    
    const {title,content}=req.body
    const userID=req.userID  
    BLOGS.create({title,content,user:userID}).then(blog=>{
        res.status(200).json({msg:'New Blog Added',data:blog})
    }).catch(err=>res.status(406).json({msg:'failed to add new blog',err}))
}



exports.updateBlog=(req,res)=>{
    
   const blogID=req.params.blogID
   const {title,content}=req.body
   BLOGS.findByIdAndUpdate(blogID,{title,content},{new:true}).then(blog=>{
       res.status(200).json({msg:"Blog with id:"+blogID+" has been updated Successfully"})
   }).catch(err=>res.status(406).json({msg:"Failure to update blog",err}))
}




exports.deleteBlog=(req,res)=>{
    
    const blogID=req.params.blogID
    BLOGS.findByIdAndDelete(blogID+"").then(resp=>{
        res.status(200).json({msg:'blog has been removed successfully'})
    }).catch(err=>res.status(406).json({msg:"Failure to delete blog",err}))
}
