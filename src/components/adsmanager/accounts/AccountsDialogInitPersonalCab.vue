<template>
  <div>
    <!-- МОДАЛЬНОЕ ОКНО -->
    <v-dialog
      v-if="showModal"
      :value="dialogs.initPersonalCab"
      persistent
      fullscreen
    >
      <v-card>
        <v-toolbar
          color="primary"
        >
          <!-- КНОПКА ЗАКРЫТЬ -->
          <v-btn
            icon
            @click="$store.dispatch('accounts/closeDialog', 'initPersonalCab')"
          >
            <v-icon>fas fa-times</v-icon>
          </v-btn>

          <!-- ЗАГОЛОВОК -->
          <v-toolbar-title>
            {{ $t('adsmanager.accounts.initPersonalCab.actionText') }}
          </v-toolbar-title>
          <v-spacer />
        </v-toolbar>

        <!-- ОСНОВНОЙ КОНТЕЙНЕР -->
        <v-card-text>
          <v-list-item
            v-for="account in accounts.selected"
            :key="`persona-cab-for-${account.id}`"
            two-line
          >
            <v-list-item-content>
              <v-list-item-title>
                <v-progress-circular
                  v-if="typeof responses[account.id] === 'undefined'"
                  :size="16"
                  indeterminate
                  color="primary"
                />
                <span v-if="typeof responses[account.id] !== 'undefined' && typeof responses[account.id].result !== 'undefined' && responses[account.id].result">
                  ✅
                </span>
                <span v-if="typeof responses[account.id] !== 'undefined' && typeof responses[account.id].result !== 'undefined' && !responses[account.id].result">
                  ❌
                </span>
                {{ account.name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                <span
                  v-if="typeof responses[account.id] !== 'undefined' && typeof responses[account.id].result !== 'undefined' && !responses[account.id].result"
                  style="color: #FF5252;"
                >
                  {{ responses[account.id].response.error.message }}
                </span>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapGetters}   from 'vuex';
    
export default {
  name: 'AccountsDialogInitPersonalAccount',

  data() {
    return {
      showModal: true,
      responses: {}
    };
  },

  computed: {
    ...mapGetters({
      accounts: 'accounts/ACCOUNTS',
      dialogs: 'accounts/dialogs',
    })
  },

  created() {
    if (confirm(this.$t('common.confirmPlease'))) {
      this.showModal = true;
      this.loading = true;
      this.initPersonalCabs();
    } else {
      this.$store.dispatch('accounts/closeDialog', 'initPersonalCab');
    }
  },

  methods: {
    initPersonalCabs() {
      this.accounts.selected.forEach(account => {
        this.api(`/accounts/init_personal_cab/${account.id}`)
          .then(response => {
            if (
              typeof response.data.data !== 'undefined' &&
            typeof response.data.data.response !== 'undefined'
            ) {
              this.$set(this.responses, account.id, response.data.data);
            } else {
              this.$set(this.responses, account.id, -1);
            }
          }).catch(() => {
            this.$set(this.responses, account.id, -1);
          });
      });
    }
  }

};
</script>