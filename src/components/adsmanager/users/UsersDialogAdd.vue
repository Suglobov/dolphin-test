<template>
  <div>
    <v-dialog
      :value="dialogs.add"
      persistent
      max-width="400"
    >
      <v-card :loading="loading.addDialog">
        <v-card-title>
          {{ $t('adsmanager.users.add') }}
        </v-card-title>
        <v-card-text>
          <dialog-form 
            @change="newUser = $event"
            @new-password="newPassword = $event"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            color="primary"
            @click="$store.dispatch('users/closeDialog', 'add')"
          >
            {{ $t('common.close') }}
          </v-btn>
          
          <v-btn
            text
            color="primary"
            :disabled="disableSaveButton"
            @click="addUser"
          >
            {{ $t('common.add') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

import DialogForm   from './UsersDialogForm';

export default {
  name: 'UsersDialogAdd',

  components: {
    DialogForm
  },

  data() {
    return {
      newUser: {},
      changePassword: false,
      newPassword: {}
    };
  },

  computed: {
    ...mapGetters({
      dialogs: 'users/dialogs',
      loading: 'users/loading',
    }),

    disableSaveButton() {
      if (
        typeof this.newPassword.password === 'undefined' ||
        typeof this.newPassword.confirmPassword === 'undefined' ||
        this.newPassword.password.toString().length === 0
      ) {
        return true;
      } else {
        if (this.newPassword.password !== this.newPassword.confirmPassword){
          return true;
        }
      }

      if (
        typeof this.newUser.login === 'undefined' ||
          this.newUser.login.toString().length === 0
      ) return true;

      if (
        typeof this.newUser.role_id === 'undefined' ||
          !this.newUser.role_id
      ) return true;

      return false;
    }
  },

  watch: {
    newPassword: {
      deep: true,
      handler() {
        if(typeof this.newUser.password !== 'undefined') {
          this.newUser.password = this.newPassword.password || '';
        }
      }
    }
  },

  methods: {
    async addUser() {
      const result = await this.$store.dispatch('users/addUser', this.newUser);
      if (result) {
        this.$store.dispatch('main/loadProfile');
        this.$store.dispatch('users/closeDialog', 'add');
      }
    }
  }
};
</script>