<template>
  <div>
    <v-card>
      <v-card-text style="padding: 0px 8px 0px 8px">
        <!-- ТАБЛИЦА -->
        <v-data-table
          v-model="proxy.selected"
          :headers="cols"
          :items="proxy.filtered"
          :loading="loading.mainTable"
          :loading-text="$t('common.loading')"
          fixed-header
          :items-per-page="50"
          :footer-props="{'items-per-page-options': [10, 30, 50, 100, -1]}"
          :height="innerHeight - 50 - 48 - 4"
          show-select
        >
          <template #item.status="{item}">
            <v-chip
              v-if="item.status === 1"
              color="success"
              x-small
              label
              outlined
              style="font-weight: bold;"
            >
              {{ $t('proxy.active').toUpperCase() }}
            </v-chip>

            <v-chip
              v-if="item.status === -1"
              color="red"
              x-small
              label
              outlined
              style="font-weight: bold;"
            >
              {{ $t('proxy.error').toUpperCase() }}
            </v-chip>

            <v-chip
              v-if="item.status === 0"
              color="orange"
              x-small
              label
              outlined
              style="font-weight: bold;"
            >
              {{ $t('proxy.new').toUpperCase() }}
            </v-chip>
          </template>

          <template #item.type="{item}">
            {{ item.type.toUpperCase() }}
          </template>

          <template #item.host="{item}">
            {{ item.ip }}
          </template>

          <template #item.name="{item}">
            <div
              style="cursor: pointer;"
              @click="$store.dispatch('proxy/setForEdit', item); $store.dispatch('proxy/openDialog', 'edit');"
            >
              {{ item.name || $t('common.noName') }}
            </div>

            <div
              v-if="item.permissions"
              class="caption"
            >
              <a @click="$store.dispatch('proxy/setForPermissions', item); $store.dispatch('proxy/openDialog', 'permissions');">
                {{ $t('common.shared').toLowerCase() }} ({{ item.permissions.length }})
              </a>
            </div>
          </template>

          <template #item.last_check="{item}">
            <span v-if="item.last_check">
              {{ item.last_check }}
            </span>
            <span v-else>
              -
            </span>
          </template>

          <template #item.external_ip="{item}">
            <span v-if="item.external_ip">
              {{ item.external_ip }}
            </span>
            <span v-else>
              -
            </span>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';  

export default {
  name: 'ProxyMainTable',

  components: {
  },

  data() {
    return {
    };
  },

  computed: {
    ...mapGetters({
      proxy: 'proxy/proxy',
      loading: 'proxy/loading',
      innerHeight: 'main/innerHeight',
      profile: 'main/profile',
    }),
    cols() {
      let cols = [];

      cols.push({text: this.$t('common.id'), value: 'id', width: 48});
      cols.push({text: this.$t('common.name'), value: 'name'});
      cols.push({text: this.$t('common.type'), value: 'type'});
      cols.push({text: this.$t('common.host'), value: 'host'});
      cols.push({text: this.$t('common.port'), value: 'port'});
      cols.push({text: this.$t('common.login'), value: 'login'});
      cols.push({text: this.$t('common.password'), value: 'password'});
      cols.push({text: this.$t('common.externalIP'), value: 'external_ip'});
      cols.push({text: this.$t('proxy.accountsCount'), value: 'accounts_count', width: 100});
      cols.push({text: this.$t('common.status'), value: 'status'});
      cols.push({text: this.$t('proxy.lastCheck'), value: 'last_check'});

      return cols;
    }
  },

  watch: {
  },

  created() {
  },

  methods: {
  }
};
</script>