<template></template>

<script>
export default {
  data() {
    return {
      recipes: [
        {
          id: 1,
          name: "Soup",
          ingrediants: "Water",
          instructions: "Steps",
        },
        {
          id: 2,
          name: "Rice",
          ingrediants: "Salt",
          instructions: "Add onion",
        },
        {
          id: 3,
          name: "Steak",
          ingrediants: "Garlic salt",
          instructions: "Cook well done.",
        },
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
