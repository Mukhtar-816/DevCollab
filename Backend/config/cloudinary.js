const cloudinary = require("cloudinary").v2;


// Configuration
cloudinary.config({
    cloud_name: 'dgfl170qg',
    api_key: '547374751168497',
    api_secret: 'e2U1-J1s7Fawx6ziUj9HOcTqLQs' // Click 'View API Keys' above to copy your API secret
});

const uploadImageBuffer = (fileBuffer, folderName = "profiles") => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: folderName,
                resource_type: "image",
                transformation: [{ width: 500, height: 500, crop: "limit", quality: "auto" }]
            },
            (error, result) => {
                if (error) {
                    return reject(new CustomError(400, "Internal Error"));
                }
                resolve(result.secure_url);
            }
        );

        // Convert the static memory buffer into a readable stream and pipe it into Cloudinary
        const readableStream = new Readable();
        readableStream.push(fileBuffer);
        readableStream.push(null); // Signals EOF (End of file)
        readableStream.pipe(uploadStream);
    });
};

module.exports = { uploadImageBuffer };