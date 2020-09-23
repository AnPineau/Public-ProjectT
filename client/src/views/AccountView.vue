<template>
  <div class="root">

    <div class="informations">
        <h1 class="username">{{ user.username }}</h1>
        <h2 class="email">{{ user.email }}</h2>
        <h3 class="createdat">Member since {{ new Date(user.createdAt).toLocaleString().substr(0,10) }}</h3>
    </div>
    

    <div class="tournois">
        <div class="tournois-title">Tourneys</div>
        <router-link
            class="tournois-list-item"
            :to="`/play/${tournoi._id}`"
            v-for="(tournoi, index) in tournois"
            :item="tournoi"
            :index="index"
            :key="tournoi._id"
        >
                <div class="tournois-list-item-title">{{ tournoi.title }}</div>
                <div class="tournois-list-item-createdat">
                    {{new Date(tournoi.createdAt).toLocaleString().substr(0,10)}}    
                </div>    
        </router-link>
    </div>
    

  </div>
</template>

<script>
import UserService from '../services/UserService';
import TournoiService from '../services/TournoiService';

export default {
    name: 'AccountView',
    data() {
        return {
            user: Object,
            tournois: [],
        };
    },
    async created() {
        if (!this.$store.state.isLogged) return this.$router.push('/');
        try {
            console.log('username store: ' + this.$store.state.username);
            const res = await UserService.getUser(this.$store.state.username);
            this.user = res;
            this.tournois = await TournoiService.getTournoiByUsername(
                this.user.username
            );
        } catch (err) {
            this.$router.push('/');
            console.log(err.response);
        }
    },
};
</script>

<style scoped>

.root {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.informations {
    margin-top: 2rem;
    margin-bottom: 2rem;
    height: 10rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}
.username {
    color: var(--text-important);
}
.email {
    font-weight: normal;
}
.createdat {
    font-weight: normal;
    font-style: italic;
    font-size: 1.1rem;
    opacity: 100%;
}
.tournois {
    max-width: 600px;
    width: 90vw;
    display: flex;
    flex-direction: column;
    margin-bottom: 3rem;
}
.tournois-title {
    font-weight: 500;
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2rem;
}
.tournois-list-item {
    display: flex;
    justify-content: space-between;
}
.tournois-list-item-title {
    text-decoration: underline;
    margin: 0.3rem;
    font-size: 1.2rem;
    /* bellow for text overflow */
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.tournois-list-item-createdat {
    font-style: italic;
}


</style>