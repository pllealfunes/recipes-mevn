<template>
  <div id="create-page">
    <h1>Add New Recipe</h1>
    <router-link data-test="test-home-link" id="home" :to="'/'"
      >Home Page</router-link
    >
    <div id="confirmation-message" v-if="showConfirmationMessage">
      Successfully Added Recipe
    </div>

    <div id="addRecipeForm">
      <label for="title"></label>
      <input
        id="title"
        type="text"
        placeholder="Recipe Title"
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

      <button id="added-recipe" @click="addRecipe">Delicious!</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "",
  data() {
    return {
      showConfirmationMessage: false,
      recipe: {
        title: "",
        ingrediants: "",
        instructions: "",
      },
    };
  },
  methods: {
    addRecipe() {
      this.$store.dispatch("newRecipe", this.recipe);
      this.showConfirmationMessage = true;
      this.recipe = "";
      setTimeout(() => (this.showConfirmationMessage = false), 2000);
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