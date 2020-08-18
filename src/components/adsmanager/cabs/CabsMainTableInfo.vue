<template>
  <div class="my-2">
    <div>
      <v-icon
        :size="12"
        style="cursor: pointer; margin-right: 4px;"
        :title="$t('common.fbApiLog')"
        @click="loadLog(cab)"
      >
        fas fa-book
      </v-icon>
      <span>
        {{ cab.name }}
      </span>
    </div>
    <div
      v-if="cab.ads_stat.total > 0"
      class="mt-0 mb-1"
    >
      <div style="height: 3px; width: 50%; border-radius: 2px; opacity: 0.5;">
        <div
          v-if="cab.ads_stat.active"
          :style="{float: 'left', height: '3px', backgroundColor: '#4CAF50', width: (cab.ads_stat.active / cab.ads_stat.total * 100).toString() + '%'}"
        />
        <div
          v-if="cab.ads_stat.moderation"
          :style="{float: 'left', height: '3px', backgroundColor: '#FFC107', width: (cab.ads_stat.moderation / cab.ads_stat.total * 100).toString() + '%'}"
        />
        <div
          v-if="cab.ads_stat.disapproved"
          :style="{float: 'left', height: '3px', backgroundColor: '#FF5252', width: (cab.ads_stat.disapproved / cab.ads_stat.total * 100).toString() + '%'}"
        />
      </div>
    </div>
    <div style="font-size: 11px; color: gray;">
      <span
        class="d-block"
        style="line-height: 14px;"
      >
        ID: {{ cab.cab_id }}
      </span>
      <span
        class="d-block"
        style="line-height: 14px;"
      >
        {{ $t('common.account') }}: {{ cab.account.name }}
      </span>
      <span
        class="d-block"
        style="line-height: 14px;"
      >
        {{ $t('common.pixel') }}: {{ cab.pixel_id || '-' }}
      </span>
    </div>
    <div>
      <cabs-main-table-tags :cab="cab" />
    </div>
  </div>
</template>

<script>
import CabsMainTableTags from './CabsMainTableTags';

export default {
  name: 'CabsMainTableInfo',

  components: {
    CabsMainTableTags
  },

  props: {
    cab: {
      type: Object,
      default: () => ({
        name: '',
      })
    }
  },

  methods: {
    async loadLog(cab) {
      this.$store.dispatch('fbApiLog/clearLog');
      this.$store.dispatch('fbApiLog/openDialog', 'logSidebar');
      this.$store.dispatch('fbApiLog/loadLog', [{object: 'cab_id', id: cab.cab_id}]);
    }, 
  }
};
</script>