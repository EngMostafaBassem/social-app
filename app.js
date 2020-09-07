/* Basic Initializtion*/
const express=require('express')
const path=require('path')
const mongoose=require('mongoose')
const app=express()
const userRouter=require('./Routes/user.routes.js')
const blogRoutes=require('./Routes/blog.routes.js')
const session=require('express-session')
const { env } = require('process')


/*Basic Setup*/
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'public')))
app.set('view-engine','ejs')
app.set('views','Views')
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }))
  app.use(express.json())

const connect=mongoose.connect('mongodb://localhost:27017/socialDB', {useNewUrlParser: true,useUnifiedTopology: true });
connect.then(db=>{
    console.log('connecte with db successfully')
})

/*Mountung Routes */

app.use('/api/v1/blogs',blogRoutes)
app.use('/api/v1',userRouter)

app.listen(3001||env.PORT)