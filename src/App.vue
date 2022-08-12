<template>
  <div id="app">
    <MergeRequestsList />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import MergeRequestsList from "./components/MergeRequestsList.vue";

export default {
  name: "App",
  components: {
    MergeRequestsList,
  },
  created() {
    this.fetchUser();
  },
  methods: {
    ...mapActions("user", ["fetchUser"]),
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 2rem;
}
</style>
