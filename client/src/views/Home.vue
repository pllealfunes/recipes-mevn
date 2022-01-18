<template>
  <div>
    <ul>
      <router-link
        id="recipe-links"
        v-for="recipe in recipes"
        :key="recipe._id"
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

<style scoped lang="scss">
ul {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  li {
    width: 200px;
    height: 150px;
    list-style: none;
    border: 1px orange solid;
    margin: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    flex-grow: 1;
  }
}
</style>