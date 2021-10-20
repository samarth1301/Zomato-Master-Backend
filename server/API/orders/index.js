import express from 'express'

import passport from 'passport'

import { OrderModel } from "../../database/allModels";
import { ValidateUserId } from "../../validation/user";
import { ValidateOrder} from "../../validation/order";

const Router= express.Router();

/* 
Route     /:_id
descrip   get all orders based on _id
params    _id
access    public
method    GET

*/

Router.get("/:_id", passport.authenticate("jwt",{session: false})  ,async (req,res)=>{
    try{
        await ValidateUserId(req.params);
        const {_id}=req.params;
        const getOrders=await OrderModel.findOne({user:_id});
        if(!getOrders){
            return res.status(404).json({error:"User not found"});
        }
        return res.json({getOrders});
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
});

/* 
Route     /new
descrip   add new order
params    _id
access    public
method    POST

*/

Router.post("/new/:_id",passport.authenticate("jwt",{session: false})  , async (req,res)=>{
    try{
        await ValidateUserId(req.params);
        await ValidateOrder(req.body);
        const{_id}=req.params;
        const {orderDetails}= req.body;
       const addNewOrder = await OrderModel.findOneAndUpdate({
           user:_id
       },{
           $push:{orderDetails:orderDetails}
       },{
           new:true
       }
       );
       return res.json({order: addNewOrder});
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
});



export default Router;