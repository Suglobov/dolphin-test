<template>
  <div>
    <v-chip
      v-for="tag in account.tags"
      :key="`account-${account.id}-tag-${tag}`"
      class="mr-1"
      color="primary"
      outlined
      x-small
      label
    >
      {{ tag }}
    </v-chip>
  </div>
</template>

<script>
export default {
  name: 'AccountsMainTableTags',
  props: {
    account: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>