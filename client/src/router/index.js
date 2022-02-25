import { createRouter, createWebHistory } from "vue-router";
import store from "../store"

const routes = [

  {
    path: "/",
    component: () => import('../views/Home.vue'),
  },
  {
    path: "/recipe/:id",
    name: "Recipe",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/Recipe.vue"),
    props: true,
  },
  {
    path: "/addRecipe",
    name: "AddRecipe",
    component: () => import("../views/AddRecipeForm.vue")
  },
  {
    path: "/editRecipe/:id",
    name: "EdiitRecipe",
    component: () => import("../views/EditRecipeForm.vue"),
    props: true,
  },
  {
    path: "/shoppingList",
    name: "shoppingList",
    component: () => import("../views/ShoppingList.vue"),
    props: true,
  },
  {
    path: "/signUp",
    name: "signUp",
    component: () => import("../views/Signup.vue"),
    props: true,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
    props: true,
  },
  {
    path: "/secure",
    name: "secure",
    component: () => import("../views/Secure.vue"),
    //props: true,
    meta: {
      requiresAuth: true
    }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,

});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})


export default router;
