<template>
  <div>
    <dialog-duplicate v-if="dialogs.duplicate" />
    <dialog-pause v-if="dialogs.pause" />
    <dialog-start v-if="dialogs.start" />

    <topbar />
    <main-table />
  </div>
</template>

<script>
import {mapGetters}                  from 'vuex';

import DialogDuplicate               from '../../components/adsmanager/ads/AdsDialogDuplicate';
import DialogPause                   from '../../components/adsmanager/ads/AdsDialogPause';
import DialogStart                   from '../../components/adsmanager/ads/AdsDialogStart';
import MainTable                     from '../../components/adsmanager/ads/AdsMainTable';
import Topbar                        from '../../components/adsmanager/ads/AdsTopbar';

export default {
  name: 'Ads',

  components: {
    DialogDuplicate,
    DialogPause,
    DialogStart,
    MainTable,
    Topbar
  },

  data() {
    return {
      updateInterval: null,
    };
  },

  computed: {
    ...mapGetters({
      users: 'users/users',
      accounts: 'accounts/ACCOUNTS',
      cabs: 'cabs/cabs',
      campaigns: 'campaigns/campaigns',
      adsets: 'adsets/adsets',
      ads: 'ads/ads',
      dialogs: 'ads/dialogs',
      globalFilters: 'adsmanager/filters'
    })
  },

  watch: {
    globalFilters: {
      deep: true,
      async handler() {
        // await this.$store.dispatch('campaigns/filterCampaigns');
        this.$store.dispatch('ads/loadStat');
      }
    },
  },

  created() {
    this.$store.dispatch('ads/loadAds');
    this.updateInterval = setInterval(() => {
      this.$store.dispatch('ads/loadAds');
    }, 60000);
  },

  beforeDestroy() {
    clearInterval(this.updateInterval);
  }
};
</script>