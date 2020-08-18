<template>
  <div>
    <dialog-add v-if="dialogs.add" />
    <dialog-edit v-if="dialogs.edit" />

    <topbar />
    <main-table />
  </div>
</template>

<script>
import {mapGetters}  from 'vuex'; 

import DialogAdd     from '../../components/adsmanager/users/UsersDialogAdd';
import DialogEdit    from '../../components/adsmanager/users/UsersDialogEdit';
import MainTable     from '../../components/adsmanager/users/UsersMainTable';
import Topbar        from '../../components/adsmanager/users/UsersTopbar';

export default {
  name: 'Users',

  components: {
    DialogAdd,
    DialogEdit,
    MainTable,
    Topbar
  },

  data() {
    return {
      updateInterval: null
    };
  },

  computed: {
    ...mapGetters({
      users: 'users/users',
      dialogs: 'users/dialogs',
      globalFilters: 'adsmanager/filters'
    })
  },

  watch: {
    'users.selected': {
      deep: true,
      handler(newVal, oldVal) {
        if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
          this.$store.dispatch('accounts/clear');
          this.$store.dispatch('bms/clear');
          this.$store.dispatch('cabs/clear');
          this.$store.dispatch('campaigns/clear');
          this.$store.dispatch('adsets/clear');
          this.$store.dispatch('ads/clear');
        }
      }
    },

    globalFilters: {
      deep: true,
      async handler() {
        // await this.$store.dispatch('campaigns/filterCampaigns');
        this.$store.dispatch('users/loadStat');
      }
    },
  },

  created() {
    this.$store.dispatch('users/loadUsers');
    this.updateInterval = setInterval(() => {
      this.$store.dispatch('users/loadUsers', true);
    }, 60000);
  },

  beforeDestroy() {
    clearInterval(this.updateInterval);
  }
};
</script>