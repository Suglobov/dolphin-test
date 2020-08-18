<template>
  <v-menu
    offset-y
    open-on-hover
    close-on-click
  >
    <template v-slot:activator="{ on }">
      <v-btn
        small
        color="primary"
        text
        style="min-width: 0; width: 30px; margin-top: 1px;"
        class="ml-3"
        @click="$store.dispatch('adsmanager/openDialog', 'columns')"
        v-on="on"
      >
        <v-icon :size="18">
          view_column
        </v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item 
        v-for="preset in columnsPresets"
        :key="`columns-dropdown-${preset.id}`" 
        dense
        @click="loadPreset(preset)"
      >
        <v-list-item-title>
          {{ preset.name }}
        </v-list-item-title>
      </v-list-item>

      <v-divider v-if="columnsPresets.length > 0" />
      
      <v-list-item 
        key="columns-dropdown-setup" 
        dense
        @click="$store.dispatch('adsmanager/openDialog', 'columns')"
      >
        <v-list-item-title>
          {{ $t('dialogs.adsmanager.columns.setupCols') }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'AdsManagerTopbarCols',

  computed: {
    ...mapGetters({
      columnsPresets: 'adsmanager/columnsPresets'
    })
  },

  created() {
    this.$store.dispatch('adsmanager/loadColumnsPresets');
  },

  methods: {
    async loadPreset(preset) {
      const data = {
        columns: preset.columns
      };
      const success = await this.$store.dispatch('adsmanager/saveCols', data);
      if (success) {
        this.$store.dispatch('main/loadProfile');
      }
    }
  }
};
</script>