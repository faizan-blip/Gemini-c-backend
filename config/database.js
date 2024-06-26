const mongoose = require('mongoose')
require("dotenv").config()
const dbconnect = ()=>{
     mongoose.connect(process.env.DATABASE_URL, 
        {
            useNewUrlParser:true,
            useUnifiedTopology:true
        }).then(()=>{
            console.log("Db is Connected Successfully");
        }).catch((err)=>{
            console.log(err.message);
        })
}

module.exports = dbconnect