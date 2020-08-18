<template>
  <v-tabs
    centered
    grow
    :value="activeTab.tab"
    :height="32"
    @change="changeTab"
  >
    <!-- ПОЛЬЗОВАТЕЛИ -->
    <v-tab key="tab-users">
      <v-badge
        color="red"
        inline
        tile
        :content="users.selected.length"
        :value="users.selected.length"
      >
        <template #badge>
          {{ users.selected.length }}
          <!-- <v-icon
            style="margin-top: -2px;"
            @click="clickedOnClear = true; $store.dispatch('users/clearSelected')"
          >
            close
          </v-icon> -->
        </template>
        {{ $t('adsmanager.tabs.users') }}
      </v-badge>
    </v-tab>
    <!-- <v-tab key="tab-tags">
      {{ $t('adsmanager.tabs.tags') }}
    </v-tab> -->

    <!-- АККАУНТЫ -->
    <v-tab key="tab-accounts">
      <v-badge
        color="red"
        inline
        tile
        :content="accounts.selected.length"
        :value="accounts.selected.length"
      >
        <template #badge>
          {{ accounts.selected.length }}
          <!-- <v-icon style="margin-top: -2px;">
            close
          </v-icon> -->
        </template>
        {{ $t('adsmanager.tabs.accounts') }}
      </v-badge>
    </v-tab>

    <!-- ДАТЫ -->
    <v-tab key="tab-dates">
      {{ $t('adsmanager.tabs.dates') }}
    </v-tab>
    
    <!-- <v-tab key="tab-bms">
      {{ $t('adsmanager.tabs.bms') }}
    </v-tab> -->

    <!-- БМ -->
    <v-tab key="tab-bms">
      <v-badge
        color="red"
        inline
        tile
        :content="bms.selected.length"
        :value="bms.selected.length"
      >
        <template #badge>
          {{ bms.selected.length }}
          <!-- <v-icon
            style="margin-top: -2px;"
            @click="clickedOnClear = true; $store.dispatch('users/clearSelected')"
          >
            close
          </v-icon> -->
        </template>
        {{ $t('adsmanager.tabs.bms') }}
      </v-badge>
    </v-tab>

    <!-- КАБИНЕТЫ -->
    <v-tab key="tab-cabs">
      <v-badge
        color="red"
        inline
        tile
        :content="cabs.selected.length"
        :value="cabs.selected.length"
      >
        <template #badge>
          {{ cabs.selected.length }}
          <!-- <v-icon
            style="margin-top: -2px;"
            @click="clickedOnClear = true; $store.dispatch('users/clearSelected')"
          >
            close
          </v-icon> -->
        </template>
        {{ $t('adsmanager.tabs.cabs') }}
      </v-badge>
    </v-tab>

    <!-- КАМПАНИИ -->
    <v-tab key="tab-campaigns">
      <v-badge
        color="red"
        inline
        tile
        :content="campaigns.selected.length"
        :value="campaigns.selected.length"
      >
        <template #badge>
          {{ campaigns.selected.length }}
          <!-- <v-icon
            style="margin-top: -2px;"
            @click="clickedOnClear = true; $store.dispatch('users/clearSelected')"
          >
            close
          </v-icon> -->
        </template>
        {{ $t('adsmanager.tabs.campaigns') }}
      </v-badge>
    </v-tab>

    <!-- АДСЕТЫ -->
    <v-tab key="tab-adsets">
      <v-badge
        color="red"
        inline
        tile
        :content="adsets.selected.length"
        :value="adsets.selected.length"
      >
        <template #badge>
          {{ adsets.selected.length }}
          <!-- <v-icon
            style="margin-top: -2px;"
            @click="clickedOnClear = true; $store.dispatch('users/clearSelected')"
          >
            close
          </v-icon> -->
        </template>
        {{ $t('adsmanager.tabs.adsets') }}
      </v-badge>
    </v-tab>

    <!-- ОБЪЯВЛЕНИЯ -->
    <v-tab key="tab-ads">
      <v-badge
        color="red"
        inline
        tile
        :content="ads.selected.length"
        :value="ads.selected.length"
      >
        <template #badge>
          {{ ads.selected.length }}
          <!-- <v-icon
            style="margin-top: -2px;"
            @click="clickedOnClear = true; $store.dispatch('users/clearSelected')"
          >
            close
          </v-icon> -->
        </template>
        {{ $t('adsmanager.tabs.ads') }}
      </v-badge>
    </v-tab>
  </v-tabs>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'AdsManagerTabs',

  data: () => ({
    tabs: ['users', 'accounts', 'dates', 'bms', 'cabs',  'campaigns', 'adsets', 'ads'],
    clickedOnClear: false,
  }),

  computed: {
    ...mapGetters({
      activeTab: 'adsmanager/activeTab',
      users: 'users/users',
      accounts: 'accounts/ACCOUNTS',
      bms: 'bms/bms',
      cabs: 'cabs/cabs',
      campaigns: 'campaigns/campaigns',
      adsets: 'adsets/adsets',
      ads: 'ads/ads',
    })
  },

  methods: {
    changeTab(tab) {
      if( !this.clickedOnClear) {
        this.$store.dispatch('adsmanager/setActiveTab', {
          tab: tab,
          component: this.tabs[tab]
        });
      }
    }
  }
};
</script>