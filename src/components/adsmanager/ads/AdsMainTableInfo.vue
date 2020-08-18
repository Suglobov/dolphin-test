<template>
  <td>
    <div>
      <v-icon
        :size="12"
        style="cursor: pointer; margin-right: 4px;"
        :title="$t('common.fbApiLog')"
        @click="loadLog()"
      >
        fas fa-book
      </v-icon>
      {{ item.name }}
    </div>
    <div style="font-size: 11px; color: gray;">
      <span
        class="d-block"
        style="line-height: 14px;"
      >
        ID: {{ item.ad_id }}
      </span>
      <span
        class="d-block"
        style="line-height: 14px;"
      >
        {{ $t('common.creativeId') }}: {{ item.creative_id }}
      </span>
      <span
        class="d-block"
        style="line-height: 14px;"
      >
        {{ $t('common.adset') }}: {{ item.adset.name }}
      </span>
      <span
        class="d-block"
        style="line-height: 14px;"
      >
        {{ $t('common.campaign') }}: {{ item.campaign.name }}
      </span>
      <span
        class="d-block"
        style="line-height: 14px;"
      >
        {{ $t('common.cab') }}: {{ item.cab.name }}
      </span>
      <span
        class="d-block"
        style="line-height: 14px;"
      >
        {{ $t('common.account') }}: {{ item.account.name }}
      </span>
    </div>
  </td>
</template>

<script>
export default {
  name: 'AdsMainTableInfo',

  props: {
    item: {
      type: Object,
      default: () => ({
        name: '',
      })
    }
  },

  methods: {
    async loadLog() {
      this.$store.dispatch('fbApiLog/clearLog');
      this.$store.dispatch('fbApiLog/openDialog', 'logSidebar');
      const data = [{object: 'adset_id', id: this.item.adset_id}];
      console.log(JSON.stringify(data));
      
      this.$store.dispatch('fbApiLog/loadLog', data);
    }, 
  }
};
</script>