import { createStore } from "vuex";
let apiUrl = 'http://localhost:3000/api/recipes/';
import axios from 'axios'

export default createStore({
  state() {
    return {
      recipes: []
    }
  },
  mutations: {
    SET_RECIPES(state, payload) {
      state.recipes = payload
    }
  },
  actions: {
    getRecipes({ commit }) {
      /*fetch(apiUrl, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((res) => res.json())
        .then((data) => (commit("SET_RECIPES", data)))
        .catch((err) => console.log(err.message));*/
      axios.get(apiUrl)
        .then(response => response.data)
        .then(recipes => {
          commit('SET_RECIPES', recipes)
        }).catch(error => {
          console.log(error);
        })

    },
    newRecipe(context, recipe) {
      /*fetch(apiUrl + "newRecipe", {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "title": recipe.title,
          "ingrediants": recipe.ingrediants,
          "instructions": recipe.instructions
        })
      })*/
      axios.post(apiUrl + "newRecipe", {
        "title": recipe.title,
        "ingrediants": recipe.ingrediants,
        "instructions": recipe.instructions
      })
        .catch((err) => console.log(err.message));

    },
    editRecipe(context, recipe) {
      /*fetch(apiUrl + "updateRecipe/" + recipe._id, {
        method: 'PUT',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe)
      })*/
      axios.put(apiUrl + "updateRecipe/" + recipe._id, {
        "title": recipe.title,
        "ingrediants": recipe.ingrediants,
        "instructions": recipe.instructions
      })
        .catch((err) => console.log(err.message));
    },
    deleteRecipe(context, id) {
      /*fetch(apiUrl + id, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      })*/
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
