const aws = require('aws-sdk');
if (process.env.NODE_ENV !== 'production') { 
    require('dotenv').config();
}

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const s3 = new aws.S3();

class ImageService {

    static async deleteImage(image) {
        const params = {
            Key: image,
            Bucket: process.env.AWS_BUCKET_NAME
        }
        s3.deleteObject(params, (err, data) => {
            if(err) console.log(err, err.stack);
            return data;
        })
    }

}


module.exports = ImageService;