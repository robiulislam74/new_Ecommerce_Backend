const emailValidation = require('../helpers/emailValidation')
const passwordValidation = require('../helpers/passwordValidation')
const User = require('../model/userSchema')
const bcrypt = require('bcrypt')

const loginController = async (req,res) => {
  const {email,password} = req.body
  
    if(!emailValidation(email)){
        return res.send("error: Please enter valid email!")
    }
    else if(!email){
        return res.send("error: Please enter your email!")
    }
    else if(!password){
        return res.send("error: Please enter your password!")
    }
    else if(!passwordValidation(password)){
        return res.send("error:  minium 8 letter password, with at least a symbol, upper and lower case letters and a number ")
    }
    else{
        const isEmailExit = await User.find({email:email})
        if(isEmailExit.length>0){
            bcrypt.compare(password, isEmailExit[0].password, function(err, result) {
                if(result){
                    res.send({
                        success:"Login Successfull!",
                        email: isEmailExit[0].email,
                    })
                }else{
                 res.json("error: Email not macth!")
                 }
            });
        }else{
            res.json("error: Email not macth!")
        }
    }
}

module.exports=loginController;
