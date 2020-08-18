<template>
  <div class="my-2">
    <div>
      <div>
        <v-icon
          :size="12"
          style="cursor: pointer; margin-right: 4px;"
          :title="$t('common.fbApiLog')"
          @click="loadLog(account)"
        >
          fas fa-book
        </v-icon>
        <span
          style="cursor: pointer;"
          @click="editAccount(account)"
        >
          {{ account.name }}
        </span>
      </div>
      <div
        v-if="!account.fb_id"
        style="width: 90%; margin-top: 4px;"
      >
        <v-alert
          text
          color="error"
          style="padding: 0 5px; font-size: 10px; line-height: 17px;"
        >
          {{ $t('adsmanager.accounts.noFacebookId') }} 
          <a
            style="font-size: 10px;"
            @click="$store.dispatch('accounts/openDialog', 'noFacebookIdInfo')"
          >
            {{ $t('common.whatsThat') }}
          </a>
        </v-alert>
      </div>
      <div style="font-size: 11px; color: gray;">
        <span
          class="d-block"
          style="line-height: 14px;"
        >
          {{ $t('common.owner') }}:
          {{ 
            account.user 
              ? account.user.display_name ? account.user.display_name : account.user.login
              : '-'
          }}
        </span>

        <span
          class="d-block"
          style="line-height: 14px;"
        >
          {{ $t('adsmanager.accounts.rulesAccepted') }}:
          <v-icon
            v-if="account.rules_accepted"
            :size="12"
            color="success"
          >
            fas fa-check
          </v-icon>
          <v-icon
            v-else
            :size="12"
            color="error"
          >
            fas fa-times
          </v-icon>
        </span>
      </div>
      <div
        v-if="account.permissions"
        class="caption"
      >
        <a @click="showPermissions">
          {{ $t('adsmanager.accounts.shared').toLowerCase() }} ({{ account.permissions.length }})
        </a>
      </div>
    </div>
    <account-tags :account="account" />
  </div>
</template>

<script>
import AccountTags                      from './AccountsMainTableTags';

export default {
  name: 'AccountsMainTableInfo',

  components: {
    AccountTags,
  },

  props: {
    account: {
      type: Object,
      default: () => ({})
    }
  },

  methods: {
    editAccount(account) {
      console.log(JSON.stringify(account));
      
      this.$store.dispatch('accounts/initAccountForEdit', account);
    },

    async loadLog(account) {
      this.$store.dispatch('fbApiLog/clearLog');
      this.$store.dispatch('fbApiLog/openDialog', 'logSidebar');
      this.$store.dispatch('fbApiLog/loadLog', [{object: 'account_id', id: account.id}]);
    },  

    async showPermissions() {
      await this.$store.dispatch('accounts/setForPermissions', this.account);
      await this.$store.dispatch('accounts/openDialog', 'permissions');
    }
  }
};
</script>