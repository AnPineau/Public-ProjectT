<template>
  <div class="root" v-if="ready">
    
    <div class="informations">
      <div class="title">{{ tournoi.title }}</div>
      <div class="button-primary button_play">PLAY</div>
    </div>

    <StatsComponent class="stats" :props_tournoi="this.tournoi" />
    
  </div>
</template>

<script>
import TournoiService from "../services/TournoiService";
import StatsComponent from "../components/StatsComponent";

export default {
  name: "StatsView",
  components: {
    StatsComponent
  },
  data() {
    return {
      tournoi: Object,
      ready: false
    };
  },
  async created() {
    // TODO: Axios call to API to get specific tournoi
    // call GET to /api/tournois/this.$route.params.id
    try {
      this.tournoi = await TournoiService.getTournoi(this.$route.params.id);
      /* this.tournoi = res.data; */
      this.ready = true;
    } catch (err) {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>

.root {
  display: flex;
  flex-direction: column;
}
.informations {
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
  margin-bottom: 2rem;
  width: 100%;
}
.title {
  font-size: 1.5rem;
  margin-left: 30rem;
}
.button_play {
  width: 10rem;
  height: 3rem;
  margin-right: 30rem;
  line-height: 3rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 4%;
}
.stats {
  width: 70%;
  margin: auto;
}

</style>