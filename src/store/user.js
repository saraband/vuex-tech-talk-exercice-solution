import axios from "axios";

export default {
  namespaced: true,
  state: {
    me: null,
  },
  mutations: {
    setUser(state, user) {
      state.me = user;
    },
  },
  getters: {},
  actions: {
    async fetchUser({ commit }) {
      const { data } = await axios.get(
        "https://vuex-tech-talk-api.herokuapp.com/me"
      );
      commit("setUser", data);
    },
  },
};
