<template>
  <div class="root">

    <router-link to="/"><h1 class="logo">Nom du site</h1></router-link>

    <h2 class="title">Login to Nomdusite</h2>

    <form @submit.prevent novalidate="true">

      <p class="error" v-if="errorMessage" >{{ errorMessage }}</p>

      <div class="input">
          <label for="email">Email adress</label>
          <input class="input-text" v-model="email" type="email" name="email" id="email" autocomplete="email" v-focus />
      </div>

      <div class="input">
          <label for="password">Password</label>
          <input
              class="input-text" v-model="password" type="password" name="password" id="password" autocomplete="password" 
          />
      </div>
      
      <button @click="login" class="button-primary button_login">Log in</button>

    </form>

    <h3 class="text">Don't have an account ?</h3>

    <router-link to="register">
      <button class="button-secondary button_register">Create Account</button>
    </router-link>

    <!-- <div class="google-oauth" @click="loginGoogle"> Login with google </div> -->
    <a class="google-oauth" href="http://localhost:8081/api/auth/google/login"> Login with google </a>

  </div>
</template>

<script>
import AuthService from "../services/AuthService";
import axios from 'axios';

export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: ""
    };
  },
  methods: {
    async login() {
      try {

        if (!this.email) return this.errorMessage = 'Email required';
        if (!this.password) return this.errorMessage = 'Password required';

        this.errorMessage = ""; // reset the error message so that the user understands his newest request has been sent
        await AuthService.login(this.email, this.password);
        AuthService.logged();
        this.$router.push("/").catch(err => console.log(err));
      } catch (err) {
        this.errorMessage = "Invalid username or password";
      }
    },
    async loginGoogle() {
      try {
        const user = await axios.get('http://localhost:8081/api/auth/google/login', 
        {
          /* withCredentials: true, */
          /* headers: {
            'Access-Control-Allow-Origin': false,
            'Content-Type': 'application/json'
          } */
        });
        console.log(user);

      } catch(err) {
        console.log(err)
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
  font-size: 1.3rem;
  padding: 1.5rem;
  margin-bottom: 0.5rem;
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
    margin-left: 1.5rem;
    margin-bottom: 0.4rem;
    font-weight: 500;
}
.input input {
  margin:auto;
}
.button_login {
  margin: 2rem;
  margin-top: 3rem;
}
.text {
  margin-top: 4rem;
  margin-bottom: 1rem;
  font-weight: normal;
}
.button_register {
  width: 25rem;
  margin-bottom: 5rem;
}
</style>