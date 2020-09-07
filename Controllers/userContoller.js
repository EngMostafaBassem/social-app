const USERS=require('../Models/UserModel')
const BLOGS=require('../Models/blogModel')
const bcyrpt=require('bcrypt')
const { body, validationResult } = require('express-validator');


exports.signInHandle=(req,res)=>{

    
   const {email,password}=req.body
   USERS.findOne({email}).then(async(user)=>{
       if(user==null)
       {
           res.status(401).json({msg:'Email or password is incorrect'})
          // res.render('index.ejs',{isError:true,Swal})
       }
       else{
           if(await bcyrpt.compare(password,user.password)){
                req.session.userID=user._id;
                //res.redirect('/home')
                res.status(200).json({msg:'Signed In Successfully'})
           }
           else{
            res.status(401).json({msg:'Email or password is incorrect'})
            //res.render('index.ejs',{isError:true,Swal})
           }
       }
   })
    
}

exports.registerHandle=(req,res)=>{

    const errors=validationResult(req)
    const userData={...req.body}
    const {firstName,lastName,userName,password,email,jobRole}=userData   
    if(!errors.isEmpty()){
       // res.render('registration.ejs',{ errors:errors.array(),oldValues:{firstName,lastName,userName,password,email,jobRole}})
        res.status(406).json({msg:'Failed to register',err:errors.array()})
    }
     else{  
        USERS.findOne({email}).then( async(user)=>{
        if(user==null)
        {
            
            const hashedPassword= await bcyrpt.hash(password,8)
            USERS.create({firstName,lastName,userName,password:hashedPassword,email,jobRole}).then(data=>{
                res.status(200).json({msg:'Registerd Successfully'})
               // res.redirect('/')
            }).catch(err=>console.log(err))
          
           
        }
        else{
            res.status(406).json({msg:'Failed to register',err:'Email has been taken'})
           // res.render('registration.ejs',{ errors:[{param:'email',msg:'Email has been taken'}],oldValues:{firstName,lastName,userName,password,email,jobRole}})
        }
    }).catch(err=>console.log(err))
}
  
}

exports.logout=(req,res)=>{
  req.session.destroy()
  
  res.status(200).json({msg:'User has logged out successfully'})
}


exports.changepassword= (req,res)=>{
    const {oldpassword,newpassword,repassword}=req.body
    const userID=req.userID
    const errors=validationResult(req)
    if(!errors.isEmpty()){
       
        res.status(406).json({msg:'failure',err:"Please enter correct length of password"})
    }

    USERS.findOne({_id:userID}).then(async (user)=>{
        if(user==null){
            res.end('error')
        }
        else{
            if(await bcyrpt.compare(oldpassword,user.password)){
               
                if(newpassword===oldpassword){
                   
                    res.status(406).json({msg:'failure',err:"Please enter valid new password"})
                }
                else{
                    if(newpassword!=repassword){
                   
                    res.status(406).json({msg:'failure',err:"Your password and repeat password are not matched"})
                    
                    }
                    else{
                        const newHashedPassword=await bcyrpt.hash(newpassword,8)
                        user.password=newHashedPassword
                        user.save().then(resp=>{
                          
                            res.status(200).json({msg:'Password has been changed successfully'})
                        }).catch(err=>console.log(err))
                    }
                }
            }
            else{
            
               res.status(406).json({msg:'failure',err:"Please enter valid new password"})
            }
        }
    })
  
}