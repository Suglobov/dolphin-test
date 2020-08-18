<template>
  <div>
    <!-- ЛОГИН -->
    <v-row class="mt-3">
      <v-col
        col="12"
      >
        <v-text-field
          v-model="newUserData.login"
          dense
          :label="$t('common.login')"
          required
          hide-details
        />
      </v-col>
    </v-row>

    <!-- ОТОБРАЖАЕМОЕ ИМЯ -->
    <v-row class="mb-5">
      <v-col>
        <v-text-field
          v-model="newUserData.display_name"
          dense
          :label="`${$t('common.displayName')} (${$t('common.optional').toLowerCase()})`"
          required
          hide-details
        />
      </v-col>
    </v-row>

    <!-- РОЛЬ -->
    <v-row v-if="profile.role_id === 1 && profile.id !== newUserData.id">
      <v-col>
        <v-combobox
          :label="$t('common.role')"
          :items="roles"
          item-value="id"
          item-text="name"
          dense
          :value="newUserData.role_id"
          :menu-props="{closeOnClick: true, closeOnContentClick: true}"
          hide-details
          @change="newUserData.role_id = $event.id"
        >
          <template v-slot:selection="{item}">
            <span v-if="item.name || false">
              {{ item.name }}
            </span>
            <span v-else>
              {{ roles.find(role => role.id === item).name }}
            </span>
          </template> 
        </v-combobox>
      </v-col>
    </v-row>

    <!-- ТИМЛИД ДЛЯ БАЕРА -->
    <v-row v-if="newUserData.role_id === 2">
      <v-col>
        <v-combobox
          :label="`${$t('adsmanager.users.roles.teamlead')} (${$t('common.optional').toLowerCase()})`"
          :items="users.all"
          item-value="id"
          :item-text="item => item.display_name || item.login"
          :value="newUserData.teamlead_id"
          clearable
          dense
          hide-details
          @change="newUserData.teamlead_id = $event ? $event.id : null"
        >
          <template v-slot:selection="{item}">
            <span v-if="item.display_name || item.login || false">
              {{ item.display_name || item.login }}
            </span>
            <span v-else>
              {{ 
                users.all.find(user => user.id === item).display_name || 
                  users.all.find(user => user.id === item).login 
              }}
            </span>
          </template> 
        </v-combobox>
      </v-col>
    </v-row>

    <!-- ПАРОЛЬ ДЛЯ НОВОГО ПОЛЬЗОВАТЕЛЯ -->
    <v-row
      v-if="newUser"
      class="mt-5"
    >
      <v-col>
        <v-text-field
          v-model="newPassword.password"
          dense
          :label="$t('common.newPassword')"
          hide-details
        />
      </v-col>
    </v-row>

    <v-row v-if="newUser">
      <v-col>
        <v-text-field
          v-model="newPassword.confirmPassword"
          dense
          :label="$t('common.confirmPassword')"
          hide-details
        />
      </v-col>
    </v-row>

    <!-- СМЕНА ПАРОЛЯ ДЛЯ СУЩЕСТВУЮЩЕГО ПОЛЬЗОВАТЕЛЯ -->
    <v-row
      v-if="!newUser"
      class="mt-5"
    >
      <v-col>
        <v-switch
          v-model="changePassword"
          class="my-0 py-0"
          dense
          :label="$t('common.changePassword')"
        />
      </v-col>
    </v-row>

    <v-row v-if="changePassword">
      <v-col>
        <v-text-field
          v-model="newPassword.password"
          dense
          :label="$t('common.newPassword')"
        />
      </v-col>
    </v-row>

    <v-row v-if="changePassword">
      <v-col>
        <v-text-field
          v-model="newPassword.confirmPassword"
          dense
          :label="$t('common.confirmPassword')"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

import roles        from '../../../constants/users/roles';

export default {
  name: 'UsersDialogForm',

  props: {
    user: {
      type: Object,
      default: () => ({
        login: '',
        display_name: '',
        role_id: 2,
        role_name: '',
        teamlead_id: null,
        password: '',
      })
    },
    newUser: {
      type: Boolean,
      default: true,
    }
  },

  data() {
    return {
      roles,
      changePassword: false,
      newPassword: {
        password: '',
        confirmPassword: '',
      },
      newUserData: {}
    };
  },

  computed: {
    ...mapGetters({
      users: 'users/users',
      profile: 'main/profile'
    })
  },

  watch: {
    newUserData: {
      deep: true,
      handler() {
        this.$emit('change', this.newUserData);
      }
    },

    newPassword: {
      deep: true,
      handler() {
        this.$emit('new-password', this.newPassword);
      }
    },

    changePassword() {
      this.$emit('change-password', this.changePassword);
    }
  },

  created() {
    this.translateRoles();
    this.$store.dispatch('users/loadUsers');
    this.newUserData = {...this.user};
  },

  methods: {
    translateRoles() {
      this.roles = this.roles.map(role => {
        return {
          id: role.id,
          name: this.$t(`adsmanager.users.roles.${role.name}`)
            ? this.$t(`adsmanager.users.roles.${role.name}`)
            : role.name
        };
      });
    }
  }
};
</script>