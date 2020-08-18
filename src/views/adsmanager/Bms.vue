<template>
  <div>
    <topbar />
    <main-table />
  </div>
</template>

<script>
import MainTable       from '@/components/adsmanager/bms/BmsMainTable.vue';
import Topbar          from '@/components/adsmanager/bms/BmsTopbar.vue';
import {mapGetters}    from 'vuex';

export default {
  name: 'Bms',

  components: {
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
      bms: 'bms/bms'
    })
  },

  created() {
    this.$store.dispatch('bms/loadBms');
    this.updateInterval = setInterval(() => {
      this.$store.dispatch('bms/loadBms');
    }, 60000);
  },

  beforeDestroy() {
    clearInterval(this.updateInterval);
  },
};
</script>