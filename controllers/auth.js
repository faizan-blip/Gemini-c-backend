const authschema = require('../models/authschema');
const bycrpt = require('bcrypt')
var jwt = require('jsonwebtoken');
const forgotlink = require('./forgotpasslink');

exports.signup = async (req, res)=>{
    try{
    const {name , email , password} = req.body;
     const existuser = await authschema.findOne({email})
     if(existuser){
        res.status(400).json({
            status:false,
            message:"Email Already Exist"
        })
     }

     const hashedpass = bycrpt.hash(password , 10)
     const createuser = await authschema.create({name , email , password:hashedpass})
     res.status(201).json({
        status: true,
        data: user,
        message: `${createuser.name} successfully signed up.`,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        status: false,
        message: "An error occurred while signing up.",
      });
    }
}

exports.signin = async(req,res) =>{
    try{
        const {email , password} = req.body;

        const existuser = await authschema.findOne({email})
        if(!existuser){
            res.status(400).json({
                status:false,
                messsage:"Please Signup to continue"
            })
        }
        const checkpass = await bycrpt.compare(password , existuser.password)
        if (!checkpass) {
            return res.status(401).json({
              status: false,
              message: "Invalid credentials.",
            });
          }
 const payload = {
    id:existuser.id,
    name:existuser.name
 }

 const token = jwt.sign(payload , Gemini-c , { expiresIn: '1h' })
   const user = await authschema.create({email , password , token})
  res.status(200).json({
    status:true,
    data:user,
    message: `${user.name} successfully Logged in.`,
  })
}catch(err){
    console.error(err);
    res.status(500).json({
      status: false,
      message: "An error occurred while login.",
    });
  }

}

exports.forgotpass = async( req , res)=>{
    try{
        const {email} = req.body

        const existuser = await authschema.findOne({email})
        if(!existuser){
            res.status(400).json({
                status:false,
                messsage:"Please Signup to reset the password"
            })
        }
        const payload = {
            id:existuser.id,
            name:existuser.name
         }
        
         const token = jwt.sign(payload , Gemini-c , {expiresIn:"30s"} )
         const link = `https://http://localhost:3000/forgotpassword/${existuser._id}/${token}`;
         await forgotlink(link , existuser.email)
         res.status(201).json({
            success: true,
            data: link,
            message: "Forgot link send to the mail",
          });
        } catch (err) {
          console.error(err);
          res.status(500).json({
            status: false,
            message: "An error occurred while login.",
          });
        }
     
}