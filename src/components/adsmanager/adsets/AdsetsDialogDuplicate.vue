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
  name: 'AdsetsDialogDuplicate',

  data() {
    return {
      showLoading: false,
      done: 0,
      copiesNumber: 1,
    };
  },

  computed: {
    ...mapGetters({
      adsets: 'adsets/adsets',
    })
  },

  created() {
    this.copiesNumber = prompt(this.$t('dialogs.duplicate.promptText'), 1);
    if (this.copiesNumber) {
      this.duplicate();
    } else {
      this.$store.dispatch('adsets/closeDialog', 'duplicate');
    }
  },

  methods: {
    duplicate() {
      if (!this.adsets.selected || this.adsets.selected.length === 0) {
        this.$store.dispatch('adsets/closeDialog', 'duplicate');
        return;
      }

      this.showLoading = true;

      this.adsets.selected.forEach(adset => {
        const data = {
          id: adset.id,
          copies: this.copiesNumber
        };
        
        this.api.post('/adsets/duplicate', data).finally(async () => {
          await this.api(`/cabs/stat/${adset.cab_id}`);
          this.done++;
          if (this.done === this.adsets.selected.length) {
            this.$store.dispatch('adsets/loadAdsets');
            this.$store.dispatch('adsets/closeDialog', 'duplicate');
          }
        });
      });
    }
  }
};
</script>