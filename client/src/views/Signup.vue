<template>
  <div id="register-page">
    <router-link id="home" :to="'/'">Home Page</router-link>
    <div id="registerForm">
      <h2 id="register-title">Register</h2>
      <div v-if="error">
        <ul v-for="error in error" :key="error">
          <li>{{ error }}</li>
        </ul>
      </div>
      <div>
        <label
          >Name:
          <input type="text" placeholder="Tina Belcher" v-model="data.name"
        /></label>
      </div>
      <div>
        <label
          >Email:
          <input
            type="text"
            placeholder="tinabelcher@email.com"
            v-model="data.email"
        /></label>
      </div>
      <div>
        <label
          >Password:
          <input
            type="password"
            placeholder="Must be 8 characters"
            v-model="data.password"
        /></label>
      </div>
      <div>
        <label
          >Confirm Password:
          <input
            type="password"
            placeholder="Must be 8 characters"
            v-model="data.confirmPassword"
        /></label>
      </div>

      <button @click="registerUser">Register</button>
      <br />
      <router-link id="login-link" :to="'/login'"
        >Have an Account? Login Now!</router-link
      >
    </div>
  </div>
</template>

<script>
//import { axios } from "@/app.js";
//import Validator from "validatorjs";
export default {
  data() {
    return {
      data: {
        name: "",
        email: "",
        password: "",
      },
      error: null,
      favorites: [],
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    registerUser() {
      this.$store
        .dispatch("register", this.data)
        .then(() => this.$router.push("/"))
        .catch((error) => {
          // error.response can be null
          if (error.response && error.response.status === 400) {
            this.error = error.response.data.error;
          }
        });
    },
  },
};
</script>