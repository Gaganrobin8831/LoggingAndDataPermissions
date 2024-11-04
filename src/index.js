require('dotenv').config()
const express = require('express')
const connectDB = require('./DB/database')
const userrouter = require('./routes/Login.routes')

const app = express()

const port = process.env.port

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/',userrouter)

app.get('/',(req,res)=>{
    res.send('Hello World')
})

connectDB()
.then(()=>{
    app.listen(port, () => {
        console.log(`Server is running on port http://localhost:${port}/`)
    })
})
.catch((err)=>{
    console.log(err);
})