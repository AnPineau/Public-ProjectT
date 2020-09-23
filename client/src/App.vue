<template>
<div>

  <div class="app-root"
    v-if="this.$store.state.isLogged !== null" id="app">

      <TopNav :isMobile="this.isMobile" class="navbar" v-if="showHeader" />

      <div class="main">

        <Menu v-if="showHeader" :isMobile="this.isMobile" class="app-menu" />

        <main class="view" :class="{ header_visible: showHeader, header_hidden: !showHeader, 'big-offset':($store.state.isMenuOpened && !isMobileBigger), 'small-offset': (!$store.state.isMenuOpened && !isMobile) || (isMobileBigger && !isMobile)}">
          <router-view />
        </main>

      </div>

      <BottomNav v-if="isMobile" class="bottomnav" />

  </div>

  <div v-else>
    <p>Can't reach servers... 😢</p>
  </div>

</div>
</template>

<script>
// Layouts
import TopNav from './components/layouts/TopNav';
import Menu from './components/layouts/Menu';
import BottomNav from './components/layouts/BottomNav';
import AuthService from './services/AuthService';

export default {
  name: "App",
  components: {
    TopNav,
    Menu,
    BottomNav
  },
  data() {
    return {
      isMobile: false,
      isMobileBigger: false,
    }
  },
  computed: {
    showHeader() {
      if (this.$route.path === "/login" 
        || this.$route.path === "/register") 
          return false;
      return true;
    }
  },
  created() {
    AuthService.logged();
    this.handleView();
    window.addEventListener('resize', this.handleView);
    const width = window.innerWidth;
    if (width < 1300) this.$store.state.isMenuOpened = false;
    else this.$store.state.isMenuOpened = true;
  },
  methods: {
    handleView() {
      this.isMobile = window.innerWidth < 900;
      this.isMobileBigger = window.innerWidth < 1100;
    }
  },
}
</script>

<style lang="scss">

@import '@/assets/style.scss';

body {
  overflow-x: hidden;
}

.main {
  display: flex;
}

.app-root {
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  background-color: $main-background-color;
  color: white;
}
.navbar {
  position: fixed;
  width: 100%;
}
.app-menu {
  position: fixed;
  top: 55px;
  z-index: 10;
  overflow-y: auto;
}
.view {
  margin-top: 55px;
  width: 100%;
  /* height: 100%; */
  /* height: calc(100vh - var(--header-height)); */
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 75px;
}
.header_visible {
  /* height: calc(100vh - var(--header-height)); */
}
.header_hidden {
 /*  height: 100vh; */
}

.big-offset {
  margin-left: 240px;
  overflow-x: hidden;
}
.small-offset {
  margin-left: 70px;
}




</style>
