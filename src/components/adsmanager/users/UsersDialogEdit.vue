<template>
  <div>
    <v-dialog
      :value="dialogs.edit"
      persistent
      max-width="400"
    >
      <v-card :loading="loading.editDialog">
        <v-card-title>
          {{ $t('adsmanager.users.edit') }}
          [{{ userForEdit.display_name || userForEdit.login }}]
        </v-card-title>
        <v-card-text>
          <dialog-form 
            :user="userForEdit"
            :new-user="false"
            @change="newUser = $event"
            @new-password="newPassword = $event"
            @change-password="changePassword = $event"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            color="primary"
            @click="$store.dispatch('users/closeDialog', 'edit')"
          >
            {{ $t('common.close') }}
          </v-btn>
          
          <v-btn
            text
            color="primary"
            :disabled="disableSaveButton"
            @click="saveUser"
          >
            {{ $t('common.save') }}
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
  name: 'UsersDialogEdit',

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
      userForEdit: 'users/forEdit'
    }),

    disableSaveButton() {
      if (this.changePassword) {
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
        if(this.newUser) {
          this.newUser.password = this.newPassword.password || '';
        }
      }
    },

    changePassword(newVal) {
      if (newVal === false) {
        if (this.newUser) {
          this.newUser.password = null;
        }
        
      }
    }
  },

  created() {
    this.newUser = {...this.userForEdit};
  },

  methods: {
    async saveUser() {
      // this.newUser.id = this.userForEdit.id;
      const result = await this.$store.dispatch('users/saveUser', this.newUser);
      if (result) {
        this.$store.dispatch('users/closeDialog', 'edit');
      }
    }
  }
};
</script>