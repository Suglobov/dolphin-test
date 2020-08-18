<template>
  <v-row class="topbar-row">
    <!-- ЛЕВАЯ ЧАСТЬ -->
    <v-col
      :cols="12"
      :sm="9"
    >
      <topbar-actions />
      
      <!-- КНОПКА - ДОБАВИТЬ ПРОКСИ -->
      <div style="float: right;">
        <v-btn
          small
          color="primary"
          text
          style="min-width: 0; margin-top: 1px;"
          class="ml-3"
          @click="$store.dispatch('proxy/openDialog', 'add')"
        >
          <v-icon :size="18">
            add
          </v-icon>

          {{ $t('common.add') }} {{ $t('common.proxy') }}
        </v-btn>
      </div>
    </v-col>
    <!-- ПРАВАЯ ЧАСТЬ -->
    <v-col
      cols="12"
      sm="3"
    >
      <v-row>
        <!-- ПОИСК ПО НАЗВАНИЮ -->
        <v-col
          cols="12"
          sm="12"
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
            @input="searchByName"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import {mapGetters}  from 'vuex';

import TopbarActions from './ProxyTopbarActions';

export default {
  name: 'AdsTopbar',

  components: {
    TopbarActions
  },

  data() {
    return {
    };
  },

  computed: {
    ...mapGetters({
      filters: 'proxy/filters',
      proxy: 'proxy/proxy'
    })
  },

  methods: {
    async searchByName(event) {
      await this.$store.dispatch('proxy/setFilter', {
        filter: 'name',
        data: event
      });
      await this.$store.dispatch('proxy/filterProxy');
    }
  }
};
</script>