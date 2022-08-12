<template>
  <div class="merge-request">
    <strong>{{ mergeRequest.title }}</strong>

    <div class="secondary-infos">
      <img src="@/assets/git-branch.svg" />
      {{ mergeRequest.branchTo }}

      <img src="@/assets/user.svg" />
      {{ mergeRequest.author.name }}

      <template v-if="mergeRequest.closed">
        <img src="@/assets/lock.svg" />
        {{ mergeRequest.closed ? "Closed" : "Open" }}
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mergeRequest: {
      type: Object,
      required: true,
    },
  },
  name: "MergeRequestsListItem",
};
</script>

<style lang="scss" scoped>
.merge-request {
  padding: 0.75rem;
  border-radius: 0.5rem;
  background-color: #e5eee3;

  .secondary-infos {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    margin-top: 0.5rem;

    img {
      height: 1rem;
    }
  }
}
</style>
