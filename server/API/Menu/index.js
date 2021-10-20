//Libararies

import express from 'express';

//databse model
import {MenuModel,ImageModel} from "../../database/allModels";
import { ValidateRestaurantId } from "../../validation/restaurant";
const Router = express.Router();

/* 
    Route    /list
    Des      Get the list of menu of a particular restaurant     Params    _id
    Access    Public
    Method   Get
 */

 Router.get("/list/:_id",async (req,res)=>{
     try{
        await ValidateRestaurantId(req.params);
        const {_id}=req.params;
        const menus=await MenuModel.findOne(_id);
        return res.json({menus});
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
});
/* 
Route    /image
Des      Get the menu image based on id
Params    _id
Access    Public
Method   Get
*/

Router.get("/image/:_id",async(req,res)=>{
    try{
        await ValidateRestaurantId(req.params);
        const{_id}=req.params;
        const menus= await ImageModel.findOne(_id);
        return res.json({menus});
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
});





 export default Router;