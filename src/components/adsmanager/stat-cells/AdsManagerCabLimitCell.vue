<template>
  <td>
    <span v-if="!item.cab_limit || item.cab_limit === -1 || item.cab_limit === 0">{{ $t('common.no').toLowerCase() }}</span>
    <span v-else>{{ numeral(item.cab_limit).format('0,0.[00]').split(',').join(' ') }} {{ item.currency }}</span>
  </td>
</template>

<script>
import numeral from 'numeral'
;

export default {
  name: 'AdsManagerCabLimitCell',

  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      numeral
    };
  },
};
</script>