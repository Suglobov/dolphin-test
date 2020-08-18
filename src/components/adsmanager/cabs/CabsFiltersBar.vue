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
      <div
        class="mb-3"
        style="display: flex; justify-content: space-between;"
      >
        <div>
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
        <div>
          <v-btn
            v-if="activeFiltersCount > 0"
            text
            color="primary"
            small
            style="margin-top: 3px;"
            @click="$store.dispatch('cabs/clearFilters')"
          >
            <v-icon
              class="mr-1"
              :size="18"
            >
              close
            </v-icon>
            {{ $t('common.clear') }}
          </v-btn>
        </div>
      </div>
      
      <v-row>
        <v-col
          cols="12"
          class="py-0 mt-2"
        >
          <!-- ФИЛЬТР ПО БМ -->
          <h5 class="mb-1">
            {{ $t('common.bm') }}
          </h5>
          <v-combobox
            :label="$t('common.bm')"
            :items="bms"
            item-value="id"
            item-text="name"
            :value="filters.bms"
            multiple
            chips
            deletable-chips
            clearable
            dense
            small-chips
            solo
            prepend-inner-icon="fas fa-code"
            hide-details
            @change="filterBms"
          />
        </v-col>
        
        <v-col
          cols="12"
          class="py-0 mt-2"
        >
          <!-- ФИЛЬТР ПО СТАТУСУ АККАУНТА -->
          <h5 class="mb-1">
            {{ $t('filters.accountStatus') }}
          </h5>
          <v-combobox
            :items="accountsStatuses"
            :value="filters.accountsStatuses"
            :label="$t('filters.accountStatus')"
            multiple
            chips
            deletable-chips
            clearable
            dense
            small-chips
            solo
            prepend-inner-icon="fas fa-code"
            hide-details
            @change="filterAccountsStatuses"
          /> 
        </v-col>
        
        <v-col
          cols="12"
          class="py-0 mt-2"
        >
          <!-- ФИЛЬТР ПО СТАТУСУ КАБИНЕТА -->
          <h5 class="mb-1">
            {{ $t('filters.cabStatus') }}
          </h5>
          <v-combobox
            :label="$t('filters.cabStatus')"
            :items="cabsStatuses"
            :item-value="item => item.text"
            :value="filters.cabsStatuses"
            multiple
            chips
            deletable-chips
            clearable
            dense
            small-chips
            solo
            prepend-inner-icon="fas fa-code"
            hide-details
            @change="filterCabsStatuses"
          />
        </v-col>
        <v-col
          cols="12"
          class="py-0 mt-2"
        >
          <h5 class="mb-1">
            {{ $t('common.tags') }}
          </h5>
          <v-combobox
            :label="$t('common.tags')"
            :items="tags.all"
            :value="filters.tags"
            multiple
            chips
            deletable-chips
            clearable
            dense
            small-chips
            solo
            prepend-inner-icon="fas fa-tags"
            hide-details
            @change="filterTags"
          />
        </v-col>
        
        <v-col>
          <v-divider />
        </v-col>
        
        <!-- ФИЛЬТР ПО ТИПУ КАБИНЕТА -->
        <v-col
          cols="12"
          class="py-0 mt-2"
        >
          <h5>
            {{ $t('adsmanager.cabs.filters.cabType') }}
          </h5>
          <v-radio-group
            :mandatory="false"
            :value="filters.type"
            row
            @change="$store.dispatch('cabs/setSpecificFilter', {filter: 'type', data: $event});"
          >
            <v-radio
              :label="$t('adsmanager.cabs.filters.cabTypes.all')"
              value="all"
            />
            <v-radio
              :label="$t('adsmanager.cabs.filters.cabTypes.business')"
              value="business"
            />
            <v-radio
              :label="$t('adsmanager.cabs.filters.cabTypes.personal')"
              value="personal"
            />
          </v-radio-group>
        </v-col>

        <!-- ФИЛЬТР ПО НАЛИЧИЮ КАРТЫ -->
        <v-col
          cols="12"
          class="py-0 mt-2"
        >
          <h5>
            {{ $t('adsmanager.cabs.filters.attachedCard') }}
          </h5>
          <v-radio-group
            row
            :mandatory="false"
            :value="filters.attachedCard"
            @change="$store.dispatch('cabs/setSpecificFilter', {filter: 'attachedCard', data: $event});"
          >
            <v-radio
              :label="$t('common.all')"
              value="all"
            />
            <v-radio
              :label="$t('adsmanager.cabs.filters.attachedCardRadios.yes')"
              value="with-card"
            />
            <v-radio
              :label="$t('adsmanager.cabs.filters.attachedCardRadios.no')"
              value="without-card"
            />
          </v-radio-group>
        </v-col>

        <!-- ФИЛЬТР ПО АРХИВИРОВАННЫМ -->
        <v-col
          cols="12"
          class="py-0 mt-2"
        >
          <h5>
            {{ $t('adsmanager.cabs.filters.archived') }}
          </h5>
          <v-checkbox
            v-model="filters.showArchived"
            :label="$t('adsmanager.cabs.filters.showArchivedCabs')"
            @change="$store.dispatch('cabs/setSpecificFilter', {filter: 'showArchived', data: $event ? true : false});"
          />
        </v-col>
      </v-row>

      <!-- ФИЛЬТР ПО ТЕГАМ -->
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters }       from 'vuex';

import accountsStatuses     from '../../../constants/accounts/accounts-statuses';    
import cabsStatuses         from '../../../constants/cabs/statuses_for_select';
    
// import FiltersTags          from '../filters/AdsManagerFiltersTags';

export default {
  name: 'CabsFiltersBar',

  props: {
    show: {
      type: Boolean,
      default: false,
    },
    activeFiltersCount: {
      type: Number,
      default: 0,
    }
  },

  data() {
    return {
      accountsStatuses,
      cabsStatuses,
      bms: [],
    };
  },

  computed: {
    ...mapGetters({
      cabs: 'cabs/cabs',
      filters: 'cabs/filters',
      tags: 'tags/tags',
    })
  },

  watch: {
    cabs: {
      deep: true,
      handler() {
        this.makeBmsList();
      }
    }
  },

  created() {
    this.makeBmsList();
    this.$store.dispatch('tags/loadTags');
    setInterval(() => {
      this.$store.dispatch('tags/loadTags');
    }, 60000);
  },

  methods: {
    makeBmsList() {
      if (!this.cabs) return;
      this.cabs.all.forEach(cab => {
        if (cab.business_name && typeof cab.business_name !== 'undefined') {
          if (this.bms.indexOf(cab.business_name) === -1) {
            this.bms.push({id: cab.business_id, name: cab.business_name});
          }
        }
      });
    },
            
    async filterAccountsStatuses(statuses) {
      if (statuses && statuses.length > 0) {
        this.$store.dispatch('cabs/clearSelected');
        statuses = statuses.map(status => {
          if (typeof status.value !== 'undefined') return status.value;
        });
      } else {
        statuses = [];
      }
      await this.$store.dispatch('cabs/setSpecificFilter', {
        filter: 'accountsStatuses',
        data: statuses
      });
    },

    async filterCabsStatuses(statuses) {
      if (statuses && statuses.length > 0) {
        this.$store.dispatch('cabs/clearSelected');
      }
      const data = {
        filter: 'cabsStatuses',
        data: statuses
      };
      await this.$store.dispatch('cabs/setSpecificFilter', data);
    },

    async filterBms(bms) {
      if (bms && bms.length > 0) {
        this.$store.dispatch('cabs/clearSelected');
      }
      const data = {
        filter: 'bms',
        data: bms
      };
      await this.$store.dispatch('cabs/setSpecificFilter', data);
    },

    async filterTags(tags) {
      if (tags && tags.length > 0) {
        this.$store.dispatch('cabs/clearSelected');
      }
      const data = {
        filter: 'tags',
        data: tags
      };
      await this.$store.dispatch('cabs/setSpecificFilter', data);
    }
  }
};
</script>
<style></style>