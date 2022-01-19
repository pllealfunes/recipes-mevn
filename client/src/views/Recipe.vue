<template>
  <div class="hello">
    <div v-if="recipe">
      <h1>{{ recipe.title }}</h1>
      <router-link :to="'/editRecipe/' + recipe._id">
        <button>Edit Recipe</button>
      </router-link>
      <div v-if="recipe.imageUrl">
        <img v-bind:src="'./' + recipe.imageUrl" alt="" />
      </div>
      <div
        id="confirmation-message"
        data-test="test-add-confirmation"
        v-if="showConfirmationMessage"
      >
        Added Ingrediant to Shopping List
      </div>
      <h2>Ingrediants</h2>
      <ul id="ingrediant-list">
        <li v-for="ingrediant in splitIngrediants" :key="ingrediant">
          {{ ingrediant }}
          <button id="add-shoppinglist" @click="addShoppingList(ingrediant)">
            Buy
          </button>
        </li>
      </ul>
      <h2 id="instructions-title">Instructions</h2>
      <ul id="instruction-list">
        <li v-for="instruction in splitInstructions" :key="instruction">
          {{ instruction }}
        </li>
      </ul>
      <button @click="deleteRecipe()">Delete Recipe</button>
    </div>
    <div v-else>
      <router-link id="home" :to="'/'">Home Page</router-link>
      <router-link :to="'/addRecipe'">Add Recipe</router-link>
      <p id="unknown-recipe">Recipe {{ id }} Not Found.</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { cart } from "@/app.js";

export default {
  name: "",
  props: ["id"],
  data: function () {
    return {
      showConfirmationMessage: false,
      items: [],
      newIngrediant: null,
      isFavorite: false,
    };
  },
  methods: {
    addShoppingList(ingrediant) {
      cart.add(ingrediant, 1);
      this.$store.commit("SET_CART_COUNT", cart.count());
      this.showConfirmationMessage = true;
      setTimeout(() => (this.showConfirmationMessage = false), 2000);
    },
    deleteRecipe() {
      this.$store.dispatch("deleteRecipe", this.id);
      this.$store.dispatch("getRecipes");
      this.$router.push({ path: "/" });
    },
    getFavoriteDeatils() {
      this.$store.dsipatch("getFavoriteDeatils");
    },
    addFavorite() {
      this.$store.dsipatch("addFavorite");
    },
    deleteFavorite() {
      this.$store.dsipatch("deleteFavorite");
    },
  },
  computed: {
    recipe() {
      return this.$store.getters.getRecipeById(this.id);
    },
    splitIngrediants() {
      // take the ingrediants and split them after every comma to create an unordered list
      return this.recipe.ingrediants.split(",");
    },
    splitInstructions() {
      // take the instructions and split them after every comma to create a list
      return this.recipe.instructions.split(",");
    },
  },
};
</script>

<style scoped lang="scss">
</style>
