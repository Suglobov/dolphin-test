<template>
  <td style="font-size: 11px; padding: 0px 8px !important;">
    <!-- КАРТА И БИЛЛИНГ -->
    <div style="display: flex; justify-content: space-between;">
      <!-- КАРТА -->
      <div>
        <!-- ЗНАЧКИ КАРТ -->
        <v-icon
          v-if="cab.card_type === 'mastercard'"
          :size="11"
          style="margin-top: -4px"
        >
          fab fa-cc-mastercard
        </v-icon>
        <v-icon
          v-else-if="cab.card_type === 'visa'"
          :size="11"
          style="margin-top: -4px"
        >
          fab fa-cc-visa
        </v-icon>
        <v-icon
          v-else
          :size="11"
          style="margin-top: -4px"
        >
          far fa-credit-card
        </v-icon>

        <!-- НОМЕР КАРТЫ -->
        <span v-if="cab.card_number">
          *{{ cab.card_number }}
        </span>
        <span v-else>
          {{ $t('common.noCard').toLowerCase() }}
        </span>

        <!-- ФЛАГ СТРАНЫ -->
        <span v-if="cab.card_number && cab.business_country_code">
          <flag
            :iso="cab.business_country_code.toLowerCase()"
            style="width: 15px; background-size: 100% 100%;"
          />
        </span>
      </div>

      <!-- БИЛЛИНГ -->
      <div>
        {{
          cab.balance ?
            numeral(cab.balance).format('0,0.[00]').split(',').join(' ') : 0
        }}
        /
        {{
          cab.billing ?
            numeral(cab.billing).format('0,0.[00]').split(',').join(' ') : 0
        }}
        {{ cab.currency }}
      </div>
    </div>
    <!-- ПРОГРЕСС -->
    <div>
      <v-progress-linear 
        :value="billingPercent" 
        :color="billingProgressColor"
        :height="5"
        rounded
      />
    </div>
    <!-- РАСХОД / ЛИМИТ -->
    <div style="display: flex; justify-content: space-between;">
      <div>
        {{ $t('common.totalSpend') }}: {{ numeral(cab.spent).format('0,0.[00]').split(',').join(' ') }} {{ cab.currency }}
      </div>
      <div>
        {{ $t('common.limit') }}: 
        <span v-if="!cab.cab_limit || cab.cab_limit === -1 || cab.cab_limit === 0">{{ $t('common.no').toLowerCase() }}</span>
        <span v-else>{{ numeral(cab.cab_limit).format('0,0.[00]').split(',').join(' ') }} {{ cab.currency }}</span>
      </div>
    </div>
  </td>
</template>

<script>
import numeral        from 'numeral';

export default {
  name: 'AdsManagerSimpleStatCell',

  props: {
    cab: {
      type: [Object, Array],
      default: () => ({
        card_number: null,
        card_type: null,
        balance: 0,
        billing: 0,
        cab_limit: 0,
      })
    },
  },

  data() {
    return {
      numeral,
    };
  },

  computed: {
    billingPercent() {
      if (!this.cab.billing || this.cab.billing === 0) return 0;
      return this.cab.balance / this.cab.billing * 100;
    },

    billingProgressColor() {
      if (this.billingPercent > 70 && this.billingPercent < 100) return 'orange';
      if (this.billingPercent >= 100) return 'red';
      return 'success';
    }
  }
};
</script> 