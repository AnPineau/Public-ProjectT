<template>
  <div class="root">

    <table class="table">
      <tr>
        <th class="column-title"></th>
        <th class="column-title">Win</th>
        <th class="column-title">Final</th>
        <th class="column-title">Semi</th>
        <th class="column-title">Quarter</th>
      </tr>
      <tr v-for="(p, index) in this.tournoi.participants" :item="p" :index="index" :key="p._id">
        <td class="cell">
          <img class="image" :src="p.image" />
        </td>
        <td class="cell">{{((p.stats.winCount/(tournoi.totalPlayed))*100).toFixed(1)}}% ({{p.stats.winCount}}/{{tournoi.totalPlayed}})</td>
        <td class="cell">{{((p.stats.finalCount/(tournoi.totalPlayed))*100).toFixed(1)}}% ({{p.stats.finalCount}}/{{tournoi.totalPlayed}})</td>
        <td class="cell">{{((p.stats.semiCount/(tournoi.totalPlayed))*100).toFixed(1)}}% ({{p.stats.semiCount}}/{{tournoi.totalPlayed}})</td>
        <td class="cell">{{((p.stats.quarterCount/(tournoi.totalPlayed))*100).toFixed(1)}}% ({{p.stats.quarterCount}}/{{tournoi.totalPlayed}})</td>
      </tr>
    </table>
  
  </div>
</template>

<script>
export default {
  name: "StatsComponent",
  data() {
    return {
      tournoi: this.props_tournoi
    };
  },
  props: {
    props_tournoi: Object
  },
  methods: {
    getReste(participant) {
      let s = participant.stats;
      return (
        this.tournoi.totalPlayed -
        s.winCount -
        s.finalCount -
        s.semiCount -
        s.quarterCount
      );
    }
  }
};
</script>

<style scoped>

.table {
  width: 100%;
}
.column-title {
  height: 5rem;
  color: var(--text-important);
  text-transform: uppercase;
  font-size: 1.3rem;
}
.cell {
  width: 20%;
  text-align: center;
  /* background-color: pink; */
  font-size: 1.3rem;
}
.image {
  overflow: hidden;
  object-fit: cover;
  height: 12rem;
  border-radius: 0.5rem;
}

/* MEDIA QUERIES */

@media (max-width: 750px) {
  .image {
    height: 5rem;
  }
}

</style>