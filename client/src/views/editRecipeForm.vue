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
    <div v-if="recipe" id="editRecipeForm">
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
      <button data-test="test-edit-button" id="edit-recipe" @click="editRecipe">
        Edit Recipe
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data: function () {
    return {
      title: null,
      ingrediants: null,
      instructions: null,
      showConfirmationMessage: false,
    };
  },
  methods: {
    editRecipe() {
      this.$store.dispatch("editRecipe", this.recipe);
      this.showConfirmationMessage = true;
      setTimeout(() => (this.showConfirmationMessage = false), 2000);
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
</style>