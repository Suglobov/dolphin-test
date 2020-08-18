<template>
  <div style="padding: 8px !important;">
    <dialog-add v-if="dialogs.add" />
    <dialog-check v-if="dialogs.check" />
    <dialog-delete v-if="dialogs.delete" />
    <dialog-edit v-if="dialogs.edit" />
    <dialog-permissions v-if="dialogs.permissions" />
    <dialog-share v-if="dialogs.share" />

    <topbar />
    <main-table />
  </div>
</template>

<script>
import DialogAdd          from '@/components/proxy/ProxyDialogAdd';
import DialogCheck        from '@/components/proxy/ProxyDialogCheck';
import DialogDelete       from '@/components/proxy/ProxyDialogDelete';
import DialogEdit         from '@/components/proxy/ProxyDialogEdit';
import DialogPermissions  from '@/components/proxy/ProxyDialogPermissions';
import DialogShare        from '@/components/proxy/ProxyDialogShare';
import MainTable          from '@/components/proxy/ProxyMainTable';
import Topbar             from '@/components/proxy/ProxyTopbar';
import {mapGetters}       from 'vuex';

export default {
  name: 'Proxy',

  components: {
    DialogAdd,
    DialogCheck,
    DialogDelete,
    DialogEdit,
    DialogPermissions,
    DialogShare,
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
      dialogs: 'proxy/dialogs'
    })
  },

  created() {
    this.$store.dispatch('proxy/loadProxy');
    this.updateInterval = setInterval(() => {
      this.$store.dispatch('proxy/loadProxy');
    }, 60000);
  },

  beforeDestroy() {
    clearInterval(this.updateInterval);
  },
};
</script>