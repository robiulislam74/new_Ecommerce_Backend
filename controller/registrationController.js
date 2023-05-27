const emailValidation = require('../helpers/emailValidation')
const passwordValidation = require('../helpers/passwordValidation')
const User = require('../model/userSchema')
const bcrypt = require('bcrypt')
const otpTemplete = require('../helpers/emailOTP')
const aleaRNGFactory = require("number-generator/lib/aleaRNGFactory");
const nodemailer = require('nodemailer')

const registrationController = async(req,res)=>{
    const {fullName,email,password} = req.body
    
    if(!fullName){
        return res.send("error: Please enter your fullName!")
    }
    else if(!emailValidation(email)){
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
        const duplicateEmail = await User.find({email:email})
        if(duplicateEmail.length>0){
           return res.send({error:"Email Already Exits Please Try another?"})
        }

        bcrypt.hash(password, 10,async function(err, hash) {
            const user = new User({
                fullName,
                email,
                password:hash,
            })
            user.save()
            const generator1 = aleaRNGFactory(Date.now());
            const randomOTP=(generator1.uInt32().toString().substring(0,4));

            const randomOtpStore = await User.findOneAndUpdate(
                {email},
                {$set:{randomNumberOTP:randomOTP}},
                {new:true},
            )

            // setTimeout(async function(){
            //     console.log("worked!")
            //     const randomOtp = await User.findOneAndUpdate(
            //         {email},
            //         {$unset:{randomNumberOTP:""}},
            //         {new:true},
            //     )
            // },60000)
            
            let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  user: "anikhasan7411@gmail.com", 
                  pass: "cmlasrmloxfcoaad", 
                },
              });
        
              let info = await transporter.sendMail({
                from: "anikhasan7411@gmail.com", 
                to: email, 
                subject: "Hello ✔", 
                html: otpTemplete(randomOTP), 
              });

            res.send({
                success:"Registration successful Please check your email!",
                fullName: user.fullName,
                email: user.email,
            })
        });
    }
}
module.exports=registrationController;
