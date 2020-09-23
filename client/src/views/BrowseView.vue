<template>
    <div class="root">

      

      {{ error }}

      <div class="items">

        <h1 class="title">{{ message }}</h1>

        <router-link
          :to="`/play/${tournoi._id}`"
          v-for="(tournoi, index) in this.tournois"
          :item="tournoi"
          :index="index"
          :key="tournoi._id"
        >

          <TournoiItem class="item" :props_tournoi="tournoi" />

        </router-link>
    
      </div>

    </div>
</template>



<script>
import TournoiItem from '../components/TournoiItem.vue';
import TournoiService from '../services/TournoiService';

export default {
    name: 'BrowseView',
    components: {
        TournoiItem
    },
    data() {
        return {
            message: 'Most popular Tourneys',
            tournois: [],
            error: '',
            ready: false
        };
    },
    async created() {
        // Axios call to API to get all tournois
        try {
            this.tournois = await TournoiService.getTournois();
        } catch (err) {
            this.error = err.message;
        }
    }
};
</script>

<style lang="scss" scoped>

@import '@/assets/style.scss';

/* Mobile */

.title {
    font-size: 16px;
    letter-spacing: 0.5px;
    margin: 27px 0 10px 0;
    grid-column: 1 / -1; /* ANOTHER OP LINE OF CODE HERE */
}
.items {
    /*  OP CODE HERE  */
    /*  NE PAS PERDRE  */
    display: grid;
    grid-template-columns: repeat(auto-fill, 300px);
    grid-gap: 1rem;
    justify-content: center;
    max-width: 1340px;
    margin: auto;
    .item {
        margin: auto;
        margin-bottom: 18px; 
    }
}

/* Desktop */

@media (min-width: 500px) {
    .items {
        grid-template-columns: repeat(auto-fill, 230px);
    }
}

@media (min-width: 600px) {
    .items {
        padding: 0 30px 0 30px;
    }
}

@media (min-width: 1200px) {
    .title {
        font-size: 20px;
    }
}

/* Really thin devices */

@media (max-width: 300px) {
    .items {
        grid-template-columns: repeat(auto-fill, 200px);
    }
}


</style>