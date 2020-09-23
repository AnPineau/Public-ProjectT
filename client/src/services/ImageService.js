import axios from 'axios';

const url = '/api/images/'

class ImageService {

    // Sign-key
    static async getSigned(name, type) {
        return await axios.get(`${url}sign-s3?file-name=${name}&file-type=${type}`);
    }

    // Upload to S3
    static async uploadS3(signedRequest, image) {
        const options = {
            headers: {
                'Content-Type': image.type
            }
        };
        return await axios.put(signedRequest, image, options);

    }

    // Delete array of Images from S3 (help from dailyraccoon > worker.js)
    static async deleteS3(names) {
        return await axios.delete(url, names);
    }

}


export default ImageService;

