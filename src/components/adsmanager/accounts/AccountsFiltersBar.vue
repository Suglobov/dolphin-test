<template>
  <v-navigation-drawer
    :value="show"
    temporary
    right
    absolute
    style="z-index: 9999; width: 400px;"
    @transitionend="$emit('close')"
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
            @click="$emit('close')"
          >
            <v-icon>keyboard_arrow_right</v-icon>
          </v-btn>
        </span>
        <span class="title">
          {{ $t('common.filters') }}
        </span>
      </div>

      <!-- ФИЛЬТР ПО СТАТУСУ -->
      <v-row>
        <v-col
          cols="12"
          class="py-0 my-2"
        >
          <v-combobox
            :label="$t('filters.status')"
            :items="accountsStatuses"
            :value="filters.statuses"
            multiple
            chips
            deletable-chips
            clearable
            dense
            small-chips
            single-line
            solo
            prepend-inner-icon="fas fa-code"
            hide-details
            @change="filterStatus"
          />
        </v-col>
        <v-col
          cols="12"
          class="py-0 my-2"
        >
          <filters-tags @filtered="$store.dispatch('accounts/clearSelected')" />
        </v-col>
      </v-row>

      <!-- ФИЛЬТР ПО ТЕГАМ -->
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters }       from 'vuex';

import accountsStatuses     from '../../../constants/accounts/accounts-statuses';    
import FiltersTags          from '../filters/AdsManagerFiltersTags';

export default {
  name: 'AccountsFiltersBar',

  components: {
    FiltersTags,
  },

  props: {
    show: {
      type: Boolean,
      default: false,
    }
  },

  data() {
    return {
      accountsStatuses
    };
  },

  computed: {
    ...mapGetters({
      accounts: 'accounts/ACCOUNTS',
      filters: 'accounts/FILTERS',
      tags: 'tags/tags',
    })
  },

  methods: {
    async filterStatus(statuses) {
      if (statuses) this.$store.dispatch('accounts/clearSelected');
      await this.$store.dispatch('accounts/setFiltersStatuses', statuses.map(status => {
        if (typeof status.value !== 'undefined') return status.value;
        return status;
      }));
      this.$store.dispatch('accounts/loadStat');
    }
  }
};
</script>