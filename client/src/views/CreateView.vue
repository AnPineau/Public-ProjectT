<template>
  <div class="root">

      <div v-if="showCreate">
          <Create @done="createDone"/>
      </div>

      <div v-if="showPostCreate">
          <PostCreate :props_tournoi_min="tournoi_min"/>
      </div>


  </div>
</template>

<script>
import Create from '../components/CreateComponent';
import PostCreate from '../components/PostCreateComponent';

export default {
  name: "CreateView",
  components: {
      Create, PostCreate
  },
  data() {
      return {
          // Show
          showCreate: true,
          showPostCreate: false,
          // Others
          tournoi_min: {}
      }
  },
  methods: {
      createDone(tournoi_min) {
          this.tournoi_min = tournoi_min;
          this.showCreate = false;
          this.showPostCreate = true;
      }
  }
};
</script>

<style scoped>

</style>