<template>
  <div>
    <v-chip
      v-if="typeof colors[account.status] !== 'undefined'"
      label
      :color="colors[account.status]"
      x-small
      outlined
      style="font-weight: bold;"
    >
      <span v-if="account.status === 'TOKEN_ERROR'">
        ERROR
      </span>
      <span v-else>
        {{ account.status }}
      </span>
    </v-chip>
    <span v-if="typeof colors[account.status] === 'undefined'">
      {{ account.status }}
    </span>
  </div>
</template>

<script>
import colors from '../../../constants/accounts/status-colors';

export default {
  name: 'AccountsMainTableStatus',
  props: {
    account: {
      type: Object,
      default: () => ({
        status: 'NEW',
      })
    }
  },
  data: () => ({
    colors
  })
};
</script>