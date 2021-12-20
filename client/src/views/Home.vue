<template>
  <div class="hello">
    <h1>Recipes</h1>
    <ul v-for="recipe in recipes" :key="recipe.id">
      <router-link
        :recipe="recipe"
        :to="{ name: 'Recipe', params: { id: recipe.id } }"
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
