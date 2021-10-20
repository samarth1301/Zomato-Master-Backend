//Libraries

// require('dotenv').config();
import express from 'express';
import multer from 'multer'

//databse model

import {ImageModel} from '../../database/allModels'

//utilities
import { s3Upload } from "../../Utils/AWS/s3";


//router

const Router= express.Router();


//multer config
const storage = multer.memoryStorage();
const upload= multer({storage});





/* 
Route     /
descrip   uploading given image to S# bucket and saving the file to mongo db
params    none
access    public
method    POST

*/

Router.post("/", upload.single("file") ,async (req,res)=>{
    try{
        const file=req.file;

        //s3 bucket options
        const bucketOptions={
            Bucket: "zomatomastersam",
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read"
        };
        
    
        const uploadImage= await s3Upload(bucketOptions);
        return res.json(uploadImage);
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
});


export default Router;