<template>
  <div>
      <h1>Admin Panel</h1>

    <div v-if="loaded_tournois">
        <table>
            <tr>
                <th>Tournois</th>
                <th>Titles</th>
                <th>Authors</th>
                <th>Actions</th>
            </tr>
            <tr v-for="(t, index) in this.tournois"
                :item="t" :index="index" :key="t._id"
            >
                <td>{{ t._id }}</td>
                <td>{{ t.title }}</td>
                <td>{{ t.author }}</td>
                <td>
                    <button @click="deleteTournoi(t._id)">🚮</button>
                </td>
            </tr>
        </table>
    </div>

    <br>

    <div v-if="loaded_users">
        <table>
            <tr>
                <th>User ID</th>
                <th>Username</th>
                <th>Actions</th>
            </tr>
            <tr v-for="(u, index) in this.users"
                :item="u" :index="index" :key="u._id"
            >
                <td>{{ u._id }}</td>
                <td>{{ u.username }}</td>
                <td>
                    <button @click="deleteUser(u._id)">🚮</button>
                </td>
            </tr>
        </table>
    </div>

  </div>
</template>

<script>
import TournoiService from "../services/TournoiService";
import axios from 'axios';

export default {
    name: 'AdminView',
    data() {
        return {
            tournois: [],
            users: [],
            loaded_tournois: false,
            loaded_users: false,
        }
    },
    async created() {
        try {
            this.tournois = await TournoiService.getTournois();
            this.loaded_tournois = true;
        } catch(err) {
            console.log(err);
        }
        try {
            const res = await axios.get('http://localhost:8081/api/users/', {withCredentials: true});
            this.users = res.data;
            this.loaded_users = true;
        } catch(err) {
            console.log(err.response);
        }
    },
    methods: {
        deleteTournoi(id) {
            console.log(id);
            this.tournois = this.tournois.filter((tournoi) => tournoi._id != id);
            TournoiService.deleteTournoi(id);
        },
        deleteUser(id) {
            console.log(id);
            this.users = this.users.filter((user) => user._id != id);
            axios.delete(`http://localhost:8081/api/users/${id}`, {withCredentials: true});
        }
    }
}
</script>

<style scoped>

table {
    width: 60%;
    margin: auto;
    text-align: center;
}
table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
}
th {
    background-color: lightgrey;
}
h1 {
    text-align: center;
}


</style>