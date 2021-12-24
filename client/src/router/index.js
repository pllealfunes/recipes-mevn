import { createRouter, createWebHistory } from "vue-router";

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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
