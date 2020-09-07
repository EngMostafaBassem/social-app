const auth=(req,res,next)=>{
    if(req.session.userID){
         req.userID=req.session.userID
         next()
    }
    else{
       
        res.status(401).json({msg:'unauthorized'})
    }
}
module.exports=auth