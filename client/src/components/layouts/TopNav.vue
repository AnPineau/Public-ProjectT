<template>
  <header>
    
    <!-- Desktop -->

    <div v-if="!isMobile" class="desktop-header">
      <div class="left">
        <img @click="$store.commit('toggleMenu')" :src="require('@/assets/svg/menu.svg')" alt="menu"/>
        <router-link to="/"><h1 class="logo">Tourney-maker</h1></router-link>
      </div>
      <div class="search"><SearchBox /></div>
      <div class="right">
        <router-link class="btn-create-link" to="/create"><div class="btn-create">Create Tourney</div></router-link>
        <router-link to="/login"><div class="btn-login">Log In</div></router-link>
      </div>
    </div>

    <!-- Mobile -->

    <!-- 1. TopNav -->
    <div v-if="isMobile" class="mobile-header">
      <div @click="$store.commit('toggleMenu')" class="menu-icon"><img :src="getSvg('menu')" alt="menu"></div>
      <div class="logo"><router-link to="/">Tourney-maker</router-link></div>
      <div class="account"><router-link to="/account"><img :src="getSvg('account')" alt="account"></router-link></div>
    </div>
    

  </header>
</template>

<script>
import SearchBox from '../layouts/SearchBox';
import AuthService from '../../services/AuthService';

export default {
  name: "TopNav",
  components: {
    SearchBox
  },
  data() {
    return {
      isMenuOpened: false
    }
  },
  props: {
    isMobile: Boolean
  },
  methods: {
    toggleMenu() {
      this.isMenuOpened = !this.isMenuOpened
    },
    logout() {
      AuthService.logout();
    },
    getSvg(svg) {
      return require('@/assets/svg/'+svg+'.svg');
    }
  }
};
</script>

<style lang="scss" scoped>

@import '@/assets/style.scss';

/* Desktop */

.desktop-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 55px;
  background-color: $header-background-color;
  border-bottom: solid 1px $dark-grey;
  .left {
    display: flex;
    align-items: center;
    img {
      width: 25px;
      height: 18px;
      margin-left: 23px;
      &:hover {
        cursor: pointer;
      }
    }
    a {
      margin-left: 40px;
      &:hover {
        cursor: pointer;
      }
    }

  }
  .right {
    margin-right: 50px;
    display: flex;
    .btn-create {
      @include btn-primary;   
    }
    .btn-create-link {
      margin-right: 30px;
    }
    .btn-login {
      @include btn-secondary($width: 100px);
    }
  }
}

/* Mobile */

.mobile-header {
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: $header-background-color;
  color: white;
  border-bottom: solid 1px $dark-grey;
  .account {
    width: 26px;
    height: 26px;
  }
}

.logo {
  font-weight: bold;
  font-size: 18px;
}
.menu-icon {
  width: 30px;
  height: 30px;
  color: white;
  img {
    height: 100%;
    width: 100%; 
  }
  &:hover {
    cursor: pointer;
  }
}


</style>