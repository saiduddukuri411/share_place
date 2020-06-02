

const HttpError=require('../models/http_errors');
const {validationResult} =require('express-validator')
const userModel=require('../models/users');

const getUsers=async(req,res,next)=>{
    let users;
    try{
        users=await userModel.find({},'-password').exec();
    }catch(err){
         return next(new HttpError('cannot fetch users, refresh your page',500));

    }
    if (users.length>0){
        res.status(200).json({users:users.map(list=>list.toObject({getters:true}))})
    }else{
      res.status(200).json({users:[]})
        // return next(new HttpError('no user exist',401));
    }
};
const signUp=async(req,res,next)=>{
    const {name,email,password}=req.body;
    console.log(req.body)
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return next(new HttpError('invalid details for signing up',422));
    }
 
    let existingUser;
    try{
        existingUser=await userModel.findOne({email:email});
    }catch(error){
        return next(new HttpError('something went wrong,try again to sign in',500))
    }
    
    if(existingUser){
      return next(new HttpError('already email exists,please login insted',422))
    }else{
    const user=new userModel({
        name,
        email,
        password,
        image:'https://www.w3schools.com/w3images/avatar2.png',
        places:[]
    })
    
    try{
      await user.save();
    }catch(err){
      return (new HttpError('user cannot be created , try again',500))
    }
    res.status(201).json({user:user.toObject({getters:true})});
    }
};
const logIn=async(req,res,next)=>{
    const {email,password}=req.body;
    let existingUser;
    try{
      existingUser=await userModel.findOne({email:email});
    }catch(error){
      return next(new HttpError('Logging in failed, try again logging in',500));
    }
    //const user=
    if(!existingUser){
      return next(new HttpError('email doesnt exist,Please sign up',401));
    }
    if(existingUser.password===password){
        res.status(200).json({message:"success logging",user:existingUser.toObject({getters:true})})
    }else{
        return  next(new HttpError('Invalid Credentials, could not log you in',401));
    }
};
module.exports={getUsers,signUp,logIn}
