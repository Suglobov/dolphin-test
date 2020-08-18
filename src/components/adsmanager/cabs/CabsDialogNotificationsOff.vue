<template>
  <!-- ИНДИКАТОР ЗАГРУЗКИ -->
  <v-dialog
    :value="dialogs.notificationsOff"
    hide-overlay
    persistent
    width="300"
    content-class="loading-modal"
  >
    <v-card
      color="primary"
    >
      <v-card-text>
        <div style="display: flex; justify-content: space-between;">
          <div>
            {{ $t('dialogs.cabs.notificationsOff.loadingText') }}
          </div>
          <div>
            {{ done }} / {{ cabs.selected.length }}
          </div>
        </div>
          
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'CabsDialogsNotificationsOff',

  data() {
    return {
      showLoading: true,
      done: 0,
    };
  },

  computed: {
    ...mapGetters({
      cabs: 'cabs/cabs',
      dialogs: 'cabs/dialogs'
    })
  },

  created() {
    if (this.cabs.selected && Array.isArray(this.cabs.selected) && this.cabs.selected.length > 0) {
      this.cabs.selected.forEach(async cab => {
        const data = {
          id: cab.id
        };
        await this.api.post('/cabs/notifications_off', data)
          .catch(() => true);
        this.done++;
        if (this.cabs.selected.length === this.done) {
          this.$store.dispatch('cabs/closeDialog', 'notificationsOff');
          this.$store.dispatch('cabs/loadCabs');
        }
      });
    } else {
      this.$store.dispatch('cabs/closeDialog', 'notificationsOff');
    }
  }
};
</script>