const authController=require("express").Router();
const user=require('../models/user')
const bcrypt = require("bcrypt")
const jwt=require("jsonwebtoken")

//Registration
authController.post('/register',async(req,res)=>
{
    try{
    const isexist=await user.findOne({email: req.body.email})
    if(isexist) return res.status(404).json({msg: "Email has been already registered"})
    const hashpwd=await bcrypt.hash(req.body.password,10)
    if (!req.body.password) {
        return res.status(400).json({ error: "Password is required." });
    }
    const User = await user.create({...req.body, password: hashpwd})
    await User.save()
    const {password, ...others}=User._doc
    const token= createToken(others)
    return res.status(201).json({others,token})
    }
    catch(error)
    {
     return res.status(500).json(error.message)
    }
})

// Login
authController.post('/login',async(req,res)=>
{
    try{
      const User =await user.findOne({email:req.body.email})
      if(!User)
      {
        return res.status(404).json(({msg: "Invalid credentials"}))
      }
      const cmppass = await bcrypt.compare(req.body.password,User.password)
      if(!cmppass){
        return res.status(404).json(({msg: "Incorrect Password"}))
      }
      const {password, ...others} = User._doc
      const token = createToken(others)
      return res.status(200).json({others,token})

    }  
    catch(error)
    {
        return res.status(500).json(error.message) 
    }
})

authController.get('/users', async (req, res) => {
  try {
      const users = await user.find({});
      res.json(users);
  } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).send('Error fetching users');
  }
});

// Token formation
const createToken=(User) =>
{
    const payload = 
    {
        id: User._id.toString(),
        isAdmin: User.isAdmin
    }
    const token = jwt.sign(payload,process.env.JWT_SECRET)
    return token
}
module.exports = authController