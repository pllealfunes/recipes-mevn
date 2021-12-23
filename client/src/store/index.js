import { createStore } from "vuex";
let apiUrl = 'http://localhost:3000/api/recipes/';
import axios from 'axios'

export default createStore({
  state() {
    return {
      cartCount: 0,
      recipes: []
    }
  },
  mutations: {
    SET_CART_COUNT(state, payload) {
      state.cartCount = payload;
    },
    SET_RECIPES(state, payload) {
      state.recipes = payload
    }
  },
  actions: {
    getRecipes({ commit }) {
      axios.get(apiUrl)
        .then(response => response.data)
        .then(recipes => {
          commit('SET_RECIPES', recipes)
        }).catch(error => {
          console.log(error);
        })

    },
    newRecipe(context, recipe) {
      axios.post(apiUrl + "newRecipe", {
        "title": recipe.title,
        "ingrediants": recipe.ingrediants,
        "instructions": recipe.instructions
      })
        .catch((err) => console.log(err.message));

    },
    editRecipe(context, recipe) {
      axios.put(apiUrl + "updateRecipe/" + recipe._id, {
        "title": recipe.title,
        "ingrediants": recipe.ingrediants,
        "instructions": recipe.instructions
      })
        .catch((err) => console.log(err.message));
    },
    deleteRecipe(context, id) {
      axios.delete(apiUrl + id)
        .catch((err) => console.log(err.message));
    },
  },
  getters: {
    getRecipeById(state) {
      return function (id) {
        return state.recipes.find((recipe) => {
          return recipe._id == id;
        }, id[0])
      }
    }
  },
  modules: {},
});
