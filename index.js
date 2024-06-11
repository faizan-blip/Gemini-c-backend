const express = require('express')
const app = express()
const dbconnect = require('./config/database')
const path = require('./routers/route')
require('dotenv').config()





dbconnect();
app.use('/api' , path)

app.listen(process.env.PORT , ()=>{
    console.log(`App is successfully running at ${process.env.PORT}`);
})