<template>
  <div class="root" v-if="this.tournoi">
    <h2 class="title">{{ headerText }}{{ progression }}</h2>

    <div class="images">
      <img :src="participants[currentMatch].image" @click="nextMatch(0)" />
      <img :src="participants[currentMatch+1].image" @click="nextMatch(1)" />
    </div>

  </div>
</template>

<script>
export default {
    name: 'PlayComponent',
    data() {
        return {
            tournoi: this.props_tournoi,
            participants: [],
            nextParticipants: [],
            numPhases: Number,
            currentPhase: Number,
            currentMatch: 0,
            winner: {}
        };
    },
    props: {
        props_tournoi: Object
    },
    created() {
        this.participants = this.shuffle(this.tournoi.participants);
        this.numPhases = this.getPhases();
        this.currentPhase = this.numPhases;
    },
    computed: {
        headerText: function() {
            console.log('oui');
            /* switch (this.currentPhase) {
        case 1: return 'Finals'; break;
        case 2: return 'Semifinals'; break;
        case 3: return 'Quarterfinals'; break;
      } */
            if (this.currentPhase == 1) return 'Finals';
            if (this.currentPhase == 2) return 'Semifinals';
            if (this.currentPhase == 3) return 'Quarterfinals';
            return 'Qualifiers';
        },
        progression() {
            if (this.currentPhase === 1) return '';
            return (
                ' - ' +
                Math.ceil((this.currentMatch + 1) / 2) +
                '/' +
                this.participants.length / 2
            );
        }
    },
    methods: {
        startTournoi() {
            this.PrePlayReady = false;
            this.PlayReady = true;
        },
        finishTournoi(chosenParticipant) {
            this.participants[this.currentMatch + chosenParticipant].stats
                .winCount++;
            this.tournoi.totalPlayed++;
            /* this.updateTournoi(); */
            // temporairily;
            /* this.PlayReady = false;
      this.PostPlayReady = true; */
            this.$emit(
                'next',
                this.tournoi,
                this.participants[chosenParticipant]
            );
            // router.push(finishedPlayView w/ props?);
        },
        nextMatch(chosenParticipant) {
            // chosenParticipant is 0 or 1 (Left pic or right pic)
            this.writeStat(chosenParticipant);
            if (this.currentPhase == 1) this.finishTournoi(chosenParticipant);
            this.nextParticipants.push(
                this.participants[this.currentMatch + chosenParticipant]
            );
            if (this.currentMatch < Object.keys(this.participants).length - 2) {
                this.currentMatch = this.currentMatch + 2;
            } else {
                this.nextPhase();
            }
        },
        nextPhase() {
            this.currentMatch = 0;
            this.participants = [];
            this.participants = [...this.nextParticipants];
            this.nextParticipants = [];
            this.currentPhase--;
        },
        getPhases() {
            let i = this.tournoi.size;
            let phases = 0;
            while (i > 1) {
                i /= 2;
                phases++;
            }
            return phases;
        },
        writeStat(chosenParticipant) {
            // Select the participant that has not been chosen
            let participant = null;
            switch (chosenParticipant) {
                case 0:
                    participant = this.participants[this.currentMatch + 1];
                    break;
                case 1:
                    participant = this.participants[this.currentMatch];
                    break;
            }
            // Change the stat of the selected participant based on the current progress of the tourney
            switch (this.currentPhase) {
                case 1:
                    participant.stats.finalCount++;
                    break;
                case 2:
                    participant.stats.semiCount++;
                    break;
                case 3:
                    participant.stats.quarterCount++;
                    break;
            }
        },
        // API Calls
        /* updateTournoi() {
      TournoiService.updateTournoi(this.tournoi);
    }, */
        // Utilities
        shuffle(obj) {
            /* const a = { ...array }; */
            // Transform obj to an array
            const a = [];
            Object.keys(obj).forEach(key => {
                a.push(obj[key]);
            });
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            console.log(a);
            return a;
        }
    }
};
</script>

<style lang="scss" scoped>

/* Mobile */

.root {
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
        margin: 5px;
        font-size: 16px;
        letter-spacing: 0.5px;
    }
    .images {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        img {
            height: 35vh;
            width: 80vw;
            overflow: hidden;
            object-fit: cover;
            border-radius: 5px;
            margin: 5px;
            &:hover {
                cursor: pointer;
            }
        }
    }
}

/* Desktop */

@media (min-width: 700px) {
    .root {
        height: calc(100vh - 130px);
        .title {
            margin: 25px;
            font-size: 22px;
        }
        .images {
            /* background-color: pink; */
            flex-direction: row;
            align-items: start;
            width: 95vw;
            height: 100%;
            /* margin-top: 3vh; */
            img {
                width: 50%;
                height: auto;
            }
        }
    }
}

@media (min-width: 900px) {
    .root {
        
        /* .title {
            margin-top: 50px;
        } */
        .images {
            width: 90vw;
            max-width: 1200px;
           
        }
    }
}

@media (min-width: 1200px) {
    .root {
        .title {
            margin-top: 50px;
        }
        .images {
            img {
               margin: 30px;
           }
        }
    }
}



</style>