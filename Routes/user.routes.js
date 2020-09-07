
const express=require('express')
const userRoutes=express.Router()
const controller=require('../Controllers/userContoller')
const validators=require('../Validations/validators')
const validatorsForChangePassword=require('../Validations/validatorChangePassword')
const auth=require('../Auth/auth')
userRoutes.route('/login').post(controller.signInHandle)
userRoutes.route('/register').post(validators,controller.registerHandle)
userRoutes.route('/logout').get(auth,controller.logout)
userRoutes.route('/changepassword').post(auth,validatorsForChangePassword,controller.changepassword)


module.exports=userRoutes