const express=require('express')
const app=express()

app.get('/',(req,res)=>{
    res.end('Welcome from express')
})
app.listen(3001)