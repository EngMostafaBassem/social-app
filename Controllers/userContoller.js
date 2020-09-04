const USERS=require('../Models/UserModel')
const BLOGS=require('../Models/blogModel')
const bcyrpt=require('bcrypt')
const { body, validationResult } = require('express-validator');
const validators=require('../Validations/validators')
const validatorsForChangePassword=require('../Validations/validatorChangePassword')
const Swal = require('sweetalert2')

exports.signIn=(req,res)=>{  

    if(req.session.userID){
        res.redirect('/home')
    }
    else{
        res.render('index.ejs',{isError:false})
    }
  
   
    
}

exports.register=(req,res)=>{
    res.render('registration.ejs',{errors:[],oldValues:{firstName:"",lastName:"",userName:"",password:"",email:"",jobRole:""}})
}

exports.signInHandle=(req,res)=>{

    
   const {email,password}=req.body
   USERS.findOne({email}).then(async(user)=>{
       if(user==null)
       {
           res.render('index.ejs',{isError:true,Swal})
       }
       else{
           if(await bcyrpt.compare(password,user.password)){
                req.session.userID=user._id;
                res.redirect('/home')
           }
           else{
            res.render('index.ejs',{isError:true,Swal})
           }
       }
   })
    
}

exports.registerHandle=(req,res)=>{

    const errors=validationResult(req)
    const userData={...req.body}
    const {firstName,lastName,userName,password,email,jobRole}=userData   
    if(!errors.isEmpty()){
        res.render('registration.ejs',{ errors:errors.array(),oldValues:{firstName,lastName,userName,password,email,jobRole}})
    }
     else{  
        USERS.findOne({email}).then( async(user)=>{
        if(user==null)
        {
            console.log(email)
            const hashedPassword= await bcyrpt.hash(password,8)
            USERS.create({firstName,lastName,userName,password:hashedPassword,email,jobRole}).then(data=>{
                res.redirect('/')
            }).catch(err=>console.log(err))
          
           
        }
        else{
            res.render('registration.ejs',{ errors:[{param:'email',msg:'Email has been taken'}],oldValues:{firstName,lastName,userName,password,email,jobRole}})
        }
    }).catch(err=>console.log(err))
}
  
}

exports.logout=(req,res)=>{
  req.session.destroy()
  res.redirect('/')
}

exports.home=async(req,res)=>{
    const userID=req.userID
    const user=await USERS.findOne({_id:userID})
    BLOGS.find({}).populate('user').then(blogs=>{
        res.render('home.ejs',{blogs,user})
    }).catch(err=>console.log(err))

  
}
exports.profile= async(req,res)=>{

      const userID=req.userID
      const user=await USERS.findOne({_id:userID})

      BLOGS.find({user:userID}).populate('user').then(blogs=>{
          
        res.render('profile.ejs',{blogs,user})
      }).catch(err=>console.log('error'))


     
}

exports.account=(req,res)=>{
    res.render('acount_setting.ejs',{errors:{msg:""}})
}

exports.changepassword= (req,res)=>{
    const {oldpassword,newpassword,repassword}=req.body
    const userID=req.userID
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        console.log(errors)
        res.render('acount_setting.ejs',{errors:{msg:"Please enter correct length of password"}})
    }

    USERS.findOne({_id:userID}).then(async (user)=>{
        if(user==null){
            res.end('error')
        }
        else{
            if(await bcyrpt.compare(oldpassword,user.password)){
               
                if(newpassword===oldpassword){
                    res.render('acount_setting.ejs',{errors:{msg:"Please enter valid new password"}})
                }
                else{
                    if(newpassword!=repassword){
                    res.render('acount_setting.ejs',{errors:{msg:"Your password and repeat password are not matched"}})
                    }
                    else{
                        const newHashedPassword=await bcyrpt.hash(newpassword,8)
                        user.password=newHashedPassword
                        user.save().then(resp=>{
                            res.redirect('/home')
                        }).catch(err=>console.log(err))
                    }
                }
            }
            else{
               res.render('acount_setting.ejs',{errors:{msg:"Please enter valid password"}})
            }
        }
    })
  
}