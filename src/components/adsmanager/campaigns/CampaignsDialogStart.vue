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
              {{ $t('dialogs.start.loadingText') }}
            </div>
            <div>
              {{ done }} / {{ campaigns.selected.length }}
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
  name: 'CampaignsDialogStart',

  data() {
    return {
      showLoading: false,
      done: 0,
      newBudget: null,
    };
  },

  computed: {
    ...mapGetters({
      campaigns: 'campaigns/campaigns',
    })
  },

  created() {
    if (confirm(this.$t('common.confirmPlease'))) {
      this.start();
    } else {
      this.$store.dispatch('campaigns/closeDialog', 'start');
    }
  },

  methods: {
    start() {
      if (!this.campaigns.selected || this.campaigns.selected.length === 0) {
        this.$store.dispatch('campaigns/closeDialog', 'start');
        return;
      }

      this.showLoading = true;

      this.campaigns.selected.forEach(campaign => {
        const data = {
          id: campaign.id,
        };
        this.api.post('/campaigns/start', data).finally(() => {
          this.done++;
          if (this.done === this.campaigns.selected.length) {
            this.$store.dispatch('campaigns/loadCampaigns');
            this.$store.dispatch('campaigns/closeDialog', 'start');
          }
        });
      });
    }
  }
};
</script>