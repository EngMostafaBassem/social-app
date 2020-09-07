const express=require('express')
const blogRoutes=express.Router()
const controller=require('../Controllers/blogController')
const validators=require('../Validations/validators')
const auth=require('../Auth/auth')

blogRoutes.route('/').get(auth,controller.showBlogs)
blogRoutes.route('/my').get(auth,controller.showBlogsByUser)
blogRoutes.route('/add').post(auth,controller.addBlog)
blogRoutes.route('/update/:blogID').put(auth,controller.updateBlog)
blogRoutes.route('/delete/:blogID').delete(auth,controller.deleteBlog)

module.exports=blogRoutes