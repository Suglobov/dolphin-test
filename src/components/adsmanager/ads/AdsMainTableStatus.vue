<template>
  <td style="padding-right: 16px !important;">
    <div v-if="item.account.status === 'TOKEN_ERROR'">
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

    <div v-else-if="item.cab.status === 2">
      <v-chip
        color="red"
        outlined
        x-small
        label
        style="font-weight: bold;"
      >
        BAN
      </v-chip>
    </div>
    <div v-else>
      <div v-if="item.disapprove_reason && item.effective_status === 'DISAPPROVED'">
        <v-chip
          color="red"
          style="font-weight: bold;"
          x-small
          label
          outlined
        >
          {{ item.disapprove_reason }}
        </v-chip>
      </div>
      <div v-else>
        <v-chip
          v-if="item.effective_status === 'ACTIVE'"
          color="success"
          x-small
          label
          outlined
          style="font-weight: bold;"
        >
          {{ item.effective_status }}
        </v-chip>

        <v-chip
          v-else-if="item.effective_status === 'DISAPPROVED'"
          color="red"
          style="font-weight: bold;"
          x-small
          label
          outlined
        >
          {{ item.effective_status }}
        </v-chip>

        <v-chip
          v-else
          color="orange"
          style="font-weight: bold;"
          x-small
          label
          outlined
        >
          {{ item.effective_status }}
        </v-chip>
      </div>
    </div>

    <div
      v-if="item.cab.time_stat_update"
      style="font-size: 11px; color: gray;"
    >
      <v-icon
        style="color: gray; margin-top: -4px;"
        :size="11"
      >
        far fa-clock
      </v-icon>
      {{ item.cab.time_stat_update }}
    </div>
  </td>
</template>

<script>
export default {
  name: 'AdsMainTableStatus',
  props: {
    item: {
      type: Object,
      default: () => ({
        status: null,
        effective_status: null
      })
    }
  },
};
</script>