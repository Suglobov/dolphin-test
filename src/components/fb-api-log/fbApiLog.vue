<template>
  <v-navigation-drawer
    :value="dialogs.logSidebar"
    temporary
    right
    absolute
    style="z-index: 9999; width: 600px;"
    @transitionend="$store.dispatch('fbApiLog/closeDialog', 'logSidebar')"
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
            @click="$store.dispatch('fbApiLog/closeDialog', 'logSidebar')"
          >
            <v-icon>keyboard_arrow_right</v-icon>
          </v-btn>
        </span>
        <span class="title">
          {{ $t('common.fbApiLog') }}
        </span>
      </div>

      <v-row>
        <v-col
          cols="4"
        >
          <a
            v-if="devHash"
            target="_blank"
            :href="`/new/fb_api_log/index/${devHash}`"
          >
            {{ $t('common.link') }}
          </a>
        </v-col>
        <v-col cols="4">
          <v-switch
            v-model="reverse"
            :label="$t('dialogs.fbApiLog.newAtTheBeggining')"
            dense
            class="py-0 my-0"
          />
        </v-col>
        <v-col cols="4">
          <v-switch
            v-model="onlyWithError"
            :label="$t('dialogs.fbApiLog.onlyWithError')"
            dense
            class="py-0 my-0"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <span v-if="loading">{{ $t('common.loading') }}</span>
          <span v-if="!loading && rows.length === 0">{{ $t('common.noData') }}</span>
          <v-timeline
            v-if="rows.length > 0"
            dense
            align-top
          >
            <v-timeline-item
              v-for="row in rows"
              v-show="(onlyWithError && row.error === 1) || !onlyWithError"
              :key="`log-${row.id}`"
              fill-dot
              small
              :color="row.error === 1 ? 'error' : 'success'"
              :icon="row.error === 1 ? 'fas fa-times' : 'fas fa-check'"
            >
              <v-card
                class="elevation-2"
                style="font-family: monospace;"
              >
                <v-card-title class="subtitle">
                  {{ row.class }} / {{ row.method }}
                </v-card-title>
                <v-card-text>
                  <div class="my-3">
                    <b>{{ row.datetime_added }}</b><br>
                    <b>{{ row.load_time }} sec.</b>
                  </div>
                  <div class="my-3">
                    <b>URL:</b> {{ row.url }}
                  </div>
                  <div class="my-3">
                    <b>Data:</b> {{ JSON.stringify(row.data) }}
                  </div>
                  <div class="my-3">
                    <b>Response:</b> {{ JSON.stringify(row.response) }}
                  </div>
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-col>
      </v-row>
    </div>
  </v-navigation-drawer>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'FbApiLog',

  data() {
    return {
      onlyWithError: localStorage.getItem('logOnlyWithError')
        ? localStorage.getItem('logOnlyWithError') === 'true' ? true : false
        : false,
      reverse: false,
    };
  },

  computed: {
    ...mapGetters({
      dialogs: 'fbApiLog/dialogs',
      devHash: 'fbApiLog/devHash',
      rows: 'fbApiLog/rows',
      loading: 'fbApiLog/loading'
    })
  },

  watch: {
    onlyWithError() {
      localStorage.setItem('logOnlyWithError', this.onlyWithError);
    },
    reverse() {
      this.rows = this.rows.reverse();
    }
  }
};
</script>