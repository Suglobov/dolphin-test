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
              {{ $t('dialogs.duplicate.loadingText') }}...
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
  name: 'AdsDialogDuplicate',

  data() {
    return {
      showLoading: false,
      done: 0,
      copiesNumber: 1,
    };
  },

  computed: {
    ...mapGetters({
      ads: 'ads/ads',
    })
  },

  created() {
    this.copiesNumber = prompt(this.$t('dialogs.duplicate.promptText'), 1);
    if (this.copiesNumber) {
      this.duplicate();
    } else {
      this.$store.dispatch('ads/closeDialog', 'duplicate');
    }
  },

  methods: {
    duplicate() {
      if (!this.ads.selected || this.ads.selected.length === 0) {
        this.$store.dispatch('ads/closeDialog', 'duplicate');
        return;
      }

      this.showLoading = true;

      this.ads.selected.forEach(ad => {
        const data = {
          id: ad.id,
          copies: this.copiesNumber
        };
        
        this.api.post('/ads/duplicate', data).finally(async () => {
          await this.api(`/cabs/stat/${ad.cab_id}`);
          this.done++;
          if (this.done === this.ads.selected.length) {
            this.$store.dispatch('ads/loadAds');
            this.$store.dispatch('ads/closeDialog', 'duplicate');
          }
        });
      });
    }
  }
};
</script>