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
          :disabled="campaigns.selected.length === 0"
          v-on="on"
          @click="$store.dispatch('campaigns/openDialog', 'pause')"
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
          :disabled="campaigns.selected.length === 0"
          v-on="on"
          @click="$store.dispatch('campaigns/openDialog', 'start')"
        >
          <v-icon :size="14">
            fas fa-play
          </v-icon>
        </v-btn>
      </template>
      <span>{{ $t('common.start') }}</span>
    </v-tooltip>

    <!-- ИЗМЕНИТЬ БЮДЖЕТ -->
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          small
          color="primary"
          text
          style="min-width: 0; width: 30px; margin-top: 1px;"
          :disabled="campaigns.selected.length === 0"
          v-on="on"
          @click="$store.dispatch('campaigns/openDialog', 'changeBudget')"
        >
          <v-icon :size="14">
            fas fa-dollar-sign
          </v-icon>
        </v-btn>
      </template>
      <span>{{ $t('common.changeBudget') }}</span>
    </v-tooltip>

    <!-- ДУБЛИРОВАТЬ -->
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          small
          color="primary"
          text
          style="min-width: 0; width: 30px; margin-top: 1px;"
          :disabled="campaigns.selected.length === 0"
          v-on="on"
          @click="$store.dispatch('campaigns/openDialog', 'duplicate')"
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
      :style="{color: campaigns.selected.length > 0 ? '' : 'gray'}"
    >
      {{ $t('common.selected') }} : {{ campaigns.selected.length }}
    </span>
  </div>
</template>

<script>
import {mapGetters}          from 'vuex';

export default {
  name: 'CampaignsTopbarActions',

  components: {
    
  },

  computed: {
    ...mapGetters({
      campaigns: 'campaigns/campaigns',
    })
  },

  methods: {
  }
};
</script>