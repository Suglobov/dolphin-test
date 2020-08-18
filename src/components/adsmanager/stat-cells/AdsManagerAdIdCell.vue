<template>
  <td>
    <span class="caption">
      {{ item.ad_id }}
    </span>
  </td>
</template>

<script>
export default {
  name: 'AdsManagerAdIdCell',
  props: {
    item: {
      type: Object,
      default: () => ({
        ad_id: null
      })
    }
  }
};
</script>