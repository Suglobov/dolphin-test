<template>
  <div>
    <topbar />
    <main-table />
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

import MainTable    from '../../components/adsmanager/dates/DatesMainTable';
import Topbar       from '../../components/adsmanager/dates/DatesTopbar';

export default {
  name: 'Dates',

  components: {
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
      globalFilters: 'adsmanager/filters',
    })
  },

  watch: {
    globalFilters: {
      deep: true,
      handler() {
        this.$store.dispatch('dates/loadDates');
      }
    },

    filters: {
      deep: true,
      handler() {
        this.$store.dispatch('cabs/loadDates');
      }
    }
  },

  created() {
    this.$store.dispatch('dates/loadDates');
    this.updateInterval = setInterval(() => {
      this.$store.dispatch('dates/loadDates');
    }, 60000);
  },

  beforeDestroy() {
    clearInterval(this.updateInterval);
  },
};
</script>