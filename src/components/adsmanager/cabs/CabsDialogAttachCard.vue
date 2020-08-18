<template>
  <div>
    <!-- ИНДИКАТОР ЗАГРУЗКИ -->
    <v-dialog
      :value="showLoading"
      hide-overlay
      persistent
      width="300"
      content-class="loading-modal"
    >
      <v-card
        color="primary"
      >
        <v-card-text>
          <div style="display: flex; justify-content: space-between;">
            <div>
              {{ $t('dialogs.cabs.attachCard.loadingText') }}
            </div>
            <div>
              {{ loadingInfo.done }} / {{ loadingInfo.total }}
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
          <div style="display: flex; justify-content: space-between; width: 100%;">
            <div>
              <span class="headline">
                {{ $t('dialogs.cabs.attachCard.title') }}
              </span>
            </div>
            <div>
              <v-btn
                v-if="showClear"
                small
                text
                color="primary"
                @click="clearCard"
              >
                <v-icon :size="12">
                  close
                </v-icon>
                {{ $t('common.clear') }}
              </v-btn>
            </div>
          </div>
        </v-card-title>
        <v-card-text style="max-height: 700px;">
          <v-container>
            <v-row>
              <!-- НОМЕР КАРТЫ -->
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="card.number"
                  :label="$t('dialogs.cabs.attachCard.cardNumber')"
                  required
                />
              </v-col>
            </v-row>
            <v-row>
              <!-- CVC -->
              <v-col
                cols="4"
              >
                <v-text-field
                  v-model="card.cvc"
                  :label="$t('dialogs.cabs.attachCard.cvc')"
                  required
                />
              </v-col>

              <!-- МЕСЯЦ -->
              <v-col
                cols="3"
                offset="2"
              >
                <v-text-field
                  v-model="card.expire1"
                  :label="$t('dialogs.cabs.attachCard.mm')"
                  required
                  hide-details
                />
              </v-col>

              <!-- ГОД -->
              <v-col
                cols="3"
              >
                <v-text-field
                  v-model="card.expire2"
                  :label="$t('dialogs.cabs.attachCard.yy')"
                  required
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
            @click="$store.dispatch('cabs/closeDialog', 'attachCard')"
          >
            {{ $t('common.close') }}
          </v-btn>
          <v-btn
            :disabled="disableAttachButton"
            color="blue darken-1"
            text
            @click="showModal = false; showLoading = true; attachCard();"
          >
            {{ $t('common.attach') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'CabsDialogAttachCard',

  data() {
    return {
      card: {
        number: '',
        cvc: '',
        expire1: '',
        expire2: '',
      },
      showModal: true,
      showLoading: false,
      loadingInfo: {
        total: 0,
        success: 0,
        error: 0,
        done: 0,
      }
    };
  },

  computed: {
    ...mapGetters({
      dialogs: 'cabs/dialogs',
      cabs: 'cabs/cabs'
    }),

    disableAttachButton() {
      if (!this.card.number || this.card.number.length === 0) return true;
      if (!this.card.cvc || this.card.cvc.length === 0) return true;
      if (!this.card.expire1 || this.card.expire1.length === 0) return true;
      if (!this.card.expire2 || this.card.expire2.length === 0) return true;

      return false;
    },

    showClear() {
      if (this.card.number || this.card.number.length > 0) return true;
      if (this.card.cvc || this.card.cvc.length > 0) return true;
      if (this.card.expire1 || this.card.expire1.length > 0) return true;
      if (this.card.expire2 || this.card.expire2.length > 0) return true;

      return false;
    }
  },
        
  methods: {
    clearCard() {
      this.card = {
        number: '',
        cvc: '',
        expire1: '',
        expire2: '',
      };
    },

    attachCard() {
      if (this.cabs.selected && this.cabs.selected.length > 0) {
        this.loadingInfo.total = this.cabs.selected.length;
        this.cabs.selected.forEach(cab => {
          const data = {
            cab_id: cab.id,
            card: this.card,
          };
          
          this.api.post('/cabs/attach_card', data).then((response) => {
            console.log('Attach card response');
            console.log(JSON.stringify(response.data));
            
            if (typeof response.data.error != 'undefined') {
              this.loadingInfo.error++;
            } else {
              this.loadingInfo.success++;
            }
            this.loadingInfo.done++;
            if (this.loadingInfo.done === this.loadingInfo.total) {
              this.$store.dispatch('cabs/closeDialog', 'attachCard');
              this.$store.dispatch('cabs/loadCabs');
            }
          });
        });
      }
    }
  }
};
</script>
<style scoped>
  .v-dialog__content:nth-child(1) {
  align-items: flex-end !important;
}
</style>