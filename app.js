/* Basic Initializtion*/
const express=require('express')
const path=require('path')
const mongoose=require('mongoose')
const app=express()
const userRouter=require('./Routes/user.routes.js')
const blogRoutes=require('./Routes/blog.routes.js')
const session=require('express-session')


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

const connect=mongoose.connect('mongodb://localhost:27017/socialDB', {useNewUrlParser: true,useUnifiedTopology: true });
connect.then(db=>{
    console.log('connecte with db successfully')
})

/*Mountung Routes */

app.use('/blog',blogRoutes)
app.use('/',userRouter)

app.listen(3001)