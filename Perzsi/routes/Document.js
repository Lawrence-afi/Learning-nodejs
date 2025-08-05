const express = require("express");
const route = express.Router();
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { v4: uuidv4 } = require("uuid");

// Ensure body parsing middleware is used in your main app:
// app.use(express.json());

const s3 = new S3Client({
    region: process.env.DO_SPACES_REGION,
    endpoint: process.env.DO_SPACES_ENDPOINT,
    credentials: {
        accessKeyId: process.env.DO_SPACES_KEY,
        secretAccessKey: process.env.DO_SPACES_SECRET
    }
});

route.post("/api/v1/user/document-upload", async (req, res) => {
    try {
        let { filenames, contentType } = req.body;

        // Default to an array with one UUID filename if none is provided
        if (!Array.isArray(filenames) || filenames.length === 0) {
            res.status(500).json({
                success: false,
                message: "failed to generate PUT URLS"
            });
        }

        contentType = contentType || "image/jpeg";

        const results = await Promise.all(
            filenames.map(async name => {
                const fileName = `${uuidv4() + "_" + name}`;
                const command = new PutObjectCommand({
                    Bucket: process.env.DO_SPACES_BUCKET,
                    Key: "rentals/"+fileName,
                    ContentType: contentType
                });

                const signedUrl = await getSignedUrl(s3, command, {
                    expiresIn: 60 * 5
                });

                return {
                    fileName,
                    uploadUrl: signedUrl,
                    publicUrl: `${process.env.DO_SPACES_ENDPOINT}/${process.env.DO_SPACES_BUCKET}/${fileName}`
                };
            })
        );

        res.json({ files: results });
    } catch (err) {
        console.error("Error generating URLs:", err);
        res.status(500).json({ message: "Failed to generate PUT URLs" });
    }
});

module.exports = route;
