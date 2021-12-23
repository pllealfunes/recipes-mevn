<template>
  <div class="hello">
    <div v-if="recipe">
      <h1>{{ recipe.title }}</h1>
      <router-link :to="'/editRecipe/' + recipe._id">
        <button>Edit Recipe</button>
      </router-link>
      <div>
        <button id="add-favorite" v-if="isFavorite" @click="deleteFavorite()">
          Remove from Favorites
        </button>
        <button id="remove-favorite" v-else @click="addFavorite()">
          Add to Favorites
        </button>
      </div>
      <h2>Ingrediants</h2>
      <ul id="ingrediant-list">
        <li v-for="ingrediant in splitIngrediants" :key="ingrediant">
          {{ ingrediant }}
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
  </div>
</template>

<script>
// @ is an alias to /src

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
