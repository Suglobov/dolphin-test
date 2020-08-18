<template>
  <v-navigation-drawer
    :value="dialogs.permissions"
    temporary
    right
    absolute
    style="z-index: 9999; width: 400px;"
    @transitionend="$store.dispatch('accounts/closeDialog', 'permissions')"
  >
    <div style="padding: 16px">
      <div class="mb-3">
        <span>
          <v-btn
            color="grey"
            fab
            x-small
            outlined
            class="sidebar-collapse-button"
            @click="$store.dispatch('accounts/closeDialog', 'permissions')"
          >
            <v-icon>keyboard_arrow_right</v-icon>
          </v-btn>
        </span>
        <span class="title">
          [{{ account.name }}] {{ $t('common.permissions').toLowerCase() }}
        </span>
      </div>

      <!-- ФИЛЬТР ПО СТАТУСУ -->
      <v-row>
        <v-col
          v-if="permissions"
          cols="12"
          class="py-0 my-2"
        >
          <div
            v-for="(permissionsArray, username) in permissions"
            :key="`permissions-${username}`"
            class="mb-5"
          >
            <span class="headline">
              {{ username }}
            </span>

            <div v-if="permissionsArray">
              <div
                v-for="permission in permissionsArray"
                :key="`permission-of-${username}-${permission}`"
                class="pl-3"
              >
                <!-- ИКОНКА - ПРОСМОТР -->
                <v-icon
                  v-if="permission.search('view') > -1"
                  size="16"
                  style="width: 32px;"
                >
                  fas fa-eye
                </v-icon>

                <!-- ИКОНКА - ДЕЙСТВИЯ -->
                <v-icon
                  v-if="permission.search('actions') > -1"
                  size="16"
                  style="width: 32px;"
                >
                  fas fa-bolt
                </v-icon>

                <!-- ИКОНКА - ПРОСМОТР СТАТИСТИКИ -->
                <v-icon
                  v-if="permission.search('stat') > -1"
                  size="16"
                  style="width: 32px;"
                >
                  fas fa-chart-bar
                </v-icon>

                <!-- ИКОНКА - РАЗДАВАТЬ -->
                <v-icon
                  v-if="permission.search('share') > -1"
                  size="16"
                  style="width: 32px;"
                >
                  fas fa-share-alt
                </v-icon>

                {{ $t(`dialogs.accounts.share.permissions.${permission}`) }}
              </div>
            </div>
          </div>
        </v-col>
      </v-row>

      <!-- ФИЛЬТР ПО ТЕГАМ -->
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters }       from 'vuex';

export default {
  name: 'AccountsPermissionsSidebar',

  data() {
    return {
      permissions: {}
    };
  },

  computed: {
    ...mapGetters({
      dialogs: 'accounts/dialogs',
      account: 'accounts/forPermissions',
      users: 'users/users'
    })
  },

  watch: {
    users: {
      deep: true,
      handler() {
        this.parsePermissions();
      }
    }
  },

  async created() {
    await this.$store.dispatch('users/loadUsers');
  },

  methods: {
    parsePermissions() {
      if (!this.account.permissions) return;
      if (!this.users.all) return;

      this.permission = {};
      
      this.account.permissions.forEach(rawPermission => {
        let userId, permission;
        [userId, permission] = rawPermission.split('-');

        const user = this.users.all.find(u => u.id === parseInt(userId));
        if (!user) return;
        
        const username = user.display_name || user.login;
        
        if (typeof this.permissions[username] !== 'undefined') {
          if (this.permissions[username].indexOf(permission) === -1) {
            this.permissions[username].push(permission);
          }
        } else {
          this.permissions[username] = [permission];
        }

        this.$forceUpdate();
      });
    }
  }
};
</script>