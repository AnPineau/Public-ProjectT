import axios from 'axios';

const url = '/api/users/';

class UserService {

    static async getUser(username) {
        try {
            const res = await axios.get( url + username, { withCredentials: true });
            console.log('getuser');
            console.log(res.data);
            return res.data;
        } catch(err) {
            console.log(err);
        }
    }

    static async getUsers() {
        try {
            const res = await axios.get(url, { withCredentials: true });
            return res.data;
        } catch(err) {
            console.log(err);
        }
    }

    static async deleteUser(id) {
        try {
            await axios.delete( url + id, { withCredentials: true });
        } catch(err) {
            console.log(err);
        }
    }

    
}

export default UserService;
