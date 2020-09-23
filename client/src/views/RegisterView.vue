<template>
  <div class="root">

    <router-link to="/"><h1 class="logo">Nom du site</h1></router-link>

    <h2 class="title">Create an account</h2>

    <form @submit.prevent novalidate="true">

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

        <div class="input">
            <label for="email">Email address</label>
            <input class="input-text" v-model="email" type="email" name="email" id="email" autocomplete="email" v-focus />
        </div>
        
        
        <div class="input">
            <label for="username">Username</label>
            <input class="input-text" v-model="username" type="text" name="username" id="username" autocomplete="username" maxlength="25"/>
        </div>

        <div class="input">
            <label for="password">Password</label>
            <input class="input-text" v-model="password" type="password" name="password" id="password" autocomplete="password"/>
        </div>

        <h4 class="text_tos">By click on Register, you agree to our <a href="#" class="link">Terms of Service</a></h4>

        <button class="button-primary button_register" @click="register">Register</button>

    </form>

    

    <h3 class="text_login">Already have an account ? <router-link class="link" to='login'>Log In</router-link></h3>

  </div>
</template>

<script>
import AuthService from '../services/AuthService';

export default {
    name: 'RegisterView',
    data() {
        return {
            email: '',
            password: '',
            username: '',
            errorMessage: ''
        }
    },
    methods: {
        async register() {
            try {
                if (!this.email) return this.errorMessage = 'Email required';
                if (!this.username) return this.errorMessage = 'Username required';
                if (!this.password) return this.errorMessage = 'Password required';

                this.errorMessage = '';
                await AuthService.register(this.email, this.password, this.username);
                AuthService.logged();
                this.$router.push('/');
            } catch(err) {
                console.log(err.response);
                this.errorMessage = 'Invalid email or username';
            }
        }
    },
    directives: {
        focus: {
            inserted: function(el) {
                el.focus();
            }
        }
    }
};
</script>

<style scoped>

.root {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.logo {
    color: var(--text-important);
    margin: 5rem;
    font-size: 3rem;
    text-transform: uppercase;
}
.title {
    font-weight: bold;
    font-size: 1.3rem;
    margin: 2rem;
}
.error {
    color: red;
    margin-bottom: 1rem;
    text-align: center;
}
.input {
    margin: 0.5rem;
    display: flex;
    flex-direction: column;
}
.input label {
    margin-left: 0.3rem;
    margin-bottom: 0.4rem;
    font-weight: 500;
}
.text_tos {
    font-weight: normal;
    margin: 1rem;
    margin-top: 3rem;
}
.text_login {
    font-weight: normal;
    margin-top: 3rem;
}
.link {
    color: var(--text-important);
    font-weight: bold;
}


</style>