<template>
  <td>
    <span
      v-if="show"
    >
      {{ 
        itIsTotalRow ? 
          numeral(stat['total'][col]).format('0,0.[00]').split(',').join(' ') : 
          numeral(stat[item.id][col]).format('0,0.[00]').split(',').join(' ') 
      }}
    </span>
    <span v-else>
      0
    </span>
    <span v-if="col === 'spend'"> USD</span>
    <span v-if="col === 'cpm'"> USD</span>
    <span v-if="col === 'profit'"> USD</span>
    <span v-if="col === 'revenue'"> USD</span>
    <span v-if="col === 'roi'">%</span>
    <span v-if="col === 'approve'">%</span>
  </td>
</template>

<script>
import numeral        from 'numeral';

export default {
  name: 'AdsManagerSimpleStatCell',

  props: {
    item: {
      type: Object,
      default: () => ({})
    },

    col: {
      type: String,
      default: '',
    },

    itIsTotalRow: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      numeral,
      excludedCols: [
        'billing'
      ]
    };
  },

  computed: {
    stat() {
      return this.$store.getters[`${this.$store.state.adsmanager.activeTab.component}/stat`];
    },
    show() {
      if (!this.stat) return false;
      if (this.excludedCols.indexOf(this.col) > -1) return false;

      if(this.itIsTotalRow) {
        return (
          typeof this.stat['total'] !== 'undefined' &&
          typeof this.stat['total'][this.col] !== 'undefined'
        );
      }
                
      return (
        typeof this.stat[this.item.id] !== 'undefined' &&
        typeof this.stat[this.item.id][this.col] !== 'undefined' 
      );
    }
  },
};
</script> 