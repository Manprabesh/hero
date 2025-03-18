import express from "express"
const app=express()


app.get('/',(req,res)=>{
	res.send("hello dev'v")})

app.listen(3000)
