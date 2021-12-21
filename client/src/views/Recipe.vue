<template>
  <div class="hello">
    <div v-if="recipe">
      <h1>{{ recipe.title }}</h1>
      <h2>Ingrediants</h2>
      <ul id="ingrediant-list">
        <li v-for="ingrediant in splitIngrediants" :key="ingrediant">
          {{ ingrediant }}
        </li>
      </ul>
      <h2 id="instructions-title">Instructions</h2>
      <ul id="instruction-list">
        <li v-for="instruction in splitInstructions" :key="instruction">
          {{ instruction }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "",
  props: ["id"],
  computed: {
    recipe() {
      return this.$store.getters.getRecipeById(this.id);
    },
    splitIngrediants() {
      // take the ingrediants and split them after every comma to create an unordered list
      return this.recipe.ingrediants.split(",");
    },
    splitInstructions() {
      // take the instructions and split them after every comma to create a list
      return this.recipe.instructions.split(",");
    },
  },
};
</script>
