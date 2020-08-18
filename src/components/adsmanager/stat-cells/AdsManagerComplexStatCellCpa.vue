<template>
  <td>
    <span
      v-if="show"
    >
      <span v-if="col === 'action_results'">
        {{ 
          itIsTotalRow ? 
            numeral(stat['total']['cpa']).format('0,0.[00]').split(',').join(' ') : 
            numeral(stat[item.id]['cpa']).format('0,0.[00]').split(',').join(' ') 
        }}
      </span>
      <span v-else>
        {{ 
          itIsTotalRow ? 
            numeral(stat['total']['actions'][col]['cpa']).format('0,0.[00]').split(',').join(' ') : 
            numeral(stat[item.id]['actions'][col]['cpa']).format('0,0.[00]').split(',').join(' ') 
        }}
      </span>
    </span>
    <span v-else>
      0
    </span>
    <span> USD</span>
  </td>
</template>

<script>
import numeral            from 'numeral';

export default {
  name: 'AdsManagerComplexStatCellCpa',

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
                      typeof this.stat['total']['cpa'] !== 'undefined'
          );
        }

        return (
          typeof this.stat[this.item.id] !== 'undefined' &&
                    typeof this.stat[this.item.id]['cpa'] !== 'undefined'
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