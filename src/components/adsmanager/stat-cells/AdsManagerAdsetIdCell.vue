<template>
  <td>
    <span class="caption">
      {{ item.adset_id }}
    </span>
  </td>
</template>

<script>
export default {
  name: 'AdsManagerAdsetIdCell',
  props: {
    item: {
      type: Object,
      default: () => ({
        adset_id: null
      })
    }
  }
};
</script>