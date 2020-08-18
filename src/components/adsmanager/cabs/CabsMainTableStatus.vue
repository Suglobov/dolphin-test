<template>
  <div class="my-3">
    <div v-if="cab.account.status === 'TOKEN_ERROR'">
      <v-chip
        color="red"
        outlined
        x-small
        label
        style="font-weight: bold;"
      >
        TOKEN_ERROR
      </v-chip>
    </div>
    <div v-else-if="cab.account.status && cab.status > 0 && cab.status !== 2">
      <v-chip
        :color="statuses[cab.status][1]"
        outlined
        x-small
        label
        style="font-weight: bold;"
      >
        {{ statuses[cab.status][0] }}
      </v-chip>
    </div>
    <div
      v-if="cab.status === 2"
      style="font-size: 9px; color:gray;"
    >
      <v-chip
        color="red"
        outlined
        x-small
        label
        style="font-weight: bold;"
      >
        {{ disableReasons[cab.disable_reason][0] }}
      </v-chip>
    </div>
    <div v-if="[1, 3, 9].indexOf(cab.status) > - 1 && cab.balance > 0">
      <a
        style="font-size: 10px;"
        @click="payment(cab)"
      >
        {{ $t('common.pay').toUpperCase() }}
      </a>
    </div>
    <div
      v-if="cab.time_updated"
      style="font-size: 11px; color: gray;"
    >
      <v-icon
        style="color: gray; margin-top: -4px;"
        :size="11"
      >
        far fa-clock
      </v-icon>
      {{ cab.time_updated }}
    </div>
  </div>
</template>

<script>
import disableReasons from '../../../constants/cabs/disable_reasons';
import statuses       from '../../../constants/cabs/statuses';

export default {
  name: 'CabsMainTableStatus',

  props: {
    cab: {
      type: Object,
      default: () => ({
        status: 1,
        disable_reason: 0,
      })
    }
  },

  data() {
    return {
      statuses,
      disableReasons,
    };
  },

  methods: {
    payment(cab) {
      this.$store.dispatch('cabs/setCabForPayment', cab);
      this.$store.dispatch('cabs/openDialog', 'payment');
    }
  }
};
</script>