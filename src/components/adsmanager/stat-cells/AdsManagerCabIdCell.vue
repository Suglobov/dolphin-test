<template>
  <td>
    <span class="caption">
      {{ item.cab_id }}
    </span>
  </td>
</template>

<script>
export default {
  name: 'AdsManagerCabIdCell',
  props: {
    item: {
      type: Object,
      default: () => ({
        cab_id: null
      })
    }
  }
};
</script>