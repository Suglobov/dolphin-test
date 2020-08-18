<template>
  <div>
    <!-- ИНДИКАТОР ЗАГРУЗКИ -->
    <v-dialog
      :value="showLoading"
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
              {{ $t('dialogs.cabs.changeCountry.loadingText') }}
            </div>
            <div>
              {{ done }} / {{ cabs.selected.length }}
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

    <!-- МОДАЛЬНОЕ ОКНО -->
    <v-dialog
      :value="showModal"
      max-width="500px"
      scrollable
      persistent
    >
      <v-card :loading="false">
        <v-card-title>
          <span class="headline">
            {{ $t('dialogs.cabs.changeCountry.title') }}
          </span>
        </v-card-title>
        <v-card-text style="max-height: 700px;">
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-combobox
                  v-model="country"
                  :label="$t('common.country')"
                  :items="countries"
                  item-value="code"
                  item-text="name"
                  dense
                  hide-details
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="$store.dispatch('cabs/closeDialog', 'changeCountry')"
          >
            {{ $t('common.close') }}
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="changeCountry"
          >
            {{ $t('common.save') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

import countries    from '../../../constants/countries';

export default {
  name: 'CabsDialogChangeCountry',

  data() {
    return {
      showModal: true,
      showLoading: false,
      countries,
      country: '',
      done: 0,
    };
  },

  computed: {
    ...mapGetters({
      cabs: 'cabs/cabs',
      dialogs: 'cabs/dialogs'
    })
  },

  created() {
    this.setDefaultCountry();
  },

  methods: {
    async setDefaultCountry() {
      let country = 'AZ';
      const response = await this.api('/settings/by_param/?param=general_cab_country');
      if (response.data.data) {
        country = response.data.data.toString().toUpperCase();
      }

      this.country = this.countries.find(c => c.code === country);
    },

    changeCountry() {
      this.showModal = false;
      this.showLoading = true;

      if (Array.isArray(this.cabs.selected)) {
        this.cabs.selected.forEach(async (cab) => {
          const data = {id: cab.id, country: this.country.code};
          await this.api.post('/cabs/change_country', data)
            .catch(() => true);
          
          this.done++;
          
          if (this.done === this.cabs.selected.length) {
            this.showLoading = false;
            this.$store.dispatch('cabs/closeDialog', 'changeCountry');
            this.$store.dispatch('cabs/loadCabs');
          }
        });
      } else {
        this.showLoading = false;
        this.$store.dispatch('cabs/closeDialog', 'changeCountry');
      }
    }
  }
};
</script>