<template>
  <div id="account-page">
    <router-link id="home" :to="'/'">Home Page</router-link>

    <div id="loginForm">
      <h2 id="login-title">Login</h2>
      <div>
        <label
          >Email: <input type="email" name="email" v-model="data.email"
        /></label>
      </div>
      <div>
        <label
          >Password:
          <input type="password" name="password" v-model="data.password"
        /></label>
      </div>

      <button @click="login">Login</button>
      <br />
      <router-link id="register-link" :to="'/signUp'"
        >No Account? Signup Now!</router-link
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
        email: "",
        password: "",
      },
      errors: null,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
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
      this.$store
        .dispatch("login", this.data)
        .then(() => this.$router.push("/secure"))
        .catch((err) => console.log(err));
    },
  },
};
</script>