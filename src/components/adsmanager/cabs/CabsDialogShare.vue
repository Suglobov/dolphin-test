<template>
  <v-dialog
    :value="dialogs.share"
    max-width="500px"
    scrollable
    persistent
  >
    <v-card :loading="loading.share">
      <!-- ЗАГОЛОВОК -->
      <v-card-title>
        <span class="headline">
          {{ $t('dialogs.share.title') }}
        </span>
      </v-card-title>

      <!-- ОКНО -->
      <v-card-text style="max-height: 700px;">
        <v-container>
          <v-row>
            <v-col
              cols="12"
            >
              <div>
                <!-- ВЫБРАТЬ ВСЕ -->
                <v-btn
                  color="primary"
                  x-small
                  style="margin-left: 0px;"
                  class="my-1"
                  outlined
                  @click="selectAll"
                >
                  {{ $t('common.selectAll') }}
                </v-btn>

                <!-- УБРАТЬ ВСЕ -->
                <v-btn
                  color="primary"
                  x-small
                  style="margin-left: 0px;"
                  class="my-1 ml-1"
                  outlined
                  @click="unselectAll"
                >
                  {{ $t('common.unselectAll') }}
                </v-btn>
              </div>

              <!-- ДЕРЕВО ПОЛЬЗОВАТЕЛЕЙ -->
              <v-treeview
                v-model="permissions"
                selectable
                dense
                open-on-click
                selected-color="primary"
                :items="items"
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

                  <!-- ИКОНКА - ДЕЙСТВИЯ -->
                  <v-icon
                    v-if="item.id.search('actions') !== -1"
                    size="16"
                    class="d-block text-center"
                  >
                    fas fa-bolt
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

              <!-- ВЫБОР РЕЖИМА -->
              <div>
                <v-radio-group
                  v-model="mode"
                  row
                  dense
                  style="margin-top: 0px;"
                  hide-details
                  class="mt-3"
                >
                  <v-radio
                    :label="$t('dialogs.share.addPermissions')"
                    :value="1"
                  />
                  <v-radio
                    :label="$t('dialogs.share.removePermissions')"
                    :value="-1"
                  />
                </v-radio-group>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="blue darken-1"
          text
          @click="$store.dispatch('cabs/closeDialog', 'share')"
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
  name: 'CabsDialogShare',

  data: () => ({
    permissions: [],
    mode: 1,
    allItems: [],
  }),

  computed: {
    ...mapGetters({
      cabs: 'cabs/selected',
      users: 'users/allUsers',
      dialogs: 'cabs/dialogs',
      loading: 'cabs/loading',
      profile: 'main/profile',
    }),

    items() {
      let items = [];

      this.users.forEach(user =>  {
        if (user.id === this.profile.id) return;
        let item = {
          id: 'user-' + user.id,
          name: user.display_name !== null ? user.display_name : user.login
        };
        item.children = [
          { id: `${user.id}-stat`, name: this.$t('dialogs.accounts.share.permissions.stat') },
          { id: `${user.id}-actions`, name: this.$t('dialogs.accounts.share.permissions.actions') },
          { id: `${user.id}-share`, name: this.$t('dialogs.accounts.share.permissions.share') },
        ];

        this.allItems = this.allItems.concat(item.children.map(child => child.id));

        items.push(item);
      });

      return items;
    }
  },

  created() {
    this.$store.dispatch('users/loadUsers');
  },
        
  methods: {
    async savePermissions() {
      const success = await this.$store.dispatch('cabs/savePermissions', {
        ids: this.cabs.map(cab => cab.id),
        permissions: this.permissions,
        mode: this.mode,
      });
      if (success) {
        this.$store.dispatch('cabs/closeDialog', 'share');
      }
    },

    selectAll() {
      this.permissions = [];
      this.permissions = this.permissions.concat(this.allItems);
    },

    unselectAll() {
      this.permissions = [];
    }
  }
};
</script>