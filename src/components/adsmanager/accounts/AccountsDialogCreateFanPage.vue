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
              {{ $t('dialogs.accounts.createFanPage.loadingText') }}
            </div>
            <div>
              {{ done }} / {{ accountsToProcess.length }}
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
      v-if="showModal"
      :value="dialogs.createFanPage"
      persistent
      fullscreen
    >
      <v-card :loading="loading.createFanPage">
        <v-toolbar
          color="primary"
        >
          <!-- КНОПКА ЗАКРЫТЬ -->
          <v-btn
            icon
            @click="$store.dispatch('accounts/closeDialog', 'createFanPage')"
          >
            <v-icon>fas fa-times</v-icon>
          </v-btn>

          <!-- ЗАГОЛОВОК -->
          <v-toolbar-title>{{ $t('dialogs.accounts.createFanPage.title') }}</v-toolbar-title>
          <v-spacer />

          <!-- КНОПКА СОЗДАТЬ -->
          <v-toolbar-items>
            <v-btn
              text
              @click="createFanPages"
            >
              {{ $t('common.create') }}
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <!-- ОСНОВНОЙ КОНТЕЙНЕР -->
        <v-card-text>
          <v-container>
            <!-- МАССОВЫЕ ДЕЙСТВИЯ -->
            <v-row
              align="center"
            >
              <!-- МАССОВЫЙ ВВОД НАЗВАНИЯ -->
              <v-col
                cols="12"
                md="4"
              />

              <!-- МАССОВЫЙ ВЫБОР КАТЕГОРИИ -->
              <v-col
                cols="12"
                md="4"
              />
            </v-row>

            <!-- СТРАНИЦЫ ДЛЯ АККАУНТОВ -->
            <v-row>
              <v-col
                cols="12"
                md="3"
              >
                <v-alert
                  dense
                  text
                  color="info"
                >
                  <span class="caption" v-html="$t('dialogs.accounts.createFanPage.textHint')" />
                </v-alert>
                <v-textarea
                  v-model="multiple.name"
                  :label="$t('dialogs.accounts.createFanPage.sharedPageName')"
                  dense
                  outlined
                  single-line
                  hide-details
                />

                <v-autocomplete
                  v-model="multiple.categoryId"
                  class="mt-5"
                  dense
                  single-line
                  outlined
                  :label="$t('dialogs.accounts.createFanPage.sharedCategoryId')"
                  :items="pageCategories"
                  item-value="id"
                  item-text="name"
                />
              </v-col>
              <v-col
                cols="12"
                md="9"
              >
                <v-row
                  v-for="(account, index) in accountsToProcess"
                  :key="`account-for-fp-creation-${account.id}`"
                  align="center"
                >
                  <!-- НАЗВАНИЕ СТРАНИЦЫ -->
                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                      v-model="accountsToProcess[index].pageName"
                      :label="$t('dialogs.accounts.createFanPage.fanPageName')"
                      hide-details
                      dense
                      single-line
                      outlined
                    />
                  </v-col>

                  <!-- КАТЕГОРИЯ СТРАНИЦЫ -->
                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-autocomplete
                      v-model="accountsToProcess[index].pageCategoryId"
                      hide-details
                      dense
                      single-line
                      outlined
                      :label="$t('dialogs.accounts.createFanPage.fanPageCategory')"
                      :items="pageCategories"
                      item-value="id"
                      item-text="name"
                    />
                  </v-col>

                  <!-- НАЗВАНИЕ АККАУНТА -->
                  <v-col
                    cols="12"
                    md="4"
                  >
                    <span
                      class="title"
                    >
                      &rarr; {{ account.name }}
                    </span>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import pageCategories from '@/constants/pages/categories';
import spintax        from 'spintax';
import {mapGetters}   from 'vuex';
    
export default {
  name: 'AccountsDialogCreateFanPage',

  data() {
    return {
      validation: {
        state: false,
      },
      newAccount: {},
      pageCategories,
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

  watch: {
    'multiple.categoryId': {
      handler(newVal) {
        this.accountsToProcess = this.accountsToProcess.map(account => {
          account.pageCategoryId = newVal;
          return account;
        });
      }
    },

    'multiple.name': {
      handler(newVal) {
        this.accountsToProcess = this.accountsToProcess.map(account => {
          account.pageName = spintax.unspin(newVal);
          return account;
        });
      }
    }
  },

  created() {
    this.accountsToProcess = this.accountsToProcess.concat(this.accounts.selected);
    this.accountsToProcess = this.accountsToProcess.map(account => {
      account.pageCategoryId = '2700';
      return account;
    });
  },

  methods: {
    async createFanPages() {
      if (!this.accountsToProcess || this.accountsToProcess.length === 0) {
        this.$store.dispatch('accounts/closeDialog', 'createFanPage');
        return;
      }

      this.showModal = false;
      this.showLoading = true;

      this.accountsToProcess.forEach(account => {
        const data = {
          id: account.id,
          page_name: account.pageName,
          page_category_id: account.pageCategoryId
        };
        console.log(JSON.stringify(data));
        this.$store.dispatch('accounts/createFanPage', data).finally(() => {
          this.done++;
          if (this.done === this.accountsToProcess.length) {
            this.$store.dispatch('accounts/LOAD_ACCOUNTS');
            this.$store.dispatch('accounts/closeDialog', 'createFanPage');
          }
        });
      });
      
    }
  }

};
</script>