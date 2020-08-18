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
              {{ $t('dialogs.cabs.applyAutomationRulesGroup.loadingText') }}
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
            {{ $t('dialogs.cabs.applyAutomationRulesGroup.title') }}
          </span>
        </v-card-title>
        <v-card-text style="max-height: 700px;">
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-combobox
                  v-model="group"
                  :label="$t('common.automationRulesGroup')"
                  :items="rulesGroups"
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
            @click="$store.dispatch('cabs/closeDialog', 'applyAutomationRulesGroup')"
          >
            {{ $t('common.close') }}
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            :disabled="!group"
            @click="applyAutomationRulesGroup"
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
  name: 'CabsDialogApplyAutomationRulesGroup',

  data() {
    return {
      showModal: true,
      showLoading: false,
      done: 0,
      rulesGroups: [],
      group: null,
    };
  },

  computed: {
    ...mapGetters({
      cabs: 'cabs/cabs',
      dialogs: 'cabs/dialogs'
    })
  },

  created() {
    this.loadRulesGroups();
  },

  methods: {
    async loadRulesGroups() {
      const response = await this.api('/automation_rules_groups');
      this.rulesGroups = response.data.data;
    },

    applyAutomationRulesGroup() {
      this.showModal = false;
      this.showLoading = true;

      if (Array.isArray(this.cabs.selected) && this.group) {
        this.cabs.selected.forEach(async (cab) => {
          const data = {id: cab.id, group_id: this.group.id};
          await this.api.post('/cabs/apply_automation_rules_group', data)
            .catch(() => true);
          this.done++;
          
          if (this.done === this.cabs.selected.length) {
            this.showLoading = false;
            this.$store.dispatch('cabs/closeDialog', 'applyAutomationRulesGroup');
            this.$store.dispatch('cabs/loadCabs');
          }
        });
      } else {
        this.showLoading = false;
        this.$store.dispatch('cabs/closeDialog', 'applyAutomationRulesGroup');
      }
    },
  }
};
</script>