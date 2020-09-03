const express=require('express')
const { env } = require('process')
const app=express()

app.get('/',(req,res)=>{
    res.end('Welcome from express')
})
app.listen(3001||env.port)