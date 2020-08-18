<template>
  <v-dialog
    :value="dialogs.refresh"
    hide-overlay
    persistent
    width="300"
    class="loading"
    content-class="loading-modal"
  >
    <v-card
      color="primary"
    >
      <v-card-text>
        <div style="display: flex; justify-content: space-between;">
          <div>
            {{ $t('dialogs.adsmanager.refresh.loadingText') }}...
          </div>
          <div>
            {{ done }} / {{ cabsIds.length }}
          </div>
        </div>
          
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'AdsManagerRefreshLoading',

  props: {
    cabsIds: {
      type: Array,
      default: () => []
    },
    done: {
      type: Number,
      default: 0
    }
  },

  computed: {
    ...mapGetters({
      dialogs: 'adsmanager/dialogs'
    })
  }
};
</script>