<template>
  <div class="hello">
    <div v-if="recipe">
      <h1>{{ recipe.id }}</h1>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "",
  props: {
    recipe: Object,
  },
  data() {},
};
</script>
