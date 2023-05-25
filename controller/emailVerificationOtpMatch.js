const User = require("../model/userSchema")

const emailVerificationOtpMatch =async (req,res) => {
  const {email,userOTP} = req.body;

  const isMatchOTP= await User.find({email})
  if(isMatchOTP.length>0){
    if(isMatchOTP[0].randomNumberOTP==userOTP){
      res.json({"Success":"OTP number Matched!"})
      const removeOtpAfterMatch = await User.findOneAndUpdate(
        {email},
        {$unset:{randomNumberOTP:""}},
        {new:true},
    )
    }else{
      res.json({"error":"OTP not Matched!"})
    }
  }
}

module.exports=emailVerificationOtpMatch;
