<template>
  <div id="create-page">
    <h1>Add New Recipe</h1>
    <router-link id="home" :to="'/'">Home Page</router-link>
    <div id="confirmation-message" v-if="showConfirmationMessage">
      Successfully Added Recipe
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
        v-model="title"
      />

      <label for="ingrediants"></label>
      <textarea
        id="ingrediants"
        name="ingrediants"
        placeholder="ex: Ingrediant, Ingrediant"
        v-model="ingrediants"
      />

      <label for="instructions"></label>
      <textarea
        id="instructions"
        name="instructions"
        placeholder="ex: 1. Instrcution, 2. Instruction"
        v-model="instructions"
      />

      <button id="added-recipe">Delicious!</button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "",
  data() {
    return {
      errors: null,
      showConfirmationMessage: false,
      title: "",
      ingrediants: "",
      instructions: "",
      imageUrl: "",
    };
  },
  methods: {
    addRecipe() {
      const formData = new FormData(this.$refs.newRecipeForm);
      this.$store.dispatch("newRecipe", formData);
      this.showConfirmationMessage = true;
      //this.recipe = "";
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