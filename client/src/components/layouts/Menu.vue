<template>
  <div class="root">
      
    <!-- Menu opened -->
    <div v-if="$store.state.isMenuOpened" class="menu">
      <div class="main">
        <div class="category">
            <img class="first-as-example" :src="require('@/assets/svg/example.svg')" alt="">
            <h4 class="text">Example</h4>
        </div>
        <div class="category">
            <img :src="require('@/assets/svg/example.svg')" alt="">
            <h4 class="text">Example</h4>
        </div>
        <div class="category">
            <img :src="require('@/assets/svg/example.svg')" alt="">
            <h4 class="text">Example</h4>
        </div>
        <div class="category">
            <img :src="require('@/assets/svg/example.svg')" alt="">
            <h4 class="text">Example</h4>
        </div>
      </div>
      <div class="footer">
          <div class="links">
              <h5>About</h5>
              <h5>Contact</h5>
              <h5>Terms</h5>
              <h5>Privacy</h5>
              <h5>Policy & Safety</h5>
          </div>
          <div class="copyright">@ 2020 Galpa inc.</div>
      </div>
    </div>

    <!-- Menu closed -->
    <div v-if="!$store.state.isMenuOpened && !isMobile" class="menu-closed">
        <div class="category-closed"><img class="first-as-example" :src="require('@/assets/svg/example.svg')" alt=""></div>
        <div class="category-closed"><img :src="require('@/assets/svg/example.svg')" alt=""></div>
        <div class="category-closed"><img :src="require('@/assets/svg/example.svg')" alt=""></div>
        <div class="category-closed"><img :src="require('@/assets/svg/example.svg')" alt=""></div>
    </div>

  </div>
</template>

<script>
export default {
    name: 'Menu',
    data() {
        return {
            isOpened: false,
        }
    },
    props: {
        isMobile: Boolean
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/style.scss';

.menu {
    position: relative;
    z-index: 10;
    left: 0;
    width: 240px;
    height: 100vh;
    background-color: $header-background-color;
    display: flex;
    flex-direction: column;
    .main {
        display: flex;
        flex-direction: column;
  /*       height: 680px; */
        margin-top: 10px;
        .category {
            display: flex;
            height: 47px;
            img {
                margin-left: 18px;
                margin-right: 25px;
                height: 30px;
                margin-top: auto;
                margin-bottom: auto;
            }
            h4 { // just to center the text vertically
                display: flex;
                align-items: center;
                font-weight: normal;
                font-size: 16px;
            }
            &:hover {
                background-color: #3a3a3a;
                cursor: pointer;
            }
        }
    }
    .footer {
        position: fixed;
        bottom: 0;
        width: 240px;
        border-top: solid 1px $dark-grey;
        .links {
            margin: 25px;
            color: #9F9F9F;
            font-weight: bold;
            font-size: 16px;
        }
        .copyright {
            color: #9F9F9F;
            opacity: 70%;
            font-weight: bold;
            font-size: 14px;
            margin-left: 25px;
            margin-bottom: 25px;
        }
    }
}


.menu-closed {
    background-color: $header-background-color;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 65px;
    height: 100vh;
    padding-top: 10px;
    .category-closed {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 47px;
        img {
            height: 30px;
            /* margin: 7.5px; */
        }
        &:hover {
            background-color: #3a3a3a;
            cursor: pointer;
        }
    }
}
.first-as-example {
     filter: invert(46%) sepia(82%) saturate(1853%) hue-rotate(176deg) brightness(102%) contrast(102%);
}


</style>