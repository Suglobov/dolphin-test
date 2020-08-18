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
    <div
      v-if="item.ads_stat.total > 0"
      class="mt-0 mb-1"
    >
      <div style="height: 3px; width: 50%; border-radius: 2px; opacity: 0.5;">
        <div
          v-if="item.ads_stat.active"
          :style="{float: 'left', height: '3px', backgroundColor: '#4CAF50', width: (item.ads_stat.active / item.ads_stat.total * 100).toString() + '%'}"
        />
        <div
          v-if="item.ads_stat.moderation"
          :style="{float: 'left', height: '3px', backgroundColor: '#FFC107', width: (item.ads_stat.moderation / item.ads_stat.total * 100).toString() + '%'}"
        />
        <div
          v-if="item.ads_stat.disapproved"
          :style="{float: 'left', height: '3px', backgroundColor: '#FF5252', width: (item.ads_stat.disapproved / item.ads_stat.total * 100).toString() + '%'}"
        />
      </div>
    </div>
    <div style="font-size: 11px; color: gray;">
      <span
        class="d-block"
        style="line-height: 14px;"
      >
        ID: {{ item.adset_id }}
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
  name: 'AdsetsMainTableInfo',

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