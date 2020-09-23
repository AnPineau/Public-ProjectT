<template>
  <div class="root">
    <div class="postplay">
      <h2 class="title">{{ tournoi.title }}</h2>

      <div class="main">
        <img class="image" :src="this.winner.image" />

        <!-- Mobile -->
        <div v-if="isMobile" class="infos-mobile">
          <img :src="require('@/assets/svg/trophy.svg')" class="trophy" />

          <div class="numbers">
            <div class="likes">⭐ {{ tournoi.likes }}</div>
            <div class="played">▶ 4546512</div>
            <!-- <div class="played">{{ tournoi.played }}</div> -->
          </div>

          <button
            class="btn-like"
            :class="like_css_class"
            @click="likes"
            :disabled="like_disabled"
          >Like</button>

          <button class="btn-stats" @click="displayStats">Stats</button>
        </div>

        <!-- Desktop -->
        <div v-if="!isMobile" class="infos-desktop">
          <div class="winner">
            <img :src="require('@/assets/svg/trophy.svg')" class="trophy" />
            <div class="text">Winner !</div>
          </div>

          <div class="likes">{{ tournoi.likes }} ⭐</div>
          <div class="played">▶ 4546512</div>
          <!-- <div class="played">{{ tournoi.played }}</div> -->

          <button
            class="btn-like"
            :class="like_css_class"
            @click="likes"
            :disabled="like_disabled"
          >Like</button>

          <button class="btn-stats" @click="displayStats">Stats</button>
        </div>
      </div>

      <img :src="require('@/assets/svg/arrow.svg')" @click="displayStats" class="arrow" />
    </div>

    <StatsComponent id="stats" ref="stats" :props_tournoi="this.tournoi" />
  </div>
</template>

<script>
import StatsComponent from '../components/StatsComponent';
import TournoiService from '../services/TournoiService';

export default {
    name: 'PostPlayComponent',
    components: {
        StatsComponent,
    },
    data() {
        return {
            isMobile: false,
            tournoi: this.props_tournoi,
            winner: this.props_winner,
            // like button
            like_disabled: false,
            like_css_class: 'like-enabled',
        };
    },
    props: {
        props_winner: Object,
        props_tournoi: Object,
    },
    created() {
        this.handleView();
        window.addEventListener('resize', this.handleView);
    },
    methods: {
        handleView() {
            this.isMobile = window.innerWidth < 600;
        },
        async likes() {
            this.tournoi = await TournoiService.likeTournoi(this.tournoi._id);
            this.like_disabled = true;
            this.like_css_class = 'like-disabled';
        },
        displayStats() {
            /* const stats = document.getElementById('stats') ; */
            const stats = this.$refs.stats.$el;
            stats.scrollIntoView({ behavior: 'smooth' });
        },
    },
};
</script>

<style lang="scss" scoped>
@import '@/assets/style.scss';

.postplay {
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
        margin: 10px;
        font-size: 16px;
        text-align: center;
    }
    .main {
        display: flex;
        flex-direction: column;
        align-items: center;
        

        .image {
            overflow: hidden;
            object-fit: cover;
            width: 80%;
            border-radius: 10px;
        }
        .infos-mobile {
            margin-top: 10px;
            display: grid;
            grid-template-columns: 120px 120px;
            grid-template-rows: 70px 70px;
            * {
                margin: auto;
            }
            .numbers {
                /* background-color: lightblue; */
                display: flex;
                flex-direction: column;
                margin: 0;
                font-weight: bold;
            }
            .btn-like {
                @include btn-primary($width: 100px, $height: 40px);
                border-radius: 15px;
            }
            .btn-stats {
                @include btn-secondary(
                    $width: 100px,
                    $height: 40px,
                    $color: #181818
                );
                border-radius: 15px;
            }
        }
    }
    .arrow {
        margin-top: 10px;
        cursor: pointer;
    }
}

/* Desktop */

@media (min-width: 600px) {
    .postplay {
        flex-direction: row;
        .title {
            font-size: 22px;
        }
        .infos-desktop {
            display: grid;
            grid-template-columns: 180px 180px;
        }
    }
}
</style>