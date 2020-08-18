<template>
  <td class="caption">
    <div v-if="item.daily_budget > 0 || item.lifetime_budget > 0">
      <span v-if="item.daily_budget">
        {{ $t(`common.${budgetType}`) }}:
        <br>
        {{ numeral(budget).format('0,0.00').split(',').join(' ') }}
        {{ item.cab.currency }}
      </span>
    </div>
    <div v-else>
      -
    </div>
  </td>
</template>

<script>
import numeral from 'numeral';

export default {
  name: 'AdsManagerAdsetBudgetCell',

  props: {
    item: {
      type: Object,
      default: () => ({
        daily_budget: 0,
        lifetime_budget: 0,
        cab: {
          currency: 'USD'
        }
      })
    }
  },

  data() {
    return {
      currenciesWithNoOffset: [
        'CLP',
        'COP',
        'CRC',
        'HUF',
        'ISK',
        'IDR',
        'JPY',
        'KRW',
        'PYG',
        'TWD',
        'VND',
      ],
      numeral
    };
  },

  computed: {
    budget() {
      if (this.currenciesWithNoOffset.indexOf(this.item.cab.currency) > -1) {
        return this.item.daily_budget > 0 
          ? this.item.daily_budget
          : this.item.lifetime_budget;
      }

      return this.item.daily_budget > 0 
        ? (this.item.daily_budget / 100).toFixed(2)
        : (this.item.lifetime_budget).toFixed(2);
    },

    budgetType() {
      return this.item.daily_budget > 0
        ? 'daily'
        : 'lifetime';
    }
  }
};
</script>