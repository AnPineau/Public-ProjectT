import axios from 'axios';

const url = '/api/tournois/';

class TournoiService {

    // Get all Tournois
    static async getTournois() {
        try {
            const res = await axios.get(url);
            const data = res.data;
            /* return data.map(tournoi => ({
                ...tournoi,
                createdAt: new Date(tournoi.createdAt)
            })); */
            return data;
        } catch(err) {
            return err;
        }
    }

    // Get single Tournoi
    static async getTournoi(id) {
        try {
            const res = await axios.get(`${url}${id}`);
            const data = res.data;
            data.createdAt = new Date(data.createdAt);
            return data;
        } catch(err) {
            console.log(err);
        }
    }

    // Get all tournois by username
    static async getTournoiByUsername(username) {
        try {
            const res = await axios.get(`${url.slice(0,-1)}?author=${username}`);
            return res.data;
        } catch(err) {
            console.log(err.response);
        }
    }

    // Create Tournoi
    static insertTournoi(title, size, images) {

        return axios.post(url, {
            title,
            size,
            images
        }, {withCredentials: true});
    }

    static updateTournoi(tournoi) {
        return axios.put(`${url}${tournoi._id}`, {
            totalPlayed: tournoi.totalPlayed,
            participants: tournoi.participants
        });
    }

    static deleteTournoi(id) {
        return axios.delete(`${url}${id}`);
    }
    
    static async likeTournoi(id) {
        try {
            const res = await axios.put(`${url}${id}/like`);
            return res.data;
        } catch(err) {
            console.log(err);
        }
    }


}

export default TournoiService;
