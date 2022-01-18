<template>
  <header>
    <nav id="nav">
      <div id="title-container">
        <div id="site-title">Recipes</div>
      </div>
      <div id="links-container">
        <router-link :to="'/addRecipe'">
          <button id="addRecipeBtn">Add Recipe</button>
        </router-link>
        <shopping-list-count></shopping-list-count>
      </div>
    </nav>
    <router-view></router-view>
  </header>
</template>

<script>
import ShoppingListCount from "@/components/ShoppingListCount.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    "shopping-list-count": ShoppingListCount,
  },
  data() {
    return {};
  },
  computed: {
    recipes() {
      return this.$store.dispatch("getRecipes");
    },
  },
  mounted() {
    this.$store.dispatch("getRecipes");
  },
  methods: {
    logout() {
      axios.post("/").then((response) => {
        if (response.data.success) {
          this.$store.commit("setUser", null);
        }
      });
    },
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

[v-cloak] {
  display: none;
}

div {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

header {
  width: 100%;
}

#nav {
  border: 1px orange solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  #links-container {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    #addRecipeBtn {
      border: none;
      border-radius: 0.5rem;
      padding: 0.4rem;
      font-size: 1rem;
      font-weight: bold;
      background-color: #ffab91;
    }
  }
}
</style>
