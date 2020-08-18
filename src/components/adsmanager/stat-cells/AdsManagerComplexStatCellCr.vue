<template>
  <td>
    <span
      v-if="show"
    >
      <span v-if="col === 'action_results'">
        {{ 
          itIsTotalRow ? 
            numeral(stat['total']['cr']).format('0.00') : 
            numeral(stat[item.id]['cr']).format('0.00')
        }}%
      </span>
      <span v-else>
        {{ 
          itIsTotalRow ? 
            numeral(stat['total']['actions'][col]['cr']).format('0.00') : 
            numeral(stat[item.id]['actions'][col]['cr']).format('0.00')
        }}%
      </span>
    </span>
    <span v-else>
      0%
    </span>
  </td>
</template>

<script>
import numeral        from 'numeral';

export default {
  name: 'AdsManagerComplexStatCellCr',

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
    }
  },

  data() {
    return {
      numeral
    };
  },

  computed: {
    stat() {
      return this.$store.getters[`${this.$store.state.adsmanager.activeTab.component}/stat`];
    },

    show() {
      if (!this.stat) return false;
      
      if (this.col === 'action_results') {
        if(this.itIsTotalRow) {
          return (
            typeof this.stat['total'] !== 'undefined' &&
            typeof this.stat['total']['cr'] !== 'undefined'
          );
        }

        return (
          typeof this.stat[this.item.id] !== 'undefined' &&
          typeof this.stat[this.item.id]['cr'] !== 'undefined'
        ); 
      }

      if(this.itIsTotalRow) {
        return (
          typeof this.stat['total'] !== 'undefined' &&
          typeof this.stat['total']['actions'] !== 'undefined' &&
          typeof this.stat['total']['actions'][this.col] !== 'undefined'
        );
      }

      return (
        typeof this.stat[this.item.id] !== 'undefined' &&
        typeof this.stat[this.item.id]['actions'] !== 'undefined' &&
        typeof this.stat[this.item.id]['actions'][this.col] !== 'undefined' 
      );
    }
  },
};
</script>