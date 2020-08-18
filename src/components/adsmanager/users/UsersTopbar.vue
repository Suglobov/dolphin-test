<template>
  <v-row class="topbar-row">
    <filters-bar
      v-if="showFilters"
      :show="showFilters"
      :active-filters-count="activeFiltersCount"
      @close="showFilters = false"
    />

    <!-- ЛЕВАЯ ЧАСТЬ -->
    <v-col
      :cols="12"
      :sm="9"
    >
      <div style="float: left">
        <topbar-actions />
      </div>

      <div style="float: right;">
        <!-- КНОПКИ ДЕЙСТВИЙ - ОБНОВИТЬ СТАТИСТИКУ -->
        <refresh />
          
        <!-- КНОПКИ ДЕЙСТВИЙ - СТОЛБЦЫ -->
        <div style="float: right;">
          <topbar-cols />
        </div>

        <!-- КНОПКИ ДЕЙСТВИЙ - ДОБАВИТЬ ПОЛЬЗОВАТЕЛЯ -->
        <div
          v-if="profile.role_id === 1"
          style="float: right;"
        >
          <v-btn
            small
            color="primary"
            text
            style="min-width: 0; margin-top: 1px;"
            class="ml-3"
            @click="$store.dispatch('users/openDialog', 'add')"
          >
            <v-icon :size="18">
              add
            </v-icon>

            {{ $t('adsmanager.users.add') }}
          </v-btn>
        </div>

        <div
          v-if="profile.role_id === 1"
          style="float: right;"
        >
          <div
            class="caption"
            :style="{paddingTop: '5px', color: usersAvailable > 0 ? '' : 'grey'}"
          >
            {{ $t('adsmanager.users.available') }}: {{ usersAvailable }}
          </div>
        </div>
      </div>
    </v-col>
    <!-- ПРАВАЯ ЧАСТЬ -->
    <v-col
      cols="12"
      sm="3"
    >
      <v-row>
        <!-- ФИЛЬТР ПО ДАТЕ -->
        <v-col
          cols="12"
          sm="12"
        >
          <filters-date />
        </v-col>

        <!-- ПОИСК ПО НАЗВАНИЮ -->
        <!-- <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            dense
            clearable
            solo
            :label="$t('filters.searchByName')"
            single-line
            prepend-inner-icon="fas fa-search"
            hide-details
            :value="filters.name"
            @input="filterName"
          />
        </v-col> -->
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import Refresh              from '@/components/adsmanager/AdsManagerRefresh';
import {mapGetters}         from 'vuex';

import TopbarCols           from '../AdsManagerTopbarCols';
import FiltersDate          from '../filters/AdsManagerFiltersDate';

import TopbarActions        from './UsersTopbarActions';

// import FiltersBar           from './CabsFiltersBar';
// import TopbarActions        from './CabsTopbarActions';

export default {
  name: 'UsersTopbar',

  components: {
    TopbarActions,
    TopbarCols,
    FiltersDate,
    Refresh
    // FiltersBar
  },

  data() {
    return {
      showFilters: false,
      nameSearchText: '',
    };
  },

  computed: {
    ...mapGetters({
      filters: 'cabs/filters',
      globalFilters: 'adsmanager/filters',
      profile: 'main/profile',
      users: 'users/users'
    }),

    usersAvailable() {
      if (
        this.profile &&
        typeof this.profile.max_users_count !== 'undefined' &&
        this.users &&
        typeof this.users.all !== 'undefined'
      ) {
        const usersCount = this.profile.max_users_count - this.users.all.length;
        
        return usersCount >= 0 ? usersCount : 0;
      } 
      return 0;
    },
      
    activeFiltersCount() {
      let count = 0;

      if (!this.filters) return 0;

      if (
        typeof this.filters.accountsStatuses !== 'undefined' &&
          this.filters.accountsStatuses.length > 0
      ) count++;
      if (
        typeof this.filters.cabsStatuses !== 'undefined' &&
          this.filters.cabsStatuses.length > 0
      ) count++;
      if (
        typeof this.filters.bms !== 'undefined' &&
          this.filters.bms.length > 0
      ) count++;
      if (
        typeof this.filters.tags !== 'undefined' &&
          this.filters.tags.length > 0
      ) count++;
      if (
        typeof this.filters.type!== 'undefined' &&
          this.filters.type !== 'all'
      ) count++;
      if (
        typeof this.filters.showArchived!== 'undefined' &&
          this.filters.showArchived
      ) count++;
      if (
        typeof this.filters.attachedCard !== 'undefined' &&
          this.filters.attachedCard !== 'all'
      ) count++;

      return count;
    }
  },

  methods: {
    filterName(name) {
      this.nameSearchText = name;
      setTimeout(async () => {
        if (name === this.nameSearchText) {
          await this.$store.dispatch('cabs/setSpecificFilter', {filter: 'name', data: name});
        }  
      }, 500);
    },
  }
};
</script>