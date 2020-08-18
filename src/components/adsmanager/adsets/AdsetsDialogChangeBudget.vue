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
              {{ $t('dialogs.changeBudget.loadingText') }}...
            </div>
            <div>
              {{ done }} / {{ adsets.selected.length }}
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
      persistent
    >
      <v-card :loading="false">
        <v-card-title>
          <span class="headline">
            {{ $t('common.changeBudget') }}
          </span>
        </v-card-title>
        <v-card-text style="max-height: 700px;">
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="newBudget"
                  :label="$t('common.newBudget')"
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
            @click="$store.dispatch('adsets/closeDialog', 'changeBudget')"
          >
            {{ $t('common.close') }}
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="changeBudget"
          >
            {{ $t('common.apply') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'AdsetsDialogChangeBudget',

  data() {
    return {
      showModal: true,
      showLoading: false,
      done: 0,
      newBudget: null,
    };
  },

  computed: {
    ...mapGetters({
      adsets: 'adsets/adsets',
      dialogs: 'adsets/dialogs'
    })
  },

  created() {
  },

  methods: {
    changeBudget() {
      if (!this.adsets.selected || this.adsets.selected.length === 0) {
        this.$store.dispatch('adsets/closeDialog', 'changeBudget');
        return;
      }

      this.newBudget = parseInt(this.newBudget);
      if (!this.newBudget || this.newBudget <= 0) {
        this.newBudget = 0;
        return;
      }

      this.showModal = false;
      this.showLoading = true;

      this.adsets.selected.forEach(adset => {
        const data = {
          id: adset.id,
          budget: this.newBudget
        };
        this.api.post('/adsets/change_budget', data).finally(() => {
          this.done++;
          if (this.done === this.adsets.selected.length) {
            this.$store.dispatch('adsets/loadAdsets');
            this.$store.dispatch('adsets/closeDialog', 'changeBudget');
          }
        });
      });
    }
  }
};
</script>