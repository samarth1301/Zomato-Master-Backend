import {RestaurantModel} from "../../database/allModels";
import express from 'express'


//validation
 import { ValidateRestaurantCity, ValidateRestaurantId, ValidateRestaurantSearchString } from "../../validation/restaurant";

const Router = express.Router();

/* 
    Route    /
    Des      Get all restaurants details
    Params    None
    Access    Public
    Method   Get
 */

 Router.get('/',async (req,res)=>{
     try{
      await ValidateRestaurantCity(req.query);

        const{city}=req.query;
        const restaurants= await RestaurantModel.find({city});
        return res.json({restaurants});
     }
     catch(error){
        return res.status(500).json({error: error.message});
     }
 })
/* 
    Route    /:id
    Des      Get particular Restaurant details on id
    Params    id
    Access    Public
    Method   Get
 */

 Router.get('/:_id',async (req,res)=>{
     try{
        //could have been fetched from food too
        await ValidateRestaurantId(req.params);
        const{_id}=req.params;
        const restaurant= await RestaurantModel.findOne({_id});
        if(!restaurant){
            return res.status(404).json({error:"Restaurant not found"});
        }
        return res.json({restaurant});
      }
      catch(error){
         return res.status(500).json({error: error.message});
      }
   });
   
   
   /* 
   Route    /search
   Des      Get Restaurant details on search
   Params    none
   body      searchString
   Access    Public
   Method   Get
   */
  
  
  Router.get("/search",async(req,res)=>{
     try{
        await ValidateRestaurantSearchString(req.params);
        const {searchString}=req.body;
        const restaurants = await RestaurantModel.find({
           name:{$regex: searchString, $options:"i"},
         });
         return res.json({restaurants});
      }
      catch(error){
         return res.status(500).json({error: error.message});
    }

 })

 export default Router;