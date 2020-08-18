<template>
  <v-dialog
    :value="dialogs.edit"
    persistent
    fullscreen
  >
    <v-card :loading="loading.editDialog">
      <v-toolbar
        color="primary"
      >
        <v-btn
          icon
          @click="$store.dispatch('accounts/closeDialog', 'edit')"
        >
          <v-icon>fas fa-times</v-icon>
        </v-btn>
        <v-toolbar-title>{{ $t('dialogs.accounts.edit.title', {accountName: account.name}) }}</v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-btn
            text
            :disabled="!validation.state"
            @click="saveAccount"
          >
            {{ $t('common.save') }}
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <dialog-form
          edit
          :account="account"
          @change="newAccount = $event"
          @validation-changed="validation.state = $event"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapGetters} from 'vuex';
    
import DialogForm   from './AccountsDialogForm';

export default {
  name: 'AccountsSingleEditDialog',

  components: {
    DialogForm
  },

  computed: {
    ...mapGetters({
      dialogs: 'accounts/dialogs',
      loading: 'accounts/loading',
      account: 'accounts/forEdit'
    })
  },

  data() {
    return {
      validation: {
        state: false,
      },
      newAccount: {},
    };
  },

  methods: {
    saveAccount() {
      this.$store.dispatch('accounts/saveAccount', this.newAccount);
    }
  }
};
</script>