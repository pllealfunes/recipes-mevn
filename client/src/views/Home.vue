<template>
  <div class="hello">
    <h1>Recipes</h1>
    <router-link :to="'/addRecipe'">
      <button>Add Recipe</button>
    </router-link>
    <ul v-for="recipe in recipes" :key="recipe._id">
      <router-link
        :to="{ name: 'Recipe', params: { id: recipe._id } }"
        :recipe="recipe"
        ><li>{{ recipe.title }}</li></router-link
      >
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Home",
  data() {
    return {};
  },
  computed: {
    recipes() {
      return this.$store.state.recipes;
    },
  },
};
</script>
