/* const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

// AWS account credentials
aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const s3 = new aws.S3();

// Filter function
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Invalid mime type, only JPEG and PNG'), false);
    }
};

// Upload function
const upload = multer({
    fileFilter: fileFilter,
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        acl: 'public-read',
        metadata: function(req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function(req, file, cb) {
            cb(null, Date.now().toString()+Math.floor(Math.random() * 100)+file.originalname); // this sets the name of the image once it's uploaded, make sure it is unique
        }
    })
});

const deleteImage = async (name) => {
    // only keeps the filename + extension from name (which is an url)
    const key = name.split('/').pop(); 

    const params = {
        Key: key,
        Bucket: process.env.AWS_BUCKET_NAME,
    }

    await s3.deleteObject(params, function(err, data) {
        if (err) console.log(err, err.stack);
        else console.log(key+" deleted");
    }).promise();
};


module.exports = {
    upload,
    delete: deleteImage
}; */



const express = require('express');
const aws = require('aws-sdk');

const ImageService = require('../../services/ImageService');

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const router = express.Router();
const s3 = new aws.S3();

// Get signed key
router.get('/sign-s3', async(req, res) => {
    const S3_BUCKET = process.env.AWS_BUCKET_NAME;
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3Params = {
        Bucket: S3_BUCKET,
        Key: fileName,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if (err) {
            console.log(err);
            return res.end();
        }
        const returnData = {
            signedRequest: data,
            url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
        };
        res.write(JSON.stringify(returnData));
        res.end();
    });
});

// Delete images
router.delete('/', async(req, res) => {

    if (!req.body.names) return res.status(404).send('no names input');
    if (req.body.names.length === 0) return res.status(404).send('names empty');

    const S3_BUCKET = process.env.AWS_BUCKET_NAME;
    const names = req.body.names;
    const promises = [];
    names.forEach(name => {
        ImageService.deleteImage(name);
    });

    return res.send('images deleted');
    
});


module.exports = router;