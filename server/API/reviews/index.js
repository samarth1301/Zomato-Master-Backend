import express from 'express'

import { ReviewModel } from "../../database/allModels";
import { ValidateReview, ValidateReviewId } from "../../validation/review";
const Router= express.Router();

/* 
Route     /new
descrip   add new review
params    none
access    review object
method    POST

*/

Router.post("/new", async (req,res)=>{
    try{
        const {reviewData}= req.body;
        await ValidateReview(reviewData);
       await ReviewModel.create(reviewData);
       return res.json({review: "Successfully Created"})
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
});


/* 
Route     /delete
descrip    delete a review
params    _id
access    Public
method    DELETE
*/

Router.delete("/delete/:_id", async (req,res)=>{
    try{
       const {_id}= req.params;
       await ValidateReviewId(_id);
       await ReviewModel.findByIdAndDelete(_id);
       return res.json({review: "Successfully Deleted Review"})
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
});

export default Router;



