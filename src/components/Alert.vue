<template>
  <v-snackbar
    :value="dialogs.alert"
    :color="alert.color || 'success'"
    :timeout="3000"
  >
    {{ alert.message }}
    <v-btn
      text
      @click="$store.dispatch('main/closeAlert')"
    >
      {{ $t('common.close') }}
    </v-btn>
  </v-snackbar>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'Alert',

  data() {
    return {
      snackbar: true
    };
  },

  computed: {
    ...mapGetters({
      alert: 'main/alert',
      dialogs: 'main/dialogs'
    })
  },
};
</script>