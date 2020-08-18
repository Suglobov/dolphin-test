<template>
  <div>
    <v-dialog
      :value="dialogs.acceptRules"
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
              {{ $t('dialogs.accounts.acceptRules.loadingText') }}
            </div>
            <div>
              {{ done }} / {{ accounts.selected.length }}
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
  name: 'AccountsDialogAcceptRules',

  data() {
    return {
      done: 0,
    };
  },

  computed: {
    ...mapGetters({
      accounts: 'accounts/ACCOUNTS',
      dialogs: 'accounts/dialogs'
    })
  },

  created() {
    if (!confirm(this.$t('common.confirmPlease'))) return;
    this.tokensChecked = 0;
    if (this.accounts.selected && this.accounts.selected.length > 0) {
      this.loading = true;
      this.accounts.selected.forEach(account => {
        this.api(`/accounts/accept_rules/${account.id}`)
          .then((response) => {
            console.log(JSON.stringify(response.data));
          })
          .finally(() => {
            this.done++;
            if (this.done === this.accounts.selected.length) {
              this.$store.dispatch('accounts/closeDialog', 'acceptRules');
              this.$store.dispatch('accounts/LOAD_ACCOUNTS');
            }
          });
      });
    }
  }
};
</script>
<style scoped>
  .v-dialog__content {
    align-items: flex-end !important;
    justify-content: flex-end !important;
  }
</style>