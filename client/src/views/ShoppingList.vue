<template>
  <div>
    <h1>Shopping List</h1>
    <router-link id="home" :to="'/'">Home Page</router-link>
    <router-link id="add" :to="'/addRecipe'">Add Recipe</router-link>
    <div id="empty-cart" v-if="items.length == 0">Nothing To Buy Here</div>
    <div>
      <ul id="recipe-list" v-if="buyItems">
        <li v-for="item in items" :key="item.id">
          {{ item.quantity }} x {{ item.ingrediant }}
          <button id="delete-item" @click="deleteItem(item.ingrediant)">
            Delete
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { cart } from "@/app.js";
export default {
  name: "show-recipe",
  props: [],
  data: function () {
    return {
      items: [],
    };
  },
  mounted() {
    this.items = cart.getItems();
  },
  computed: {
    buyItems() {
      return this.recipes.length > 0;
    },
    recipes() {
      return this.$store.state.recipes;
    },
  },
  methods: {
    deleteItem(item) {
      cart.remove(item);
      this.$store.commit("SET_CART_COUNT", cart.count());
      window.location.reload();
    },
  },
};
</script>

<style lang="scss">
</style>
