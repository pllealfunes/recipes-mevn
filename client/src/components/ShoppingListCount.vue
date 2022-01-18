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

<style scoped lang="scss">
#list-count {
  width: 50px;
  height: 50px;
  border-radius: 0.5rem;
  padding: 0.4rem;
  font-size: 1rem;
  font-weight: bold;
  background-color: #ffab91;
  text-decoration: none;
}
</style>
