<template>
  <date-range-picker
    :date-range="globalFilters.dates"
    style="width: 100%;"
    :locale-data="localeData"
    auto-apply
    @select="changeDates"
  >
    <template
      v-slot:input="picker"
      style="width: 100%;"
    >
      <v-text-field
        dense
        solo
        single-line
        prepend-inner-icon="fas fa-calendar"
        hide-details
        :value="moment(picker.startDate).format('YYYY-MM-DD') + ' - ' + moment(picker.endDate).format('YYYY-MM-DD')"
        readonly
        style="cursor: pointer;"
      />
    </template>
  </date-range-picker>
</template>

<script>
import moment              from 'moment';
import DateRangePicker     from 'vue2-daterange-picker';
import {mapGetters}        from 'vuex';

export default {
  name: 'AdsManagerFiltersDate',

  components: {
    DateRangePicker
  },

  data() {
    return {
      moment,
      dateRange: {
        startDate: '2020-04-23',
        endDate: '2020-04-23'
      },
      localeData: {
        direction: 'ltr',
        format: 'yyyy-mm-dd',
        separator: ' - ',
        applyLabel: 'Apply',
        cancelLabel: 'Cancel',
        weekLabel: 'W',
        customRangeLabel: 'Custom Range',
        daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        firstDay: 0
      }
    };
  },

  computed: {
    ...mapGetters({
      globalFilters: 'adsmanager/filters'
    })
  },

  methods: {
    changeDates(dates) {
      this.$store.dispatch('adsmanager/setFiltersDates', {
        startDate: this.moment(dates.startDate).format('YYYY-MM-DD'),
        endDate: this.moment(dates.endDate).format('YYYY-MM-DD')
      });
    }
  }
};
</script>