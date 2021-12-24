<template>
  <div id="register-page">
    <router-link id="home" :to="'/'">Home Page</router-link>
    <div id="registerForm">
      <h2 id="register-title">Register</h2>
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

      <button @click="registerUser">Register</button>
      <br />
      <router-link id="login-link" :to="'/login'"
        >Have an Account? Login Now!</router-link
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
        name: null,
        email: null,
        password: null,
      },
      errors: null,
      favorites: [],
    };
  },
  computed: {
    /*user() {
      return this.$store.state.user;
    },*/
  },
  methods: {
    /*validate() {
      let validator = new Validator(this.data, {
        name: "required",
        email: "required",
        password: "required",
      });
      this.errors = validator.errors.all();
      return validator.passes();
    },*/
    registerUser() {
      axios.post("/signUp", this.data).then((response) => {
        if (response.data.success) {
          this.$store.commit("setUser", response.data.user);
          this.$router.push("/account");
        } else {
          this.errors = response.data.errors;
        }
      });
    },
  },
};
</script>