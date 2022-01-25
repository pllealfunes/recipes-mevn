<template>
  <div id="create-page">
    <h1>Edit Recipe</h1>
    <router-link id="home" :to="'/'">Home Page</router-link>
    <router-link id="previous" v-if="recipe" :to="'/recipe/' + recipe._id"
      >Back to Recipe</router-link
    >
    <div id="confirmation-message" v-if="showConfirmationMessage">
      Successfully Edited Recipe
    </div>

    {{ recipe }}

    <div id="error-message" v-if="errorMessage">
      There was an issue with the entry please try again.
    </div>

    <div v-if="recipe">
      <div v-if="recipe.imageUrl">
        <img :src="'http://localhost:3000' + recipe.imageUrl" alt="" />
        <button @click="deletePhoto">
          <i class="fas fa-minus-circle delete-photo"></i>
        </button>
      </div>

      <form
        id="editRecipeForm"
        ref="editRecipeForm"
        enctype="multipart/form-data"
        @submit.prevent="editRecipe"
      >
        <label for="imageUrl"></label>
        <input id="imageUrl" name="imageUrl" ref="file" type="file" />

        <label for="title"></label>
        <input
          id="title"
          type="text"
          placeholder="New Recipe"
          v-model="recipe.title"
        />

        <label for="ingrediants"></label>
        <textarea
          id="ingrediants"
          placeholder="ex: Ingrediant, Ingrediant"
          v-model="recipe.ingrediants"
        />

        <label for="instructions"></label>
        <textarea
          id="instructions"
          placeholder="ex: 1. Instrcution, 2. Instruction"
          v-model="recipe.instructions"
        />
        <button id="edit-recipe">Edit Recipe</button>
      </form>
    </div>
  </div>
</template>

<script>
import { axios } from "@/app.js";

export default {
  props: ["id"],
  data() {
    return {
      apiUrl: "http://localhost:3000/api/recipes/",
      title: null,
      ingrediants: null,
      instructions: null,
      imageUrl: null,
      showConfirmationMessage: false,
      errorMessage: false,
    };
  },
  methods: {
    editRecipe() {
      axios
        .put(this.apiUrl + "updateRecipe/" + this.id, this.recipe)
        .then(() => {
          this.errorMessage = false;
          this.$store.dispatch("getRecipes");
          this.showConfirmationMessage = true;
          setTimeout(() => (this.showConfirmationMessage = false), 2000);
        })
        .catch(() => {
          this.errorMessage = true;
        });
    },
    deletePhoto() {
      axios
        .put(this.apiUrl + "deleteImage/" + this.id, this.recipe)
        .then(() => {
          this.errorMessage = false;
          this.showConfirmationMessage = true;
          setTimeout(() => (this.showConfirmationMessage = false), 2000);
          this.$router.push({ path: `'/editRecipe/' + ${this.recipe._id}` });
        })
        .catch(() => {
          this.errorMessage = true;
        });
    },
  },
  computed: {
    recipe() {
      return this.$store.getters.getRecipeById(this.id);
    },
    recipes() {
      return this.$store.state.recipes;
    },
  },
};
</script>

<style scoped lang="scss">
#editRecipeForm {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

img {
  width: 20rem;
  height: 20rem;
}

button {
  border: none;
  background-color: #fff;
  cursor: pointer;
  .delete-photo {
    font-size: 2rem;
  }
}
</style>