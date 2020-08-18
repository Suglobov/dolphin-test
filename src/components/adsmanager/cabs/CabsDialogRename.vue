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
              {{ $t('dialogs.cabs.rename.loadingText') }}
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
      max-width="720px"
      scrollable
      persistent
    >
      <v-card :loading="false">
        <v-card-title>
          <span class="headline">
            {{ $t('common.rename') }}
          </span>
        </v-card-title>
        <v-card-text style="max-height: 700px;">
          <v-container>
            <v-row
              v-for="(cab, i) in selectedCabs"
              :key="`rename-${cab.id}-${cab.cab_id}-cab`"
            >
              <v-col
                cols="5"
              >
                <span
                  class="subtitle-1 d-block pt-2"
                >
                  {{ cab.name ? cab.name : '-' }}
                </span>
              </v-col>
              <v-col cols="2">
                <span
                  class="display-1 d-block font-weight-light"
                  style="margin-top: 1px;"
                >
                  &rarr;
                </span>
              </v-col>
              <v-col cols="5">
                <v-text-field
                  v-model="selectedCabs[i].newName"
                  hide-details
                  dense
                  single-line
                  outlined
                  @input="watchDisabledButton"
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
            @click="$store.dispatch('cabs/closeDialog', 'rename')"
          >
            {{ $t('common.close') }}
          </v-btn>
          <v-btn
            :disabled="disabledSaveButton"
            color="blue darken-1"
            text
            @click="rename"
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

export default {
  name: 'CabsDialogRename',

  data() {
    return {
      showModal: true,
      showLoading: false,
      done: 0,
      selectedCabs: [],
      disabledSaveButton: true,
    };
  },

  computed: {
    ...mapGetters({
      cabs: 'cabs/cabs',
      dialogs: 'cabs/dialogs'
    }),
  },

  created() {
    this.selectedCabs = this.selectedCabs.concat(this.cabs.selected);
    for (let i = 0; i < this.selectedCabs.length; i++) {
      this.selectedCabs[i].newName = this.selectedCabs[i].name;
    }
  },

  methods: {
    rename() {
      if (this.selectedCabs && Array.isArray(this.selectedCabs)) {
        this.showModal = false;
        this.showLoading = true;

        this.selectedCabs.forEach(async (cab) => {
          const data = {
            id: cab.id,
            name: cab.newName
          };

          await this.api.post('/cabs/rename', data)
            .catch(() => true);

          this.done++;

          if (this.selectedCabs.length === this.done) {
            this.$store.dispatch('cabs/closeDialog', 'rename');
            this.$store.dispatch('cabs/loadCabs');
          }
        });
      } else {
        this.$store.dispatch('cabs/closeDialog', 'rename');
      }
    },

    watchDisabledButton() {
      if (this.selectedCabs.filter(c => c.name !== c.newName).length > 0) {
        this.disabledSaveButton = false;
      } else {
        this.disabledSaveButton = true;
      }
    }
  }
};
</script>