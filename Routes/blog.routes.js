const express=require('express')
const blogRoutes=express.Router()
const controller=require('../Controllers/blogController')
const validators=require('../Validations/validators')
const auth=require('../Auth/auth')

blogRoutes.route('/').post(auth,controller.addBlog)

module.exports=blogRoutes