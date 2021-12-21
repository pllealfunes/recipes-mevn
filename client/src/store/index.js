import { createStore } from "vuex";
let apiUrl = 'http://localhost:3000/api/recipes';

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
      fetch(apiUrl, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((res) => res.json())
        .then((data) => (commit("SET_RECIPES", data)))
        .catch((err) => console.log(err.message));
    }

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
