<template>
  <div v-if="loadingReady" class="PlayView">

      <PrePlayComponent 
        v-if="display_PrePlayComponent"
        :props_tournoi="this.tournoi"
        @next="toPlay" 
      />

      <PlayComponent
        v-if="display_PlayComponent"
        :props_tournoi="this.tournoi"
        @next="toPostPlay"
      />  

      <PostPlayComponent 
        v-if="display_PostPlayComponent"
        :props_tournoi="this.tournoi" 
        :props_winner="this.winner"
      />

  </div>
</template>

<script>
import TournoiService from "../services/TournoiService";
import PrePlayComponent from "../components/PrePlayComponent";
import PlayComponent from "../components/PlayComponent";
import PostPlayComponent from "../components/PostPlayComponent";

export default {
  name: "PlayView",
  components: {
    PrePlayComponent,
    PlayComponent,
    PostPlayComponent,
  },
  data() {
    return {
      tournoi: this.props_tournoi,
      loadingReady: false,
      display_PrePlayComponent: true,
      display_PlayComponent: false,
      display_PostPlayComponent: false,
      winner: {}
    };
  },
  async created() {
    // Axios call to API
    // call to /api/tournois/this.$route.params.id
    try {
      console.log('created');
      this.tournoi = await TournoiService.getTournoi(this.$route.params.id);
      /* this.tournoi = res.data; */
      this.loadingReady = true;
      /* console.log(res.data); */
    } catch(err) {
      console.log(err.response);
      this.$router.push('/');
    }
  },
  methods: {
    toPlay() {
      this.display_PrePlayComponent = false;
      this.display_PlayComponent = true;
    },
    toPostPlay(tournoi, winner) {
      this.tournoi = tournoi;
      this.display_PlayComponent = false;
      this.display_PostPlayComponent = true;
      this.winner = winner;
      TournoiService.updateTournoi(this.tournoi);
    }
  }
};

</script>


<style>
</style>