<template>
  <div class="hello">
    <h1>Recipes</h1>
    <ul v-for="(recipe, index) in recipesList" :key="index">
      <router-link :recipe="recipe"
        ><li>{{ recipe }}</li></router-link
      >
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Home",
  data() {
    return {
      recipes: [],
    };
  },
  computed: {
    recipesList() {
      return this.$store.state.recipes;
    },
  },
};
</script>
