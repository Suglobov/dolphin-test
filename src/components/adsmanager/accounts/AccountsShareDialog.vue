<template>
  <v-dialog
    :value="dialogs.share"
    max-width="500px"
    scrollable
    persistent
  >
    <v-card :loading="loading.share">
      <v-card-title>
        <span class="headline">
          {{ $t('dialogs.accounts.share.title', {accountName: account.name}) }}
        </span>
      </v-card-title>
      <v-card-text style="max-height: 700px;">
        <v-container>
          <v-row>
            <v-col
              cols="12"
            >
              <v-treeview
                v-model="newAccount.permissions"
                selectable
                dense
                open-on-click
                selected-color="primary"
                :items="items"
                :open.sync="openedItems"
              >
                <template v-slot:prepend="{ item }">
                  <!-- ИКОНКА - ПОЛЬЗОВАТЕЛЬ -->
                  <v-icon
                    v-if="item.id.search('user') !== -1"
                    size="16"
                    class="d-block text-center"
                  >
                    fas fa-user
                  </v-icon>

                  <!-- ИКОНКА - ПРОСМОТР -->
                  <v-icon
                    v-if="item.id.search('read') !== -1"
                    size="16"
                    class="d-block text-center"
                  >
                    fas fa-eye
                  </v-icon>

                  <!-- ИКОНКА - РЕДАКТИРОВАНИЕ -->
                  <v-icon
                    v-if="item.id.search('edit') !== -1"
                    size="16"
                    class="d-block text-center"
                  >
                    fas fa-pencil-alt
                  </v-icon>

                  <!-- ИКОНКА - ПРОСМОТР СТАТИСТИКИ -->
                  <v-icon
                    v-if="item.id.search('stat') !== -1"
                    size="16"
                    class="d-block text-center"
                  >
                    fas fa-chart-bar
                  </v-icon>

                  <!-- ИКОНКА - РАЗДАВАТЬ -->
                  <v-icon
                    v-if="item.id.search('share') !== -1"
                    size="16"
                    class="d-block text-center"
                  >
                    fas fa-share-alt
                  </v-icon>
                </template>
              </v-treeview>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="blue darken-1"
          text
          @click="$store.dispatch('accounts/closeDialog', 'share')"
        >
          {{ $t('common.close') }}
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="savePermissions"
        >
          {{ $t('common.save') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'AccountsShareDialog',

  data: () => ({
    newAccount: {
      permissions: [],
    },
  }),

  computed: {
    ...mapGetters({
      account: 'accounts/forShare',
      users: 'users/allUsers',
      dialogs: 'accounts/dialogs',
      loading: 'accounts/loading',
      profile: 'main/profile',
    }),

    openedItems() {
      let opened = [];

      this.users.forEach((user) =>  {
        if (user.id === this.profile.id) return;
        if (!Array.isArray(this.newAccount.permissions)) return false;
                
        const permission = this.newAccount.permissions.find(p => {
          return p.search(`${user.id}-`) === 0;
        });

        if (permission) {
          opened.push(`user-${user.id}`);
        }
      });

      return opened;
    },

    items() {
      let items = [];

      this.users.forEach(user =>  {
        if (user.id === this.profile.id) return;
        let item = {
          id: 'user-' + user.id,
          name: user.display_name !== null ? user.display_name : user.login
        };
        item.children = [
          { id: `${user.id}-read`, name: this.$t('dialogs.accounts.share.permissions.read') },
          { id: `${user.id}-edit`, name: this.$t('dialogs.accounts.share.permissions.edit') },
          { id: `${user.id}-stat`, name: this.$t('dialogs.accounts.share.permissions.stat') },
          { id: `${user.id}-share`, name: this.$t('dialogs.accounts.share.permissions.share') },
        ];

        items.push(item);
      });

      return items;
    }
  },
        
  created() {
    this.newAccount = {...this.account};
    if (!this.newAccount.permissions) this.newAccount.permissions = [];
    this.$store.dispatch('users/loadUsers');
  },
        
  methods: {
    async savePermissions() {
      const success = await this.$store.dispatch('accounts/savePermissions', this.newAccount);
      if (success) {
        this.$store.dispatch('accounts/closeDialog', 'share');
      }
    }
  }
};
</script>