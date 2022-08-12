<template>
  <div class="filters">
    <input
      placeholder="Search"
      :value="filters.search"
      @input="setFilters({ search: $event.target.value })"
    />

    <select
      :value="filters.mergeState"
      @input="setFilters({ mergeState: $event.target.value })"
    >
      <option value="all">All states</option>
      <option value="closed">Closed</option>
      <option value="open">Open</option>
    </select>

    <select
      :value="filters.branchTo"
      @input="setFilters({ branchTo: $event.target.value })"
    >
      <option value="">All branches</option>
      <option v-for="branch in uniqueBranchs" :key="branch">
        {{ branch }}
      </option>
    </select>

    <select
      :value="filters.author"
      @input="setFilters({ author: $event.target.value })"
    >
      <option value="">All authors</option>
      <option
        v-for="author in uniqueAuthors"
        :key="author.id"
        :value="author.id"
      >
        {{ author.name }}
      </option>
    </select>

    <label>
      <input
        type="checkbox"
        :value="filters.ownMergeRequests"
        @input="setFilters({ ownMergeRequests: $event.target.checked })"
      />
      Search my merge requests only
    </label>

    <div class="results">
      <img
        v-if="isFetchingMergeRequests"
        src="@/assets/loader.svg"
        class="loader"
      />
      <template v-else>
        {{ filteredMergeRequests.length }} merge requests found.
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "MergeRequestsListFilters",
  computed: {
    ...mapState("mergeRequests", ["filters", "isFetchingMergeRequests"]),
    ...mapGetters("mergeRequests", [
      "uniqueAuthors",
      "uniqueBranchs",
      "filteredMergeRequests",
    ]),
  },
  methods: {
    ...mapMutations("mergeRequests", ["setFilters"]),
  },
};
</script>

<style lang="scss" scoped>
.filters {
  display: flex;
  gap: 1rem;
}

.results {
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
}

@keyframes Rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

.loader {
  height: 1rem;
  animation: 1s Rotate infinite linear;
}
</style>
