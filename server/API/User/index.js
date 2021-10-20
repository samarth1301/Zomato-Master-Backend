import express from 'express'

import { UserModel } from "../../database/allModels";
import { ValidateUserId, ValidateUser } from "../../validation/user";
const Router= express.Router();

/* 
Route     /
descrip   Get an user data
params    :_id
access    PUBLIC
method    GET

*/

Router.get("/:_id", async (req,res)=>{
    try{
        await ValidateUserId(req.params);
       const {_id}= req.params;
       const getUser= await UserModel.findById(_id);
            return res.json({user: getUser});
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
});


/* 
Route     /update
descrip   Update an user data
params    :_userId
Body      user data
access    PUBLIC
method    PUT

*/

Router.put("/update/:_userId", async (req,res)=>{
    try{
        await ValidateUserId(req.params);
        await ValidateUser(req.body.userData);
       const {_userId}= req.params;
       const {userData}=req.body;
       const updateUserData= await UserModel.findByIdAndUpdate(_userid,{
           $set: userData
       },
       {
           new: true
       }
       );
            return res.json({user: updateUserData});
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
});

export default Router;



