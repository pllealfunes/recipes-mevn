import { createStore } from "vuex";
import { axios } from "axios";
let apiURL = 'http://localhost:3000/api/recipes';

export default createStore({
  state: {
    recipes: []
  },
  mutations: {
    SET_RECIPES(state, payload) {
      state.recipes = payload
    }
  },
  actions: {
    getRecipes({ commit }) {
      /*axios.get(apiURL).then((response) =>
        (commit("SET_RECIPES", response.data)))
    }*/
      axios.get(apiURL)
        .then(response => response.data)
        .then(recipes => {
          commit('SET_RECIPES', recipes)
        }).catch(error => {
          console.log(error);
        })
    }

  },
  modules: {},
});
