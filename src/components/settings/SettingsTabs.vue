<template>
  <v-tabs
    centered
    grow
    :value="activeTab.tab"
    :height="32"
    @change="changeTab"
  >
    <!-- ОСНОВНЫЕ -->
    <v-tab key="tab-users">
      {{ $t('settings.tabs.general') }}
    </v-tab>

    <!-- FACEBOOK API -->
    <v-tab key="tab-facebook-api">
      {{ $t('settings.tabs.facebookApi') }}
    </v-tab>

    <!-- ЭКСПОРТ РАСХОДОВ -->
    <!-- <v-tab key="tab-export-costs">
      {{ $t('settings.tabs.exportCosts') }}
    </v-tab> -->

    <!-- УВЕДОМЛЕНИЯ -->
    <!-- <v-tab key="tab-notifications">
      {{ $t('settings.tabs.notifications') }}
    </v-tab> -->

    <!-- РЕЗЕРВНОЕ КОПИРОВАНИЕ -->
    <!-- <v-tab key="tab-backups">
      {{ $t('settings.tabs.backups') }}
    </v-tab> -->
  </v-tabs>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'SettingsTabs',

  data: () => ({
    tabs: ['general', 'facebook-api'],
    clickedOnClear: false,
  }),

  computed: {
    ...mapGetters({
      activeTab: 'settings/activeTab',
    })
  },

  methods: {
    changeTab(tab) {
      if( !this.clickedOnClear) {
        this.$store.dispatch('settings/setActiveTab', {
          tab: tab,
          component: this.tabs[tab]
        });
      }
    }
  }
};
</script>