<template>
  <v-container>
    <v-snackbar
      v-model="snackbar"
      :timeout="3000"
      color="success"
    >
      {{ $t('common.saved') }}
      <v-btn
        text
        color="white"
        @click="snackbar = false"
      >
        {{ $t('common.close') }}
      </v-btn>
    </v-snackbar>
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-card
          outlined
        >
          <v-card-title>
            {{ $t('settings.facebookApi.dataUpdate.title') }}
          </v-card-title>

          <!-- ОБНОВЛЕНИЕ ДАННЫХ -->
          <v-card-text>
            <div>
              <v-switch
                v-model="settings.intervals.sync"
                :label="$t('settings.facebookApi.dataUpdate.sync')"
                dense
                class="my-0 py-0"
              />
            </div>

            <!-- ОБНОВЛЯТЬ ДАННЫЕ АККАУНТОВ -->
            <div
              v-if="settings.intervals.sync"
              class="mb-5"
            >
              {{ $t('common.every') }}
              <input
                v-model="settings.intervals.sync_time"
                type="text"
                style="border: 1px solid; width: 50px; text-align: center; padding: 0; border-radius: 5px;"
              >
              {{ $t('common.min').toLowerCase() }}
            </div>
            
            <!-- РАБОТАТЬ С КОММЕНТАРИЯМИ -->
            <div>
              <v-switch
                v-model="settings.intervals.comments"
                :label="$t('settings.facebookApi.dataUpdate.comments')"
                dense
                class="my-0 py-0"
              />
            </div>

            <!-- ИНТЕРВАЛ РАБОТЫ С КОММЕНТАРИЯМИ -->
            <div
              v-if="settings.intervals.comments"
              class="mb-5"
            >
              {{ $t('common.every') }}
              <input
                v-model="settings.intervals.comments_time"
                type="text"
                style="border: 1px solid; width: 50px; text-align: center; padding: 0; border-radius: 5px;"
              >
              {{ $t('common.min').toLowerCase() }}
            </div>

            <!-- РЕЖИМ РАБОТЫ С КОММЕНТАРИЯМИ -->
            <div
              v-if="settings.intervals.comments"
              class="mb-5"
            >
              <v-select
                v-model="settings.intervals.comments_mode"
                :items="commentsModes"
                :label="$t('settings.facebookApi.comments.mode')"
                dense
                style="width: 200px;"
              />
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn
              text
              color="primary"
              @click="saveDataUpdate"
            >
              {{ $t('common.save') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <!-- МОБИЛЬНЫЕ ПРОКСИ -->
        <v-card
          outlined
        >
          <v-card-title>
            {{ $t('settings.facebookApi.mobileProxy.title') }}
          </v-card-title>

          <!-- МЕНЯТЬ IP В ИНТЕРФЕЙСЕ -->
          <v-card-text>
            <v-switch
              v-model="settings.general.change_ip_from_ui"
              :label="$t('settings.facebookApi.mobileProxy.ui')"
              dense
              class="my-0 py-0"
            />
          </v-card-text>

          <v-card-actions>
            <v-btn
              text
              color="primary"
              @click="saveMobProxy"
            >
              {{ $t('common.save') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'SettingsFacebookApi',

  data() {
    return {
      commentsModes: [
        {text: this.$t('settings.facebookApi.comments.download'), value: 'download'},
        {text: this.$t('settings.facebookApi.comments.hide_all'), value: 'hide_all'},
        {text: this.$t('settings.facebookApi.comments.delete_all'), value: 'delete_all'},
      ],
      snackbar: false,
    };
  },

  computed: {
    ...mapGetters({
      profile: 'main/profile',
      settings: 'settings/settings',
      globals: 'settings/globals'
    })
  },

  created() {
    this.$store.dispatch('settings/loadSettings');
  },

  methods: {
    async saveDataUpdate() {
      const settings = {
        intervals: {
          sync: this.settings.intervals.sync,
          sync_time: this.settings.intervals.sync_time,
          comments: this.settings.intervals.comments,
          comments_time: this.settings.intervals.comments_time,
          comments_mode: this.settings.intervals.comments_mode
        }
      };
      await this.$store.dispatch('settings/saveSettings', settings);
      this.snackbar = true;
    },

    async saveMobProxy() {
      const settings = {
        general: {
          change_ip_from_ui: this.settings.general.change_ip_from_ui
        }
      };
      await this.$store.dispatch('settings/saveSettings', settings);
      this.snackbar = true;
    }
  }
};
</script>