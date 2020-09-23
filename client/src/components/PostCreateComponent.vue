<template>
  <div class="root">
    <h1 class="title">Success !</h1>

    <div class="thumbnail">
      <img :src="tournoi_min.thumbnail[0]" />
      <img :src="tournoi_min.thumbnail[1]" />
    </div>

    <div class="tournoi-title">{{ tournoi_min.title }}</div>

    <div class="link-title">Link of your tourney</div>

    <div class="link">
      <input class="input-text input" ref="input" type="text" :value="link" />
      <button class="button-primary button" @click="copy">COPY</button>
    </div>

    <div v-if="copied" class="copied">Copied !</div>

    <div class="play-title">See it now</div>

    <button @click="$router.push(`/play/${tournoi_min.id}`)" class="button-primary play">GO</button>
  </div>
</template>

<script>
/* import axios from "axios"; */
export default {
    name: 'PostCreateComponent',
    data() {
        return {
            // Show
            copied: false,
            // Others
            link: '',
            tournoi_min: this.props_tournoi_min,
            // tests
            /* testDone: false */
        };
    },
    props: {
        props_tournoi_min: Object,
    },
    async created() {
        this.link = 'http://localhost:8080/play/' + this.tournoi_min.id;
        // TEMPORAIRLY - TEST PURPOSES
        /* const res = await axios.get(
            "http://localhost:8081/api/tournois/5f1325aebd94eb19647da765"
        );
        const tournoi = res.data;
        this.tournoi_min = {
            id: tournoi._id,
            thumbnail: [
                tournoi.participants[0].image,
                tournoi.participants[1].image
            ],
            title: tournoi.title
        };
        this.testDone = true; */
    },
    methods: {
        copy() {
            const input = this.$refs.input;
            input.select();
            document.execCommand('copy');
            this.copied = true;
        },
    },
};
</script>

<style scoped>
.root {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.title {
    margin-top: 2rem;
}
.thumbnail {
    margin: 3rem;
    margin-bottom: 0;
    width: 30rem;
}
.thumbnail img {
    overflow: hidden;
    object-fit: cover;
    height: 15rem;
    border-radius: 0.3rem;
    max-height: 100%;
    max-width: 48%;
    margin: 1%;
}
.tournoi-title {
    width: 80vw;
    max-width: 700px;
    margin-bottom: 4rem;
    font-weight: bold;
    font-size: 2rem;
    /* display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden; */
    word-wrap: break-word;
}
.link-title {
    font-size: 1.1rem;
}
.link {
    margin: 1rem;
}
.button {
    width: 5rem;
}
.play-title {
    margin: 0.5rem;
    margin-top: 3rem;
    font-size: 1.2rem;
}
.play {
    width: 10rem;
    margin-bottom: 3rem;
    font-size: 1.2rem;
}
</style>