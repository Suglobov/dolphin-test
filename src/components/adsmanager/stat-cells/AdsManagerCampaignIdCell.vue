<template>
  <td>
    <span class="caption">
      {{ item.campaign_id }}
    </span>
  </td>
</template>

<script>
export default {
  name: 'AdsManagerCampaignIdCell',
  props: {
    item: {
      type: Object,
      default: () => ({
        campaign_id: null
      })
    }
  }
};
</script>