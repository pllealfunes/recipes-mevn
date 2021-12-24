<template>
  <div id="account-page">
    <router-link id="home" :to="'/'">Home Page</router-link>

    <div id="loginForm">
      <h2 id="login-title">Login</h2>
      <div>
        <label
          >Email:
          <input
            type="text"
            data-test="test-email-input"
            v-model="data.email"
            v-on:blur="validate()"
        /></label>
      </div>
      <div>
        <label
          >Password:
          <input
            type="password"
            data-test="test-password-input"
            v-model="data.password"
            v-on:blur="validate()"
        /></label>
      </div>

      <button @click="login" data-test="test-login-button">Login</button>
      <br />
      <router-link id="register-link" :to="'/signUp'"
        >No Account? Signup Now!</router-link
      >
    </div>
  </div>
</template>

<script>
import { axios } from "@/app.js";
//import Validator from "validatorjs";
export default {
  data() {
    return {
      data: {
        email: null,
        password: null,
      },
      errors: null,
    };
  },
  computed: {
    /*user() {
      return this.$store.state.user;
    },*/
    recipes() {
      return this.$store.state.recipes;
    },
  },
  methods: {
    /*validate() {
      let validator = new Validator(this.data, {
        email: "required",
        password: "required",
      });
      this.errors = validator.errors.all();
      return validator.passes();
    },*/
    login() {
      axios.post("login", this.data).then((response) => {
        if (response.data.authenticated) {
          this.$store.commit("setUser", response.data.user);
        } else {
          this.errors = response.data.errors;
        }
      });
    },
    logout() {
      axios.post("logout").then((response) => {
        if (response.data.success) {
          this.$store.commit("setUser", null);
        }
      });
    },
  },
};
</script>