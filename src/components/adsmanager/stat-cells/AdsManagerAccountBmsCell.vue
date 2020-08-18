<template>
  <td>
    <div v-if="item.bms">
      <div
        v-for="bm in item.bms"
        :key="`account-${item.id}-bm-${bm.business_id}`"
        style="font-size: 12px;"
      >
        <span>
          <a
            target="_blank"
            :href="`https://business.facebook.com/home/accounts?business_id=${bm.business_id}`"
          >{{ bm.name }}</a>
        </span>
        <span>
          | {{ bm.business_id }}
        </span>
      </div>
    </div>
    <div v-if="!item.bms">
      -
    </div>
  </td>
</template>

<script>
export default {
  name: 'AdsManagerAccountBmsCell',

  props: {
    item: {
      type: Object,
      default: () => ({
        id: -1,
        bms: []
      })
    }
  }
};
</script>