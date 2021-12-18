<template>
  <div class="hello">
    <h1>Recipes</h1>
    <ul v-for="recipe in recipes" :key="recipe.id">
      <router-link
        :recipe="recipe"
        v-bind:to="{ name: 'Recipe', params: { id: recipe.id } }"
        ><li>{{ recipe.name }}</li></router-link
      >
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Home",
  //props: ["recipe"],
  data() {
    return {
      recipes: [
        {
          id: 1,
          name: "Soup",
          ingrediants: "Water",
          instructions: "Steps",
        },
        {
          id: 2,
          name: "Rice",
          ingrediants: "Salt",
          instructions: "Add onion",
        },
        {
          id: 3,
          name: "Steak",
          ingrediants: "Garlic salt",
          instructions: "Cook well done.",
        },
      ],
    };
  },
};
</script>
