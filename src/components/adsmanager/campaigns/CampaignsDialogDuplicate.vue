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
  name: 'CampaignsDialogDuplicate',

  data() {
    return {
      showLoading: false,
      done: 0,
      copiesNumber: 1,
    };
  },

  computed: {
    ...mapGetters({
      campaigns: 'campaigns/campaigns',
    })
  },

  created() {
    this.copiesNumber = prompt(this.$t('dialogs.duplicate.promptText'), 1);
    if (this.copiesNumber) {
      this.duplicate();
    } else {
      this.$store.dispatch('campaigns/closeDialog', 'duplicate');
    }
  },

  methods: {
    duplicate() {
      if (!this.campaigns.selected || this.campaigns.selected.length === 0) {
        this.$store.dispatch('campaigns/closeDialog', 'duplicate');
        return;
      }

      this.showLoading = true;

      this.campaigns.selected.forEach(campaign => {
        const data = {
          id: campaign.id,
          copies: this.copiesNumber
        };
        
        this.api.post('/campaigns/duplicate', data).finally(async () => {
          const response = await this.api(`/cabs/stat/${campaign.cab_id}`);
          console.log(JSON.stringify(response.data));
          
          this.done++;
          if (this.done === this.campaigns.selected.length) {
            this.$store.dispatch('campaigns/loadCampaigns');
            this.$store.dispatch('campaigns/closeDialog', 'duplicate');
          }
        });
      });
    }
  }
};
</script>