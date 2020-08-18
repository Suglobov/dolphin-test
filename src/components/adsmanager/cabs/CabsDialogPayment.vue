<template>
  <div>
    <!-- МОДАЛЬНОЕ ОКНО -->
    <v-dialog
      :value="dialogs.payment"
      max-width="500px"
      scrollable
      persistent
    >
      <v-card :loading="loading">
        <v-card-title>
          <div style="display: flex; justify-content: space-between; width: 100%;">
            <div>
              <span class="headline">
                {{ $t('dialogs.cabs.payment.title') }}
              </span>
            </div>
          </div>
        </v-card-title>
        <v-card-text style="max-height: 700px;">
          <v-container>
            <v-row>
              <v-col
                v-if="(!loading && !paying) || (loading && paying)"
                cols="12"
              >
                <div v-if="success">
                  <v-alert
                    color="success"
                    text
                  >
                    {{ $t('common.success') }}
                  </v-alert>
                </div>
                <div v-if="error">
                  {{ $t('common.somethingWentWrong') }}
                </div>
                <div v-if="noPaymentMethods">
                  {{ $t('dialogs.cabs.payment.cannotPay') }}
                </div>
                <div v-if="!error && (noPaymentMethods || !paymentMethods || paymentMethods.length === 0)">
                  {{ $t('dialogs.cabs.payment.noPaymentMethods') }}
                </div>
                <div v-if="error || noPaymentMethods">
                  <v-alert
                    text
                    color="error"
                  >
                    {{ JSON.stringify(response) }}
                  </v-alert>
                </div>
                <div v-if="paymentError">
                  <v-alert
                    color="red"
                    text
                  >
                    {{ response.data.errors[0].message }}
                    {{ response.data.errors[0].description }}
                  </v-alert>
                </div>

                <div v-if="!error && paymentMethods && paymentMethods.length > 0">
                  <h3
                    v-if="balance > 0"
                    class="heading-5"
                  >
                    {{ $t('dialogs.cabs.payment.balance') }}: {{ balance }} {{ cabs.forPayment.currency }}
                  </h3>
                  <v-select 
                    v-model="credential_id"
                    class="mt-3"
                    :label="$t('dialogs.cabs.payment.choosePaymentMethod')"
                    :items="paymentMethods"
                    :item-text="item => `${item.node.card_type} *${item.node.last_four_digits}`"
                    :item-value="item => item.node.credential_id"
                  />
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="$store.dispatch('cabs/closeDialog', 'payment')"
          >
            {{ $t('common.close') }}
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="payment2"
          >
            {{ $t('common.pay') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'CabsDialogPayment',

  data() {
    return {
      loading: true,
      paying: false,
      error: false,
      noPaymentMethods: false,
      paymentError: false,
      response: '',
      paymentMethods: [],
      credential_id: null,
      balance: 0,
      success: false
    };
  },

  computed: {
    ...mapGetters({
      dialogs: 'cabs/dialogs',
      cabs: 'cabs/cabs'
    }),
  },

  created() {
    this.payment1();
  },
        
  methods: {
    async payment1() {
      const response = await this.api(`/cabs/payment1/${this.cabs.forPayment.id}`);

      if(!response.data.data.data.ad_account) {
        this.error2 = true;
      }
      if (
        typeof response.data.data !== 'undefined' &&
        typeof response.data.data.data !== 'undefined' &&
        typeof response.data.data.data.ad_account !== 'undefined' &&
        response.data.data.data.ad_account &&
        typeof response.data.data.data.ad_account.payment_methods !== 'undefined' &&
        typeof response.data.data.data.ad_account.payment_methods &&
        typeof response.data.data.data.ad_account.payment_methods.edges !== 'undefined' &&
        typeof response.data.data.data.ad_account.payment_methods.edges
      ) {
        this.paymentMethods = response.data.data.data.ad_account.payment_methods.edges;
        this.paymentMethods = this.paymentMethods.filter(p => {
          return typeof p.node.credential_id !== 'undefined';
        });
        this.balance = parseFloat(response.data.data.data.ad_account.balance.formatted.replace(',', '.'));
        if (this.paymentMethods.length === 0) {
          this.noPaymentMethods = true;
        } else {
          this.credential_id = this.paymentMethods[0].node.credential_id;
        }
        
      } else {
        this.error = true;
      }
      this.response = response.data;
      this.loading = false;
    },

    async payment2() {
      this.loading = true;
      this.paying = true;

      const data = {
        sum: this.balance,
        credential_id: this.credential_id
      };
      const response = await this.api.post(`/cabs/payment2/${this.cabs.forPayment.id}`, data);
      console.log(JSON.stringify(response.data));
      
      if (
        typeof response.data.data !== 'undefined' &&
        typeof response.data.data.errors !== 'undefined'
      ) {
        this.response = response.data;
        this.paymentError = true;
      }

      if (
        typeof response.data.data !== 'undefined' &&
        typeof response.data.data.data !== 'undefined' &&
        typeof response.data.data.data.billable_account_pay_now !== 'undefined' &&
        typeof response.data.data.data.billable_account_pay_now.charged_payment_method_id !== 'undefined'
      ) {
        this.success = true;
        this.$store.dispatch('cabs/loadCabs');
      }
      this.loading = false;
      this.paying = false;
    }
  }
};
</script>
<style scoped>
  .v-dialog__content:nth-child(1) {
  align-items: flex-end !important;
}
</style>