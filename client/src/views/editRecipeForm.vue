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

    <div id="error-message" v-if="errorMessage">
      There was an issue with the entry please try again.
    </div>
    {{ recipe }}
    <div v-if="recipe">
      <div v-if="recipe.imageUrl">
        <img :src="'http://localhost:3000' + recipe.imageUrl" alt="" />
        <button @click="deletePhoto">
          <i class="fas fa-minus-circle delete-photo"></i>
        </button>
      </div>

      <div v-else>
        <button @click="addPhotoForm">
          <i class="fas fa-plus-circle add-photo"></i>
        </button>
      </div>

      <div v-if="photoForm">
        <form
          id="newPhotoForm"
          ref="newPhoto"
          enctype="multipart/form-data"
          @submit.prevent="addNewPhoto"
        >
          <label for="imageUrl"></label>
          <input id="imageUrl" name="imageUrl" ref="file" type="file" />
          <button id="add-photo">Add Photo</button>
        </form>
      </div>

      <form id="editRecipeForm" @submit.prevent="editRecipe">
        <label for="title"></label>
        <input
          id="title"
          type="text"
          placeholder="Title"
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
      showConfirmationMessage: false,
      errorMessage: false,
      photoForm: false,
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
        .put(this.apiUrl + "removeImage/" + this.id, this.recipe)
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
    addPhotoForm() {
      this.photoForm = true;
    },
    addNewPhoto() {
      const formData = new FormData(this.$refs.newPhoto);
      axios
        .put(this.apiUrl + "updatePhoto/" + this.id, formData, {
          "Content-Type": "multipart/form-data",
        })
        .then(() => {
          this.errorMessage = false;
          this.$store.dispatch("getRecipes");
          this.showConfirmationMessage = true;
          this.photoForm = false;
          setTimeout(() => (this.showConfirmationMessage = false), 2000);
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
  .delete-photo,
  .add-photo {
    font-size: 2rem;
  }
}
</style>