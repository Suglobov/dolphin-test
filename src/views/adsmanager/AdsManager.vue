<template>
  <div>
    <tabs />
    <columns-dialog v-if="dialogs.columns" />
    <div style="padding: 8px;">
      <!-- <keep-alive> -->
      <component :is="activeTab.component" />
      <!-- </keep-alive> -->
    </div>
  </div>
</template>

<script>
import {mapGetters}   from 'vuex';

import tabs           from '../../components/adsmanager/AdsManagerTabs';
import ColumnsDialog  from '../../components/adsmanager/dialogs/AdsManagerColumnsDialog';

import accounts       from './Accounts';
import adsets         from './Adsets';
import ads            from './Ads';
import bms            from './Bms';
import cabs           from './Cabs';
import campaigns      from './Campaigns';
import dates          from './Dates';
import users          from './Users';

export default {
  name: 'AdsManager',
        
  components: {
    tabs,
    campaigns,
    accounts,
    bms,
    cabs,
    dates,
    adsets,
    users,
    ads,
    ColumnsDialog
  },

  computed: {
    ...mapGetters({
      activeTab: 'adsmanager/activeTab',
      dialogs: 'adsmanager/dialogs'
    })
  },

  created() {
    // this.$store.dispatch('accounts/LOAD_ACCOUNTS');
  }
};
</script>