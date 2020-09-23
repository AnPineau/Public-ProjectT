<template>
    <!-- <div class="pre-root"> -->
        <div class="root">
        
        <div class="images">
            <img :src="tournoi.participants[0].image" />
            <img :src="tournoi.participants[1].image" />
        </div>

        <div class="right">
            <div class="infos">
            <h2 class="title">{{ tournoi.title }}</h2>
            <h3 class="author">{{ tournoi.author }}</h3>
            <div class="numbers">
                <p class="likes">⭐ {{ tournoi.likes }}</p>
                <p class="played">▶ {{ tournoi.totalPlayed }}</p>
            </div>
            <!-- <div class="description"> {{ tournoi.description }} </div> -->
            <div class="description">is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</div>
            </div>

            <div class="buttons">
                <button class="btn-play" @click="$emit('next', false)">Play</button>
                <button class="btn-stats" @click="toStats()">Stats</button>
            </div>
        </div>
        
        

        </div>
    <!-- </div> -->
</template>

<script>
import router from "../router/index";

export default {
    name: "PrePlayComponent",
    data() {
        return {
            tournoi: this.props_tournoi
        };
    },
    props: {
        props_tournoi: Object
    },
    methods: {
        toStats() {
            router.push({
                name: "StatsView",
                params: {
                    id: this.tournoi._id,
                    props_tournoi: this.tournoi
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>

@import '@/assets/style.scss';

.root {
    width: 80vw;
    margin: auto;
    .images {
        display: flex;
        width: 100%;
        height: 150px;
        margin-top: 30px;
        img {
            overflow: hidden;
            object-fit: cover;
            /* height: 150px; */
        }
    }
    .infos {
        .title {
            font-size: 18px;
            letter-spacing: 0.5px;
            margin-top: 15px;
            overflow: hidden;
            text-overflow: ellipsis;
            /* white-space: pre; */
            word-wrap: break-word;
        }
        .author {
            color: #909090;
            font-size: 14px;
            letter-spacing: 0.5px;
            margin-top: 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .numbers {
            display: flex;
            margin-top: 10px;
            font-size: 16px;
            letter-spacing: 0.5px;
            font-weight: bold;
            .played {
                margin-left: 30px;
            }
        }
        .description {
            margin-top: 15px;
            font-size: 14px;
        }
    }
    .buttons {
        margin-top: 30px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .btn-play {
            @include btn-primary($height: 40px, $width: 112px);
            border-radius: 15px;
        }
        .btn-stats {
            @include btn-secondary($height: 40px, $width: 112px, $color: #181818);
            border-radius: 15px;
        }
    }
}

/* Desktop */

@media (min-width: 500px) {
    .root {
        .images {
            height: 200px;
        }
    } 
}

@media (min-width: 700px) {
    /* .pre-root {
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    } */
    .root {
        height: calc(100vh - 100px - 55px);
        display: flex;
        align-items: center;
        max-width: 1000px;
        .images {
            height: 70%;
            max-height: 400px;
            width: 45%;
            img {
                margin: 5px;
            }
        }
        .right {
            width: 50%;
            display: flex;
            flex-direction: column;
            margin: auto;
            margin-left: 30px;
            .infos {
                .title {
                    font-size: 26px;
                }
                .author, .numbers {
                    font-size: 18px;
                }
                .description {
                    font-size: 16px;
                }
            }
            .btn-play, .btn-stats {
                width: 150px;
                height: 50px;
                font-size: 22px;
                letter-spacing: 0.5px;
            }
        }
    }
}


</style>