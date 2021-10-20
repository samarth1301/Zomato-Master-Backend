import express from 'express';
import passport from 'passport';

const Router=express.Router();

//models
import {UserModel} from "../../database/user/index";


//validation

import { ValidateSignup,ValidateSignin } from "../../validation/auth";


/* 
Route     /signup
descrip   signup with email and password
params    none
access    public
method    post

*/

Router.post("/signup",async(req,res)=>{
    try{
        
        await ValidateSignup(req.body.credentials);
        //check whether email or phone already exists
        
        await UserModel.findEmailAndPhone(req.body.credentials);

        


        //DB

        const newUser=await UserModel.create(req.body.credentials
        )

        //JWT AUth Token
        const token = newUser.generateJwtToken();

        return res.status(200).json({token});


    } catch(error){
        return res.status(500).json({error: error.message});
    }
})

/* 
Route     /signin
descrip   signin with email and password
params    none
access    public
method    post

*/

Router.post("/signin",async(req,res)=>{
    try{
        await ValidateSignin(req.body.credentials);
        
      
      const user = await UserModel.findByEmailAndPassword(req.body.credentials);

        //JWT AUth Token
        const token = user.generateJwtToken();

        return res.status(200).json({token, status:"Success"});


    } catch(error){
        return res.status(500).json({error: error.message});
    }
})
/* 
Route     /google
descrip   Google signin 
params    none
access    public
method    GET

*/

Router.get("/google",passport.authenticate("google",{
  scope:[
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"

  ],
}));

/* 
Route     /google/callback
descrip   Google signin callback
params    none
access    public
method    GET

*/

Router.get("/google/callback",passport.authenticate("google",{
  failureRedirect:"/"
} ),(req,res)=>{
  return res.json({token: req.session.passport.user.token});
});

export default Router;
