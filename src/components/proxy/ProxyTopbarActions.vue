<template>
  <div style="float: left;">
    <!-- ПРОВЕРКА -->
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          small
          color="primary"
          text
          style="min-width: 0; width: 30px; margin-top: 1px;"
          :disabled="proxy.selected.length === 0"
          v-on="on"
          @click="$store.dispatch('proxy/openDialog', 'check')"
        >
          <v-icon :size="14">
            fas fa-check-double
          </v-icon>
        </v-btn>
      </template>
      <span>{{ $t('common.check') }}</span>
    </v-tooltip>

    <!-- ЗАПУСТИТЬ -->
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          small
          color="primary"
          text
          style="min-width: 0; width: 30px; margin-top: 1px;"
          :disabled="proxy.selected.length === 0"
          v-on="on"
          @click="$store.dispatch('proxy/openDialog', 'share')"
        >
          <v-icon :size="14">
            fas fa-share-alt
          </v-icon>
        </v-btn>
      </template>
      <span>{{ $t('common.share') }}</span>
    </v-tooltip>

    <!-- ДУБЛИРОВАТЬ -->
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          small
          color="primary"
          text
          style="min-width: 0; width: 30px; margin-top: 1px;"
          :disabled="proxy.selected.length === 0"
          v-on="on"
          @click="$store.dispatch('proxy/openDialog', 'delete')"
        >
          <v-icon :size="14">
            fas fa-trash-alt
          </v-icon>
        </v-btn>
      </template>
      <span>{{ $t('common.delete') }}</span>
    </v-tooltip>

    <!-- СЧЕТЧИК -->
    <span
      class="body-2 ml-1"
      :style="{color: proxy.selected.length > 0 ? '' : 'gray'}"
    >
      {{ $t('common.selected') }} : {{ proxy.selected.length }}
    </span>
  </div>
</template>

<script>
import {mapGetters}          from 'vuex';

export default {
  name: 'ProxyTopbarActions',

  computed: {
    ...mapGetters({
      proxy: 'proxy/proxy',
    })
  },

  methods: {
  }
};
</script>