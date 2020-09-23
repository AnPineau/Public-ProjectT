<template>
  <div class="root">

    <div class="search link"><router-link to="#"><img :src="getSvg('search')" alt="search"></router-link></div>
    <div class="home link" :class="{ current: isHomeCurrent }"><router-link to="/"><img :src="getSvg('home')" alt="home"></router-link></div>
    <div class="create link" :class="{ current: isCreateCurrent }"><router-link to="/create"><img :src="getSvg('create')" alt="create"></router-link></div>

  </div>
</template>

<script>
export default {
    name: "BottomNav",
    computed: {
      isHomeCurrent: function() { return this.$route.name === 'BrowseView'; },
      isCreateCurrent() { return this.$route.name === 'CreateView'; },
    },
    methods: {
      getSvg(svg) {
        return require('@/assets/svg/'+svg+'.svg');
      }
    }

}
</script>

<style lang="scss" scoped>
@import '@/assets/style.scss';

.root {
  position: fixed;
  bottom: 0;
  height: 55px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around; 
  color: white;
  background-color: $header-background-color;
  border-top: solid 1px $dark-grey;
  * {
    width: 26px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    
  }
}

.current {
  filter: invert(46%) sepia(82%) saturate(1853%) hue-rotate(176deg) brightness(102%) contrast(102%);
}



</style>