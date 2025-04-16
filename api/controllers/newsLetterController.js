const express = require('express')
const newsletter = require("../models/newsLetter");
const subscribeNewsLetterSchema = require("../models/subscribeNewsletter")
const cloudinary = require("../db/connectCloudinary");
const streamifier = require("streamifier");

exports.uploadNewsLetter = async (req, res) => {
    try {
        const { title } = req.body;

        console.log("Files received:", req.files);
        if (!req.files || !req.files.pdf || !req.files.cover) {
            return res.status(400).json({ message: "One or more files are missing." });
        }
        const pdfFileName = `newsletter_${Date.now()}.pdf`
        const uploadPdfPromise = new Promise((resolve, reject) => {
            const pdfUploadStream = cloudinary.uploader.upload_stream(
                { 
                    resource_type: "raw", 
                    folder: "newsletter",
                    public_id: pdfFileName 
                },
                (error, result) => {
                    if (error) {
                        console.error("Error uploading PDF:", error);
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );
            streamifier.createReadStream(req.files.pdf[0].buffer).pipe(pdfUploadStream);
        });

        const uploadCoverPromise = new Promise((resolve, reject) => {
            const coverUploadStream = cloudinary.uploader.upload_stream(
                { resource_type: "image", folder: "coverImages" },
                (error, result) => {
                    if (error) {
                        console.error("Error uploading cover image:", error);
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );
            streamifier.createReadStream(req.files.cover[0].buffer).pipe(coverUploadStream);
        });

        const [pdfUploadResult, coverUploadResult] = await Promise.all([uploadPdfPromise, uploadCoverPromise]);

        const pdfUrl = pdfUploadResult.secure_url;
        const coverUrl = coverUploadResult.secure_url;

        const newNewsLetterDoc = new newsletter({
            title,
            pdf_link: pdfUrl,
            cover_url: coverUrl, 
        });
        await newNewsLetterDoc.save();

        return res.status(201).json({
            message: "Newsletter uploaded successfully!",
            data: { title, pdf_link: pdfUrl, cover_url: coverUrl },
        });
    } catch (error) {
        console.error("Error during upload:", error);
        return res.status(500).json({
            message: "Failed to upload newsletter.",
            error: error.message || error,
        });
    }
}


exports.getLatestNewsLetters = async(req,res) =>{
    try{
        const latestNewsLetters = await newsletter.aggregate(
            [
                {
                  '$sort': {
                    'uploadDate': -1
                  }
                }, 
                {
                  '$limit': 3
                }
            ]
        )        
        return res.status(201).json({
            message:"NewsLetters fetched",
            data:latestNewsLetters
        })
    }catch(error){
        console.error(error)
        return res.status(400).json({
            message:"Could not fetch NewsLetters",
            error: error.message
        })
    }
}

exports.getAllNewsletters =async (req, res) => {
    try {
        const nl = await newsletter.find()
        res.status(200).json({
            message: "All newsletters fetched successfully!",
            data: nl,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch newsletters",
        });
    }
};

exports.getAlllatestNewsletters = async(req,res) =>{
    try{
        const allNewsLetters = await newsletter.aggregate(
            [
                {
                    '$sort':{
                        'uploadDate':-1
                    }
                }
            ]
        )
        return res.status(201).json({
            "message":"All newsletters fetched",
            "data":allNewsLetters
        })
    }catch(error) {
        console.error(error)
        return res.status(400).json({
            message:"Could not fetch NewsLetters",
            error: error.message
        })
    }
}

exports.subscribeNewsletter = async(req, res) => {
    try {
        const {email} = req.body;

        const user = await subscribeNewsLetterSchema.findOne({ 
                email: email
            });

        if (user) {
            return res.status(400).json({
                    message:"Mail already subscribed"
                });
        }

        const newUser = new subscribeNewsLetterSchema({ email: email });

        await newUser.save();

        return res.status(200).json({
            message:"Thanks for subscribing to our NewsLetter"
        });

    }catch(error) {
        console.error(error);
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }

}