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
              {{ $t('dialogs.cabs.applyAutomationRule.loadingText') }}
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
            {{ $t('dialogs.cabs.applyAutomationRule.title') }}
          </span>
        </v-card-title>
        <v-card-text style="max-height: 700px;">
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-combobox
                  v-model="rule"
                  :label="$t('common.automationRule')"
                  :items="rules"
                  item-value="id"
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
            @click="$store.dispatch('cabs/closeDialog', 'applyAutomationRule')"
          >
            {{ $t('common.close') }}
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            :disabled="!rule"
            @click="applyAutomationRule"
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
  name: 'CabsDialogApplyAutomationRule',

  data() {
    return {
      showModal: true,
      showLoading: false,
      done: 0,
      rules: [],
      rule: null,
    };
  },

  computed: {
    ...mapGetters({
      cabs: 'cabs/cabs',
      dialogs: 'cabs/dialogs'
    })
  },

  created() {
    this.loadRules();
  },

  methods: {
    async loadRules() {
      const response = await this.api('/automation_rules');
      this.rules = response.data.data;
    },

    applyAutomationRule() {
      this.showModal = false;
      this.showLoading = true;

      if (Array.isArray(this.cabs.selected) && this.rule) {
        this.cabs.selected.forEach(async (cab) => {
          const data = {id: cab.id, rule_id: this.rule.id};
          await this.api.post('/cabs/apply_automation_rule', data)
            .catch(() => true);
          this.done++;
          
          if (this.done === this.cabs.selected.length) {
            this.showLoading = false;
            this.$store.dispatch('cabs/closeDialog', 'applyAutomationRule');
            this.$store.dispatch('cabs/loadCabs');
          }
        });
      } else {
        this.showLoading = false;
        this.$store.dispatch('cabs/closeDialog', 'applyAutomationRule');
      }
    },
  }
};
</script>