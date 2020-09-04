const auth=(req,res,next)=>{
    if(req.session.userID){
         req.userID=req.session.userID
         next()
    }
    else{
       
        res.redirect('/')
    }
}
module.exports=auth