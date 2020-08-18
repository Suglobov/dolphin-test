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
              {{ done }} / {{ ads.selected.length }}
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
  name: 'AdsDialogStart',

  data() {
    return {
      showLoading: false,
      done: 0,
      newBudget: null,
    };
  },

  computed: {
    ...mapGetters({
      ads: 'ads/ads',
    })
  },

  created() {
    if (confirm(this.$t('common.confirmPlease'))) {
      this.start();
    } else {
      this.$store.dispatch('ads/closeDialog', 'start');
    }
  },

  methods: {
    start() {
      if (!this.ads.selected || this.ads.selected.length === 0) {
        this.$store.dispatch('ads/closeDialog', 'start');
        return;
      }

      this.showLoading = true;

      this.ads.selected.forEach(ad => {
        const data = {
          id: ad.id,
        };
        this.api.post('/ads/start', data).finally(() => {
          this.done++;
          if (this.done === this.ads.selected.length) {
            this.$store.dispatch('ads/loadAds');
            this.$store.dispatch('ads/closeDialog', 'start');
          }
        });
      });
    }
  }
};
</script>