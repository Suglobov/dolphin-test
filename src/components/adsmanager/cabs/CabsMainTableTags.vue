<template>
  <div>
    <v-chip
      v-for="tag in cab.tags"
      :key="`cab-${cab.id}-tag-${tag}`"
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
  name: 'CabsMainTableTags',
  props: {
    cab: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>