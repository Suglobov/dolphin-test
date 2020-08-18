<template>
  <v-dialog
    :value="true"
    max-width="400px"
    scrollable
    persistent
  >
    <v-card :loading="false">
      <v-card-title>
        <div style="display: flex; justify-content: space-between; width: 100%;">
          <div>
            <span class="headline">
              {{ $t('dialogs.proxy.edit.title') }}
            </span>
          </div>
        </div>
      </v-card-title>
      <v-card-text style="max-height: 700px;">
        <v-container>
          <v-row>
            <!-- НАЗВАНИЕ -->
            <v-col
              cols="12"
            >
              <v-text-field
                v-model="newProxy.name"
                :label="$t('common.name')"
                dense
              />
            </v-col>

            <!-- ТИП -->
            <v-col cols="12">
              <v-autocomplete
                v-model="newProxy.type"
                dense
                :label="$t('common.type')"
                :items="['http', 'socks4', 'socks5']"
                :item-text="item => item.toString().toUpperCase()"
              />
            </v-col>

            <!-- ХОСТ -->
            <v-col
              cols="12"
            >
              <v-text-field
                v-model="newProxy.ip"
                :label="$t('common.host')"
                dense
              />
            </v-col>

            <!-- ПОРТ -->
            <v-col
              cols="12"
            >
              <v-text-field
                v-model="newProxy.port"
                :label="$t('common.port')"
                dense
              />
            </v-col>

            <!-- ЛОГИН -->
            <v-col
              cols="12"
            >
              <v-text-field
                v-model="newProxy.login"
                :label="$t('common.login')"
                dense
              />
            </v-col>

            <!-- ПАРОЛЬ -->
            <v-col
              cols="12"
            >
              <v-text-field
                v-model="newProxy.password"
                :label="$t('common.password')"
                dense
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="blue darken-1"
          text
          @click="$store.dispatch('proxy/closeDialog', 'edit')"
        >
          {{ $t('common.close') }}
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="$store.dispatch('proxy/saveProxy', newProxy); $store.dispatch('proxy/closeDialog', 'edit')"
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
  name: 'ProxyDialogEdit',

  data() {
    return {
      newProxy: {}
    };
  },

  computed: {
    ...mapGetters({
      proxy: 'proxy/forEdit'
    })
  },

  created() {
    this.newProxy = {...this.proxy};
  }
};
</script>