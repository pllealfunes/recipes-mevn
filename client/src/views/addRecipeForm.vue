<template>
  <div id="create-page">
    <h1>Add New Recipe</h1>
    <router-link id="home" :to="'/'">Home Page</router-link>
    <div id="confirmation-message" v-if="showConfirmationMessage">
      Successfully Added Recipe
    </div>

    <div id="error-message" v-if="errorMessage">
      There was an issue with the entry please try again.
    </div>

    <form
      id="addRecipeForm"
      ref="newRecipeForm"
      enctype="multipart/form-data"
      @submit.prevent="addRecipe"
    >
      <label for="imageUrl"></label>
      <input id="imageUrl" name="imageUrl" ref="file" type="file" />

      <label for="title"></label>
      <input
        id="title"
        name="title"
        type="text"
        placeholder="Recipe Title"
        v-model="recipe.title"
      />

      <label for="ingrediants"></label>
      <textarea
        id="ingrediants"
        name="ingrediants"
        placeholder="ex: Ingrediant, Ingrediant"
        v-model="recipe.ingrediants"
      />

      <label for="instructions"></label>
      <textarea
        id="instructions"
        name="instructions"
        placeholder="ex: 1. Instrcution, 2. Instruction"
        v-model="recipe.instructions"
      />

      <button id="added-recipe">Delicious!</button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import { axios } from "@/app.js";

export default {
  data() {
    return {
      apiUrl: "http://localhost:3000/api/recipes/",
      errorMessage: false,
      errors: [],
      showConfirmationMessage: false,
      recipe: {
        title: "",
        ingrediants: "",
        instructions: "",
        imageUrl: "",
      },
    };
  },
  methods: {
    addRecipe() {
      const formData = new FormData(this.$refs.newRecipeForm);
      axios
        .post(this.apiUrl + "newRecipe", formData, {
          "Content-Type": "multipart/form-data",
        })
        .then(() => {
          this.errorMessage = false;
          this.$store.dispatch("getRecipes");
          this.showConfirmationMessage = true;
          this.recipe = "";
          this.$refs.file.value = null;
          setTimeout(() => (this.showConfirmationMessage = false), 2000);
        })
        .catch(() => {
          this.errorMessage = true;
        });
    },
  },
};
</script>

<style scoped lang="scss">
#addRecipeForm {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>