<template>
  <div>
    <!-- МАССОВЫЕ ДЕЙСТВИЯ - НАЗНАЧИТЬ ТЕГИ -->
    <div style="float: left;">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            small
            :disabled="accounts.selected.length === 0"
            color="primary"
            text
            style="min-width: 0; width: 30px; margin-top: 1px;"
            @click="$store.dispatch('accounts/openDialog', 'multipleAssignTags')"
            v-on="on"
          >
            <v-icon :size="12">
              fas fa-tags
            </v-icon>
          </v-btn>
        </template>
        <span>{{ $t('common.tags') }}</span>
      </v-tooltip>
    </div>
 
    <!-- МАССОВЫЕ ДЕЙСТВИЯ - ПОДЕЛИТЬСЯ -->
    <div style="float: left;">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            small
            :disabled="accounts.selected.length === 0"
            color="primary"
            text
            style="min-width: 0; width: 30px; margin-top: 1px;"
            @click="$store.dispatch('accounts/openDialog', 'multipleShare')"
            v-on="on"
          >
            <v-icon :size="12">
              fas fa-share-alt
            </v-icon>
          </v-btn>
        </template>
        <span>{{ $t('common.share') }}</span>
      </v-tooltip>
    </div>

    <!-- МАССОВЫЕ ДЕЙСТВИЯ - ПРОВЕРИТЬ ТОКЕН -->
    <div style="float: left;">
      <multiple-tokens-check />
    </div>
    <!-- МАССОВЫЕ ДЕЙСТВИЯ - УДАЛИТЬ -->
    <div style="float: left;">
      <multiple-delete />
    </div>

    <!-- МАССОВЫЕ ДЕЙСТВИЯ - СОЗДАТЬ ФП -->
    <div
      style="float: left;"
    >
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            small
            :disabled="accounts.selected.length === 0"
            color="primary"
            text
            style="min-width: 0; width: 30px; margin-top: 1px;"
            v-on="on"
            @click="$store.dispatch('accounts/openDialog', 'createFanPage')"
          >
            <v-icon :size="13">
              far fa-file-alt
            </v-icon>
          </v-btn>
        </template>
        <span>{{ $t('common.createFanPage') }}</span>
      </v-tooltip>
    </div>

    <!-- МАССОВЫЕ ДЕЙСТВИЯ - СОЗДАТЬ БМ -->
    <div
      style="float: left;"
    >
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            small
            :disabled="accounts.selected.length === 0"
            color="primary"
            text
            style="min-width: 0; width: 30px; margin-top: 1px;"
            v-on="on"
            @click="$store.dispatch('accounts/openDialog', 'createBm')"
          >
            <v-icon :size="13">
              fas fa-briefcase
            </v-icon>
          </v-btn>
        </template>
        <span>{{ $t('common.createBm') }}</span>
      </v-tooltip>
    </div>
    
    <!-- МАССОВЫЕ ДЕЙСТВИЯ - ПРИНЯТЬ ПРАВИЛА -->
    <div
      style="float: left;"
    >
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            small
            :disabled="accounts.selected.length === 0"
            color="primary"
            text
            style="min-width: 0; width: 30px; margin-top: 1px;"
            v-on="on"
            @click="$store.dispatch('accounts/openDialog', 'acceptRules')"
          >
            <v-icon :size="13">
              fas fa-check-double
            </v-icon>
          </v-btn>
        </template>
        <span>{{ $t('common.acceptRules') }}</span>
      </v-tooltip>
    </div>

    <!-- МАССОВЫЕ ДЕЙСТВИЯ - СОЗДАТЬ ЛИЧНЫЙ КАБИНЕТ -->
    <div
      style="float: left;"
    >
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            small
            :disabled="accounts.selected.length === 0"
            color="primary"
            text
            style="min-width: 0; width: 30px; margin-top: 1px;"
            v-on="on"
            @click="$store.dispatch('accounts/openDialog', 'initPersonalCab')"
          >
            <v-icon :size="13">
              fas fa-cube
            </v-icon>
          </v-btn>
        </template>
        <span>{{ $t('adsmanager.accounts.initPersonalCab.actionText') }}</span>
      </v-tooltip>
    </div>

    <!-- МАССОВЫЕ ДЕЙСТВИЯ - ИНДИКАТОР -->
    <div style="float: left;">
      <div
        class="body-2 ml-3"
        :style="{color: accounts.selected.length > 0 ? '' : 'gray', paddingTop: '5px'}"
      >
        {{ $t('common.selected') }}: {{ accounts.selected.length }}
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters}         from 'vuex';

import MultipleDelete       from './AccountsMultipleDelete';
import MultipleTokensCheck  from './AccountsMultipleTokensCheck';

export default {
  name: 'AccountsTopbarActions',

  components: {
    MultipleTokensCheck,
    MultipleDelete
  },

  computed: {
    ...mapGetters({
      accounts: 'accounts/ACCOUNTS',
      profile: 'main/profile'
    })
  }
};
</script>