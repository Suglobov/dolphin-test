<template>
  <div>
    <v-dialog
      v-model="loading"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
      >
        <v-card-text>
          <div style="display: flex; justify-content: space-between;">
            <div>
              {{ $t('dialogs.accounts.multipleTokensCheck.title') }}
            </div>
            <div>
              {{ tokensChecked }} / {{ accounts.selected.length }}
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

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          small
          :disabled="accounts.selected.length === 0"
          color="primary"
          text
          style="min-width: 0; width: 30px; margin-top: 1px;"
          @click="multipleCheckTokens"
          v-on="on"
        >
          <v-icon :size="12">
            fas fa-code
          </v-icon>
        </v-btn>
      </template>
      <span>{{ $t('common.checkTokens') }}</span>
    </v-tooltip>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'AccountsMultipleTokensCheck',

  data() {
    return {
      loading: false,
      tokensChecked: 0,
    };
  },

  computed: {
    ...mapGetters({
      accounts: 'accounts/ACCOUNTS',
    })
  },

  methods: {
    multipleCheckTokens() {
      if (!confirm(this.$t('common.confirmPlease'))) return;
      this.tokensChecked = 0;
      if (this.accounts.selected && this.accounts.selected.length > 0) {
        this.loading = true;
        this.accounts.selected.forEach(account => {
          this.api(`/accounts/check_token/${account.id}`).then((response) => {
            console.log(JSON.stringify(response.data));
            
            this.tokensChecked++;
            if (this.tokensChecked === this.accounts.selected.length) {
              this.loading = false;
              this.$store.dispatch('accounts/LOAD_ACCOUNTS');
            }
          });
        });
      }
    }
  }
};
</script>
<style scoped>
  .v-dialog__content {
  align-items: flex-end !important;
}
</style>