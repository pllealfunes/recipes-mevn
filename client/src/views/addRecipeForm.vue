<template>
  <div id="create-page">
    <h1>Add New Recipe</h1>
    <router-link id="home" :to="'/'">Home Page</router-link>
    <div id="confirmation-message" v-if="showConfirmationMessage">
      Successfully Added Recipe
    </div>

    <ul id="create-errors" v-if="errors">
      <li class="error" v-for="(error, index) in errors" :key="index">
        {{ error.toString() }}
      </li>
    </ul>

    <form id="addRecipeForm" encType="multipart/form-data">
      <label for="file"></label>
      <input
        id="imageUrl"
        name="file"
        ref="file"
        type="file"
        @change="selectFile"
      />

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
    </form>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "",
  data() {
    return {
      file: "",
      errors: null,
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
    selectFile() {
      const file = this.$refs.file.files[0];
      this.file = file;
    },
    addRecipe() {
      const formData = new FormData();
      imageUrl = formData.append("file", this.file);
      this.$store.dispatch("newRecipe", this.recipe, imageUrl);
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