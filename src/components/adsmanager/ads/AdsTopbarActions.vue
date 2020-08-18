<template>
  <div style="float: left;">
    <!-- ПАУЗА -->
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          small
          color="primary"
          text
          style="min-width: 0; width: 30px; margin-top: 1px;"
          :disabled="ads.selected.length === 0"
          v-on="on"
          @click="$store.dispatch('ads/openDialog', 'pause')"
        >
          <v-icon :size="14">
            fas fa-pause
          </v-icon>
        </v-btn>
      </template>
      <span>{{ $t('common.pause') }}</span>
    </v-tooltip>

    <!-- ЗАПУСТИТЬ -->
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          small
          color="primary"
          text
          style="min-width: 0; width: 30px; margin-top: 1px;"
          :disabled="ads.selected.length === 0"
          v-on="on"
          @click="$store.dispatch('ads/openDialog', 'start')"
        >
          <v-icon :size="14">
            fas fa-play
          </v-icon>
        </v-btn>
      </template>
      <span>{{ $t('common.start') }}</span>
    </v-tooltip>

    <!-- ДУБЛИРОВАТЬ -->
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          small
          color="primary"
          text
          style="min-width: 0; width: 30px; margin-top: 1px;"
          :disabled="ads.selected.length === 0"
          v-on="on"
          @click="$store.dispatch('ads/openDialog', 'duplicate')"
        >
          <v-icon :size="14">
            fas fa-copy
          </v-icon>
        </v-btn>
      </template>
      <span>{{ $t('common.duplicate') }}</span>
    </v-tooltip>

    <!-- СЧЕТЧИК -->
    <span
      class="body-2 ml-1"
      :style="{color: ads.selected.length > 0 ? '' : 'gray'}"
    >
      {{ $t('common.selected') }} : {{ ads.selected.length }}
    </span>
  </div>
</template>

<script>
import {mapGetters}          from 'vuex';

export default {
  name: 'AdsTopbarActions',

  components: {
    
  },

  computed: {
    ...mapGetters({
      ads: 'ads/ads',
    })
  },

  methods: {
  }
};
</script>