<template>
  <div>
    <dialog-apply-automation-rule v-if="dialogs.applyAutomationRule" />
    <dialog-apply-automation-rules-group v-if="dialogs.applyAutomationRulesGroup" />
    <dialog-attach-card v-if="dialogs.attachCard" />
    <dialog-change-country v-if="dialogs.changeCountry" />
    <dialog-create-pixel v-if="dialogs.createPixel" />
    <dialog-notifications-off v-if="dialogs.notificationsOff" />
    <dialog-notifications-on v-if="dialogs.notificationsOn" />
    <dialog-payment v-if="dialogs.payment" />
    <dialog-rename v-if="dialogs.rename" />
    <dialog-share v-if="dialogs.share" />
    <dialog-tags v-if="dialogs.tags" />
    <dialog-unarchive v-if="dialogs.unarchive" />
    <dialog-update-cabs-list v-if="dialogs.updateCabsList" />
    
    <topbar />
    <main-table />
  </div>
</template>

<script>
import {mapGetters}                                        from 'vuex';

import DialogApplyAutomationRulesGroup                     from '../../components/adsmanager/cabs/CabsDialogApplyAutomationRulesGroup';
import DialogApplyAutomationRule                           from '../../components/adsmanager/cabs/CabsDialogApplyAutomationRule';
import DialogAttachCard                                    from '../../components/adsmanager/cabs/CabsDialogAttachCard';
import DialogChangeCountry                                 from '../../components/adsmanager/cabs/CabsDialogChangeCountry';
import DialogCreatePixel                                   from '../../components/adsmanager/cabs/CabsDialogCreatePixel';
import DialogNotificationsOff                              from '../../components/adsmanager/cabs/CabsDialogNotificationsOff';
import DialogNotificationsOn                               from '../../components/adsmanager/cabs/CabsDialogNotificationsOn';
import DialogPayment                                       from '../../components/adsmanager/cabs/CabsDialogPayment';
import DialogRename                                        from '../../components/adsmanager/cabs/CabsDialogRename';
import DialogShare                                         from '../../components/adsmanager/cabs/CabsDialogShare';
import DialogTags                                          from '../../components/adsmanager/cabs/CabsDialogTags';
import DialogUnarchive                                     from '../../components/adsmanager/cabs/CabsDialogUnarchive';
import DialogUpdateCabsList                                from '../../components/adsmanager/cabs/CabsDialogUpdateCabsList';
import MainTable                                           from '../../components/adsmanager/cabs/CabsMainTable';
import Topbar                                              from '../../components/adsmanager/cabs/CabsTopbar';

export default {
  name: 'Cabs',

  components: {
    DialogApplyAutomationRule,
    DialogApplyAutomationRulesGroup,
    DialogAttachCard,
    DialogChangeCountry,
    DialogCreatePixel,
    DialogNotificationsOff,
    DialogNotificationsOn,
    DialogPayment,
    DialogRename,
    DialogShare, 
    DialogTags,
    DialogUnarchive,
    DialogUpdateCabsList,
    MainTable,
    Topbar,
  },

  data() {
    return {
      updateStatInterval: 0,
    };
  },

  computed: {
    ...mapGetters({
      accounts: 'accounts/filtered',
      globalFilters: 'adsmanager/filters',
      filters: 'cabs/filters',
      dialogs: 'cabs/dialogs',
      cabs: 'cabs/cabs'
    })
  },

  watch: {
    accounts: {
      deep: true,
      handler() {
        this.$store.dispatch('cabs/loadCabs');
      }
    },

    globalFilters: {
      deep: true,
      handler() {
        this.filterCabs(true);
      }
    },

    filters: {
      deep: true,
      handler() {
        this.filterCabs();
      }
    },

    'cabs.selected': {
      deep: true,
      handler(newVal, oldVal) {
        if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
          this.$store.dispatch('campaigns/clear');
          this.$store.dispatch('adsets/clear');
          this.$store.dispatch('ads/clear');
        }
      }
    }
  },

  created() {
    this.$store.dispatch('cabs/loadFilters');
    this.$store.dispatch('cabs/loadCabs', true);
    this.updateStatInterval = setInterval(() => {
      this.$store.dispatch('cabs/loadCabs', true);
    }, 60000);
  },

  beforeDestroy() {
    clearInterval(this.updateStatInterval);
  },

  methods: {
    async filterCabs(withStat = false) {
      await this.$store.dispatch('cabs/filterCabs');
      if (withStat) await this.$store.dispatch('cabs/loadStat');
    }
  },
};
</script>