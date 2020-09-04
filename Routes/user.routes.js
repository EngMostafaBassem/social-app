
const express=require('express')
const userRoutes=express.Router()
const controller=require('../Controllers/userContoller')
const validators=require('../Validations/validators')
const validatorsForChangePassword=require('../Validations/validatorChangePassword')
const auth=require('../Auth/auth')
userRoutes.route('/').get(controller.signIn).post(controller.signInHandle)
userRoutes.route('/register').get(controller.register).post(validators,controller.registerHandle)
userRoutes.route('/home').get(auth,controller.home)
userRoutes.route('/logout').get(auth,controller.logout)
userRoutes.route('/account').get(auth,controller.account)
userRoutes.route('/changepassword').post(auth,validatorsForChangePassword,controller.changepassword)
userRoutes.route('/profile').get(auth,controller.profile)

module.exports=userRoutes