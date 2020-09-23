<template>
    <div class="root">
        <h1 class="title">Create tourney</h1>

        <div class="input-title">
            <label for="title">Tourney title :</label>
            <input class="input-text" v-model="titleInput" placeholder="Titre" name="title" maxlength="70"/>
        </div>

        <div class="input-size">
            <label class="name">Tourney size :</label>
            <div class="sizes">
                <input type="radio" id="eight" value="8" v-model="sizeInput" />
                <label for="eight" class="size-button" :class="{ selected: sizeInput == 8}">8</label>
                <input type="radio" id="sixteen" value="16" v-model="sizeInput" />
                <label for="sixteen" class="size-button" :class="{ selected: sizeInput == 16}">16</label>
                <input type="radio" id="thirty-two" value="32" v-model="sizeInput" />
                <label
                    for="thirty-two"
                    class="size-button"
                    :class="{ selected: (sizeInput == 32)}"
                >32</label>
            </div>
        </div>

        <p class="instructions">Number of image uploaded should match the size or your tourney</p>

        <vueDropzone
            ref="myVueDropzone"
            id="dropzone"
            :options="dropzoneOptions"
            :useCustomSlot="true"
        >
            <div class="dropzone-content">
                <h3>📥</h3>
                <p>Choose images or drag them here</p>
            </div>
        </vueDropzone>

        <div class="progress-icons">
            <img src="@/assets/loading.gif" v-if="showTournoiUploading" class="uploading" />
        </div>
        <div class="error"> {{ error }} </div>

        <button class="button-primary submit" @click="posterTournoi">Create</button>
    </div>
</template>

<script>
import TournoiService from "../services/TournoiService";
import ImageService from '../services/ImageService';
import vueDropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";


export default {
    name: "CreateComponent",
    components: {
        vueDropzone
    },
    data() {
        return {
            error: '',
            message: "Ici c'est Create",
            titleInput: "",
            authorInput: "",
            sizeInput: "8",
            backend_url_images: 'http://localhost:8081/api/images/',
            backend_url: 'http://localhost:8081/api/tournois/',
            // show
            showTournoiUploading: false,
            // dropzone
            dropzoneOptions: {
                url: '#',
                thumbnailWidth: 150,
                maxFilesize: 5,
                withCredentials: true,
                uploadMultiple: true,
                paramName: "images",
                autoProcessQueue: false,
                parallelUploads: 1,
                addRemoveLinks: true,
                thumbnailMethod: 'contain',
                acceptedFiles: '.jpg, .jpeg, .png'
            }
        };
    },
    methods: {
        async posterTournoi() {
            // Get images from dropzone
            const images = this.$refs.myVueDropzone.getAcceptedFiles();

            // Safe guards
            /* if (images.length === 0) return this.error = 'No images';
            if (images.length !== this.sizeInput) return this.error = `Only ${images.length} images selected, need ${this.sizeInput}` */

            this.showTournoiUploading = true;

            // Store correctly uploaded images to check if some were not uploaded correctly
            const uploaded_urls = [];
            const promises = [];

            try {

                // I - Upload images to S3 bucket from client
                for (const image of images) {

                    // a - Get signed key from server
                   /*  const url = `${this.backend_url_images}sign-s3?file-name=${image.name}&file-type=${image.type}`;
                    const res_signed = await axios.get(url); */
                    const res_signed = await ImageService.getSigned(image.name, image.type);

                    // b - Upload image to S3 bucket with signed key
                    /* const upload = axios.put(res_signed.data.signedRequest, image, options).then(() => {
                        uploaded_urls.push(res_signed.data.url);
                    }).catch(err => console.log(err.response)); */
                    const upload = await ImageService.uploadS3(res_signed.data.signedRequest, image).then(() => {
                        uploaded_urls.push(res_signed.data.url);
                    }).catch(err => console.log(err.response));

                    promises.push(upload);
                }
                await Promise.all(promises);

                // TODO BELLOW
                // Or IF error array is not empty and
                // push errors in catch after then in for loop
                /* if (uploaded_urls.length != images.length)
                    return ImageService.deleteImages(uploaded_urls); */
                if (uploaded_urls.length !== images.length) {
                    this.error = 'Error during image upload';
                    return await ImageService.deleteS3(uploaded_urls);
                }

                const res_upload = await TournoiService.insertTournoi(
                    this.titleInput,
                    this.sizeInput,
                    uploaded_urls
                );
                const tournoi = res_upload.data;
                const tournoi_min = {
                    id: tournoi._id,
                    thumbnail: [
                        tournoi.participants[0].image,
                        tournoi.participants[1].image
                    ],
                    title: tournoi.title
                };
                this.$emit("done", tournoi_min);

            } catch(err) {
                console.log(err);
            }
        }
    }
};
</script>

<style scoped>
.root {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.1rem;
    width: 100vw;
}
.title {
    margin-top: 4rem;
    margin-bottom: 4rem;
    font-weight: normal;
}
.input-title,
.input-author,
.input-size {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 30%;
    margin-bottom: 1rem;
}
.input-title label,
.input-author label {
    line-height: 2.5rem;
    /* margin-left: 5rem; */
}
.input-size {
    --input-size-height: 3rem;
    height: var(--input-size-height);
}
.input-size .name {
    line-height: var(--input-size-height);
    /* margin-left: 5rem; */
}
.input-size .sizes {
    width: 25rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
.input-size .sizes input {
    display: none;
}
.size-button {
    background-color: var(--input-background);
    border-radius: 0.7rem;
    cursor: pointer;
    width: 15%;
    text-align: center;
    line-height: var(--input-size-height);
}
.selected {
    background-color: var(--text-important);
    color: var(--text-normal-opposite);
}

.instructions {
    margin-top: 4rem;
}
#dropzone {
    border: 4px dashed var(--text-important);
    background-color: var(--input-background);
    margin-top: 1rem;
    width: 50%;
}
.uploading {
    height: 4rem;
    margin-top: 2rem;
}
.error {
    margin-top: 2rem;
    color: red;
}
.submit {
    width: 8rem;
    font-weight: bold;
    letter-spacing: 0.05rem;
    text-transform: uppercase;
    margin-top: 2rem;
    margin-bottom: 4rem;
}
</style>