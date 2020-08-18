<template>
  <div>
    <!-- ИНДИКАТОР ЗАГРУЗКИ -->
    <v-dialog
      :value="showLoading"
      hide-overlay
      persistent
      width="300"
      class="loading"
      content-class="loading-modal"
    >
      <v-card
        color="primary"
      >
        <v-card-text>
          <div style="display: flex; justify-content: space-between;">
            <div>
              {{ $t('dialogs.start.loadingText') }}...
            </div>
            <div>
              {{ done }} / {{ adsets.selected.length }}
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
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'AdsetsDialogStart',

  data() {
    return {
      showLoading: false,
      done: 0,
      newBudget: null,
    };
  },

  computed: {
    ...mapGetters({
      adsets: 'adsets/adsets',
    })
  },

  created() {
    if (confirm(this.$t('common.confirmPlease'))) {
      this.start();
    } else {
      this.$store.dispatch('adsets/closeDialog', 'start');
    }
  },

  methods: {
    start() {
      if (!this.adsets.selected || this.adsets.selected.length === 0) {
        this.$store.dispatch('adsets/closeDialog', 'start');
        return;
      }

      this.showLoading = true;

      this.adsets.selected.forEach(adset => {
        const data = {
          id: adset.id,
        };
        this.api.post('/adsets/start', data).finally(() => {
          this.done++;
          if (this.done === this.adsets.selected.length) {
            this.$store.dispatch('adsets/loadAdsets');
            this.$store.dispatch('adsets/closeDialog', 'start');
          }
        });
      });
    }
  }
};
</script>