<template>
  <div>
    <MergeRequestsListFilters />

    <div class="merge-requests-listing">
      <MergeRequestsListItem
        v-for="mergeRequest in filteredMergeRequests"
        :key="mergeRequest.id"
        :merge-request="mergeRequest"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MergeRequestsListFilters from "./MergeRequestsListFilters.vue";
import MergeRequestsListItem from "./MergeRequestsListItem.vue";

export default {
  name: "MergeRequestsList",
  components: {
    MergeRequestsListFilters,
    MergeRequestsListItem,
  },
  created() {
    this.fetchMergeRequests();
  },
  computed: {
    ...mapGetters("mergeRequests", ["filteredMergeRequests"]),
  },
  methods: {
    ...mapActions("mergeRequests", ["fetchMergeRequests"]),
  },
};
</script>

<style lang="scss" scoped>
.merge-requests-listing {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
