<template>
  <div>
    <!-- МОДАЛЬНОЕ ОКНО -->
    <v-dialog
      v-if="showModal"
      :value="dialogs.createBm"
      persistent
      fullscreen
    >
      <v-card :loading="loading.createBm">
        <v-toolbar
          color="primary"
        >
          <!-- КНОПКА ЗАКРЫТЬ -->
          <v-btn
            icon
            @click="$store.dispatch('accounts/closeDialog', 'createBm')"
          >
            <v-icon>fas fa-times</v-icon>
          </v-btn>

          <!-- ЗАГОЛОВОК -->
          <v-toolbar-title>{{ $t('dialogs.accounts.createBm.title') }}</v-toolbar-title>
          <v-spacer />

          <!-- КНОПКА СОЗДАТЬ -->
          <v-toolbar-items>
            <v-btn
              text
              @click="createBms"
            >
              {{ $t('common.create') }}
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <!-- ОСНОВНОЙ КОНТЕЙНЕР -->
        <v-card-text>
          <v-container>
            <v-row
              align="center"
            >
              <v-col
                cols="8"
              >
                <div style="float: left;">
                  <v-select
                    dense
                    :items="['Business names']"
                    value="Business names"
                    style="width: 300px;"
                    persistent-hint
                    :hint="$t('dialogs.accounts.createBm.takeFromDictionary')"
                  />
                </div>
                <div
                  style="float: left;"
                >
                  <v-btn
                    text
                    color="primary"
                    @click="takeNamesFromDictionary"
                  >
                    {{ $t('common.take') }}
                  </v-btn>
                </div>
                <div style="float: left;">
                  <v-btn
                    text
                    color="primary"
                    @click="randomEmails"
                  >
                    {{ $t('dialogs.accounts.createBm.randomEmails') }}
                  </v-btn>
                </div>
              </v-col>
            </v-row>
            <v-row
              align="center"
            >
              <v-col cols="12">
                <v-simple-table
                  fixed-header
                >
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th
                          class="text-left"
                          style="width: 250px"
                        >
                          {{ $t('common.account') }}
                        </th>
                        <th
                          class="text-left px-3"
                          style="width: 250px"
                        >
                          {{ $t('dialogs.accounts.createBm.bmName') }}
                        </th>
                        <th
                          class="text-left px-3"
                          style="width: 250px"
                        >
                          {{ $t('common.email') }} ({{ $t('common.optional').toLowerCase() }})
                        </th>
                        <th
                          class="text-left pl-5"
                          style="width: 100px"
                        >
                          {{ $t('common.status') }}
                        </th>
                        <th class="text-left">
                          {{ $t('common.result') }}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(account, index) in accountsToProcess"
                        :key="`creating-bm-for-account-${account.id}`"
                      >
                        <td>{{ account.name }}</td>
                        <td class="px-3">
                          <v-text-field
                            v-model="accountsToProcess[index].newBmName"
                            :label="$t('dialogs.accounts.createBm.bmName')"
                            single-line
                            dense
                            hide-details
                            class="my-1"
                            solo
                            clearable
                          />
                        </td>
                        <td class="px-3">
                          <v-text-field
                            v-model="accountsToProcess[index].newBmEmail"
                            :label="$t('common.email')"
                            single-line
                            dense
                            hide-details
                            class="my-1"
                            solo
                            clearable
                          />
                        </td>
                        <td class="text-left pl-5">
                          <v-chip
                            v-if="account.bmCreationStatus === 'waiting'"
                            color="orange"
                            outlined
                            x-small
                            label
                            style="font-weight: bold;"
                          >
                            {{ $t('common.waiting') }}
                          </v-chip>

                          <v-chip
                            v-if="account.bmCreationStatus === 'requesting'"
                            color="orange"
                            outlined
                            x-small
                            label
                            style="font-weight: bold;"
                          >
                            {{ $t('common.requesting') }}
                          </v-chip>

                          <v-chip
                            v-if="account.bmCreationStatus === 'success'"
                            color="success"
                            outlined
                            x-small
                            label
                            style="font-weight: bold;"
                          >
                            {{ $t('common.success') }}
                          </v-chip>

                          <v-chip
                            v-if="account.bmCreationStatus === 'error'"
                            color="error"
                            outlined
                            x-small
                            label
                            style="font-weight: bold;"
                          >
                            {{ $t('common.error') }}
                          </v-chip>
                        </td>
                        <td>
                          <div
                            style="font-family: monospace; font-size: 11px; color: #FF5252; font-weight: bold;"
                            class="my-3"
                          >
                            <div v-if="typeof account.bmCreationResponse.response !== 'undefined' && typeof account.bmCreationResponse.response.error !== 'undefined' && typeof account.bmCreationResponse.response.error.message !== 'undefined'">
                              {{ account.bmCreationResponse.response.error.message }}
                            </div>
                            <div v-if="typeof account.bmCreationResponse.response !== 'undefined' && typeof account.bmCreationResponse.response.error !== 'undefined' && typeof account.bmCreationResponse.response.error.error_user_title !== 'undefined'">
                              {{ account.bmCreationResponse.response.error.error_user_title }}
                            </div>
                            <div v-if="typeof account.bmCreationResponse.response !== 'undefined' && typeof account.bmCreationResponse.response.error !== 'undefined' && typeof account.bmCreationResponse.response.error.error_user_msg !== 'undefined'">
                              {{ account.bmCreationResponse.response.error.error_user_msg }}
                            </div>
                            <div v-if="typeof account.bmCreationResponse.message !== 'undefined'">
                              {{ account.bmCreationResponse.message }}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import randomEmail    from 'random-email';
import {mapGetters}   from 'vuex';
    
export default {
  name: 'AccountsDialogCreateBm',

  data() {
    return {
      validation: {
        state: false,
      },
      newAccount: {},
      accountsToProcess: [],
      multiple: {
        name: null,
        categoryId: null
      },
      showLoading: false,
      showModal: true,
      done: 0,
    };
  },

  computed: {
    ...mapGetters({
      accounts: 'accounts/ACCOUNTS',
      dialogs: 'accounts/dialogs',
      loading: 'accounts/loading',
    })
  },

  created() {
    this.accountsToProcess = this.accountsToProcess.concat(this.accounts.selected);
    this.accountsToProcess = this.accountsToProcess.map(account => {
      account.bmCreationStatus = 'waiting';
      account.bmCreationResponse = {};
      return account;
    });
  },

  methods: {
    createBms() {
      if (!this.accountsToProcess) {
        this.$store.dispatch('accounts/closeDialog', 'createBm');
        return;
      }
      
      this.accountsToProcess.forEach((account, index) => {
        account.bmCreationStatus = 'requesting';
        
        this.$set(this.accountsToProcess, index, account);
        
        const data = {
          id: account.id,
          name: account.newBmName,
          email: account.newBmEmail,
        };
        this.api.post('/accounts/create_bm', data).then(response => {
          account.bmCreationStatus = (typeof response.data.response === 'undefined' || typeof response.data.response.error !== 'undefined' || response.data.success === false)
            ? 'error' : 'success';
          account.bmCreationResponse = response.data;
          this.$set(this.accountsToProcess, index, account);
        });
      });
    },

    async takeNamesFromDictionary() {
      const response = await this.api.post('/generate_names', {count: this.accountsToProcess.length});
      this.accountsToProcess = this.accountsToProcess.map((account, index) => {
        account.newBmName = response.data.data[index];
        return account;
      });
    },

    randomEmails() {
      this.accountsToProcess = this.accountsToProcess.map((account) => {
        account.newBmEmail = randomEmail({domain: 'gmail.com'});
        return account;
      });
    }
  }
};
</script>