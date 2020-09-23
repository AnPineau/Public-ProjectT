import axios from 'axios';
import store from '../store/index';

const url = '/api/auth/';

class AuthService {

    // TODO: change this to async wait for a response if logged out correctly?
    static logout() {
        try {
            return axios.delete(url+'logout');
        } catch(err) {
            console.log(err);
        }
    }


    static async login(email, password) {
        // TODO changer url ici
        return await axios.post(url + 'local/login', {
            email,
            password
        }, { withCredentials: true });
    } 
    

    static async register(email, password, username) {
        return await axios.post(url + 'register', {
            email,
            password,
            username
        }, { withCredentials: true });
    }


    static async logged() {
        try {
            const res = await axios.get(url + 'logged', { withCredentials: true });
            if (res.data === false)
                return store.commit('isLogged', false);  
            // Because I don't wan't an error in console for this
            // since it is going to be false often (false if user not logged in)
            store.commit('isLogged', true);
            store.commit('setUsername', res.data);
        } catch(err) {
            console.log(err);
        }
    }
    
}

export default AuthService;
