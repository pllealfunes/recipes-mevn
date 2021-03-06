import { createStore } from "vuex";
let apiUrl = 'http://localhost:3000/api/recipes/';
import axios from 'axios'

export default createStore({
  state() {
    return {
      cartCount: 0,
      recipes: [],
      token: null,
      user: null,
    }
  },
  mutations: {
    SET_CART_COUNT(state, payload) {
      state.cartCount = payload;
    },
    SET_RECIPES(state, payload) {
      state.recipes = payload
    },
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, token, user) {
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state) {
      state.status = 'error'
    },
    logout(state) {
      state.status = ''
      state.token = ''
    },
  },
  actions: {
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({
          url: 'http://localhost:3000/api/users', data: user, method: 'POST'
        }, {
          "Content-Type": "multipart/form-data",
        })
          .then(resp => {
            const token = resp.data.token
            //const user = resp.data.user
            //localStorage.setItem('token', token)
            // Add the following line:
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', token, user)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            //localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: apiUrl + 'api/auth', data: user, method: 'POST' }, {
          "Content-Type": "multipart/form-data",
        })
          .then(resp => {
            const token = resp.data.token
            //const user = user
            //slocalStorage.setItem('token', stoken)
            // Add the following line:
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', token, user)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            //localStorage.removeItem('token')
            reject(err)
            console.log("here" + err);
          })
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
    getRecipes({ commit }) {
      axios.get(apiUrl)
        .then(response => response.data)
        .then(recipes => {
          commit('SET_RECIPES', recipes)
        }).catch(error => {
          console.log(error);
        })
    },
  },
  getters: {
    getRecipeById(state) {
      return function (id) {
        return state.recipes.find((recipe) => {
          return recipe._id == id;
        }, id[0])
      }
    },
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  },
  modules: {},
});
