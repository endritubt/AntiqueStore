<template>
  <div>
    <h1>{{ name }}</h1>
    <button @click="onClick">elo</button>

    <input v-model="name">
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: "nema jeff"
      };
    },
    methods: {
      onClick() {
        alert(this.name);
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>