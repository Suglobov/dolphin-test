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
        v-if="profile.role_id === 1"
        cols="12"
        md="6"
      >
        <v-card
          outlined
        >
          <v-card-title>
            {{ $t('settings.general.useGlobals.title') }}
          </v-card-title>

          <v-card-text>
            <div>
              <v-switch
                v-model="settings.general.use_globals"
                :label="$t('settings.general.useGlobals.useGlobals')"
                dense
                class="my-0 py-0"
              />
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn
              text
              color="primary"
              @click="saveGlobals"
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
  name: 'SettingsGeneral',

  data() {
    return {
      snackbar: false
    };
  },

  computed: {
    ...mapGetters({
      profile: 'main/profile',
      settings: 'settings/settings',
      globals: 'settings/globals'
    })
  },

  async created() {
    await this.$store.dispatch('settings/loadSettings');
  },

  methods: {
    async saveGlobals() {
      const settings = {
        general: {
          use_globals: this.settings.general.use_globals
        }
      };
      await this.$store.dispatch('settings/saveSettings', settings);
      this.snackbar = true;
    }
  }
};
</script>