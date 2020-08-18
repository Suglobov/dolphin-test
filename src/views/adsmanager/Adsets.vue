<template>
  <div>
    <dialog-change-budget v-if="dialogs.changeBudget" />
    <dialog-duplicate v-if="dialogs.duplicate" />
    <dialog-pause v-if="dialogs.pause" />
    <dialog-start v-if="dialogs.start" />

    <topbar />
    <main-table />
  </div>
</template>

<script>
import {mapGetters}          from 'vuex';

import DialogChangeBudget    from '../../components/adsmanager/adsets/AdsetsDialogChangeBudget';
import DialogDuplicate       from '../../components/adsmanager/adsets/AdsetsDialogDuplicate';
import DialogPause           from '../../components/adsmanager/adsets/AdsetsDialogPause';
import DialogStart           from '../../components/adsmanager/adsets/AdsetsDialogStart';
import MainTable             from '../../components/adsmanager/adsets/AdsetsMainTable';
import Topbar                from '../../components/adsmanager/adsets/AdsetsTopbar';

export default {
  name: 'Adsets',

  components: {
    DialogChangeBudget,
    DialogDuplicate,
    DialogPause,
    DialogStart,
    MainTable,
    Topbar,
  },

  data() {
    return {
      updateInterval: null,
    };
  },

  computed: {
    ...mapGetters({
      adsets: 'adsets/adsets',
      dialogs: 'adsets/dialogs',
      globalFilters: 'adsmanager/filters'
    })
  },

  watch: {
    'adsets.selected': {
      deep: true,
      handler(newVal, oldVal) {
        if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
          this.$store.dispatch('ads/clear');
        }
      }
    },

    globalFilters: {
      deep: true,
      async handler() {
        // await this.$store.dispatch('campaigns/filterCampaigns');
        this.$store.dispatch('adsets/loadStat');
      }
    },
  },

  created() {
    this.$store.dispatch('adsets/loadAdsets');
    this.updateInterval = setInterval(() => {
      this.$store.dispatch('adsets/loadAdsets');
    }, 60000);
  },

  beforeDestroy() {
    clearInterval(this.updateInterval);
  },
};
</script>