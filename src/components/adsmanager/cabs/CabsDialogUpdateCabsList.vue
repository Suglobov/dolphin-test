<template>
  <!-- ИНДИКАТОР ЗАГРУЗКИ -->
  <v-dialog
    :value="dialogs.updateCabsList"
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
            {{ $t('dialogs.cabs.updateCabsList.loadingText') }}...
          </div>
          <div>
            {{ done }} / {{ total }}
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
  name: 'CabsDialogUpdateCabsList',

  data() {
    return {
      showLoading: false,
      done: 0,
      total: 0,
    };
  },

  computed: {
    ...mapGetters({
      cabs: 'cabs/cabs',
      dialogs: 'cabs/dialogs',
      accounts: 'accounts/ACCOUNTS'
    })
  },

  created() {
    if (!confirm(this.$t('common.confirmPlease'))) {
      this.$store.dispatch('cabs/closeDialog', 'updateCabsList');
      return;
    } else {
      this.updateCabsList();
    }

    // if (!this.cabs.selected || !Array.isArray(this.cabs.selected) || this.cabs.selected.length === 0) {
    //   this.$store.dispatch('cabs/closeDialog', 'updateCabsList');
    // }

    // setTimeout(() => {
    //   this.$store.dispatch('cabs/closeDialog', 'updateCabsList');
    // }, 5000);
  },

  methods: {
    async updateCabsList() {
      console.log(this.accounts.all);
      if (!this.accounts.all.length) {
        await this.$store.dispatch('accounts/LOAD_ACCOUNTS');
      }

      const accounts = this.accounts.selected.length
        ? this.accounts.selected
        : this.accounts.filtered.length
          ? this.accounts.filtered
          : this.accounts.all;

      const accounts_ids = accounts.map(account => account.id);
      console.log(JSON.stringify(accounts_ids));
      this.total = accounts_ids.length;

      accounts_ids.forEach(account_id => {
        this.api(`/accounts/update_cabs_list/${account_id}`).finally(() => {
          this.done++;

          if (this.done === accounts_ids.length) {
            this.$store.dispatch('cabs/loadCabs');
            this.$store.dispatch('cabs/closeDialog', 'updateCabsList');
          }
        });
      });
    }
  }
};
</script>