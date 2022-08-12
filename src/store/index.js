import Vue from "vue";
import Vuex from "vuex";
import user from "./user.js";
import mergeRequests from "./mergeRequests.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    mergeRequests,
    user,
  },
});
