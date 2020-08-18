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
import DialogChangeBudget     from '@/components/adsmanager/campaigns/CampaignsDialogChangeBudget';
import DialogDuplicate        from '@/components/adsmanager/campaigns/CampaignsDialogDuplicate';
import DialogPause            from '@/components/adsmanager/campaigns/CampaignsDialogPause';
import DialogStart            from '@/components/adsmanager/campaigns/CampaignsDialogStart';
import {mapGetters}           from 'vuex';

import MainTable              from '../../components/adsmanager/campaigns/CampaignsMainTable';
import Topbar                 from '../../components/adsmanager/campaigns/CampaignsTopbar';

export default {
  name: 'Campaigns',

  components: {
    DialogChangeBudget,
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
      campaigns: 'campaigns/campaigns',
      dialogs: 'campaigns/dialogs',
      globalFilters: 'adsmanager/filters'
    })
  },

  watch: {
    'campaigns.selected': {
      deep: true,
      handler(newVal, oldVal) {
        if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
          this.$store.dispatch('adsets/clear');
          this.$store.dispatch('ads/clear');
        }
      }
    },

    globalFilters: {
      deep: true,
      async handler() {
        // await this.$store.dispatch('campaigns/filterCampaigns');
        this.$store.dispatch('campaigns/loadStat');
      }
    },
  },

  created() {
    this.$store.dispatch('campaigns/loadCampaigns');
    this.updateInterval = setInterval(() => {
      this.$store.dispatch('campaigns/loadCampaigns');
    }, 60000);
  },

  beforeDestroy() {
    clearInterval(this.updateInterval);
  },
};
</script>