<template>
  <div id="list-container">
    <router-link id="list-count" :to="'/shoppingList'" data-test="cart-count"
      >Shop {{ cartCount }} Items</router-link
    >
  </div>
</template>

<script>
import { cart } from "@/app.js";
export default {
  name: "",
  props: [],
  components: {},
  data: function () {
    return {
      items: [],
    };
  },
  mounted() {
    this.$store.dispatch("getRecipes");
    this.$store.commit("SET_CART_COUNT", cart.count());
  },
  computed: {
    recipes() {
      return this.$store.state.recipes;
    },
    cartCount() {
      return this.$store.state.cartCount;
    },
  },
};
</script>
© 2021 GitHub, Inc.
Terms
