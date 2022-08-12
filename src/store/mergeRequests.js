import axios from "axios";
import { uniq, uniqBy } from "lodash";

function normalizeString(string) {
  return string.trim().replace(/\s/g, "").toLowerCase();
}

export default {
  namespaced: true,
  state: {
    filters: {
      search: "",
      author: null,
      branchTo: null,
      mergeState: "all",
      ownMergeRequests: false,
    },
    mergeRequests: [],
    isFetchingMergeRequests: false,
  },
  mutations: {
    setIsFetchingMergeRequests(state, isFetchingMergeRequests) {
      state.isFetchingMergeRequests = isFetchingMergeRequests;
    },
    setMergeRequests(state, mergeRequests) {
      state.mergeRequests = mergeRequests;
    },
    setFilters(state, filters) {
      state.filters = {
        ...state.filters,
        ...filters,
      };
    },
  },
  getters: {
    uniqueAuthors(state) {
      return uniqBy(
        state.mergeRequests.map((mr) => mr.author),
        (author) => author.id
      );
    },
    uniqueBranchs(state) {
      return uniq(
        state.mergeRequests.reduce((acc, curr) => {
          acc.push(curr.branchTo, curr.branchFrom);
          return acc;
        }, [])
      );
    },
    filteredMergeRequests(state, getters, rootState) {
      return state.mergeRequests.filter((mergeRequest) => {
        if (state.filters.search.trim()) {
          const normalizedSearch = normalizeString(state.filters.search);
          const normalizedMRString = normalizeString(
            mergeRequest.title + mergeRequest.author.name
          );

          if (!normalizedMRString.includes(normalizedSearch)) {
            return false;
          }
        }

        if (state.filters.author) {
          if (mergeRequest.author.id !== state.filters.author) {
            return false;
          }
        }

        if (state.filters.branchTo) {
          if (mergeRequest.branchTo !== state.filters.branchTo) {
            return false;
          }
        }

        if (state.filters.mergeState !== "all") {
          if (
            (state.filters.mergeState === "open" && mergeRequest.closed) ||
            (state.filters.mergeState === "closed" && !mergeRequest.closed)
          ) {
            return false;
          }
        }

        if (state.filters.ownMergeRequests && rootState.user.me) {
          if (mergeRequest.author.id !== rootState.user.me.id) {
            return false;
          }
        }

        return true;
      });
    },
  },
  actions: {
    async fetchMergeRequests({ commit }) {
      commit("setIsFetchingMergeRequests", true);
      const { data } = await axios.get(
        "https://vuex-tech-talk-api.herokuapp.com/merge-requests"
      );
      await new Promise((res) => setTimeout(res, 1000));
      commit("setMergeRequests", data);
      commit("setIsFetchingMergeRequests", false);
    },
  },
};
