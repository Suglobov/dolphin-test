<template>
  <v-dialog
    :value="dialogs.columns"
    persistent
    fullscreen
  >
    <v-card :loading="loading.columnsDialog">
      <v-toolbar
        color="primary"
      >
        <!-- КНОПКА ЗАКРЫТИЯ -->
        <v-btn
          icon
          @click="$store.dispatch('adsmanager/closeDialog', 'columns')"
        >
          <v-icon>fas fa-times</v-icon>
        </v-btn>

        <!-- ЗАГОЛОВОК -->
        <v-toolbar-title>
          {{ $t('common.columns') }}
        </v-toolbar-title>
        <v-spacer />

        <!-- КНОПКИ ДЕЙСТВИЯ -->
        <v-toolbar-items>
          <!-- СОХРАНИТЬ НАБОР СТОЛБЦОВ -->
          <div style="height: 100%; display: flex; align-items: center;">
            <v-checkbox
              v-if="preset.name && preset.name.length > 0"
              v-model="preset.shared"
              :label="$t('dialogs.adsmanager.columns.sharePresetLabel')"
              color="white"
              hide-details
            />
            <v-text-field
              v-model="preset.name"
              dense
              clearable
              :label="$t('dialogs.adsmanager.columns.savePresetLabel')"
              single-line
              hide-details
              style="width: 300px; margin-top: -6px;"
              class="mr-5 ml-5"
              color="white"
            />
          </div>
          
          <!-- КНОПКА СОХРАНЕНИЯ -->
          <v-btn
            text
            @click="saveCols"
          >
            {{ $t('common.save') }}
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <!-- ОСНОВНОЕ ОКНО -->
      <v-card-text :loading="loading.columns">
        <v-row>
          <!-- ЛЕВАЯ ЧАСТЬ -->
          <v-col
            cols="4"
            offset="2"
          >
            <!-- СТРОКА ПОИСКА -->
            <div class="mb-3">
              <v-text-field
                dense
                clearable
                :label="$t('common.search')"
                single-line
                prepend-inner-icon="fas fa-search"
                hide-details
                @input="searchLeftCols"
              />
            </div>

            <!-- КАРТОЧКИ (ЛЕВО) -->
            <div class="cols-container">
              <draggable
                :value="cols.filtered"
                class="dragArea list-group"
                :group="{ name: 'selectedCols', pull: 'clone', put: false }"
                :move="onMove"
              >
                <v-card
                  v-for="col in cols.filtered"
                  :key="`columns-dialog-${col}-left`"
                  outlined
                  class="my-3"
                  :color="selectedCols.all.indexOf(col) === -1 ? '' : 'primary'"
                >
                  <v-card-text
                    style="cursor: move; padding: 8px 8px 8px 16px;"
                  >
                    <!-- СОДЕРЖИМОЕ КАРТОЧКИ (ЛЕВО) -->
                    <div style="display: flex; justify-content: space-between;">
                      <!-- ТЕКСТ КАРТОЧКИ -->
                      <div>
                        <span class="title">
                          <v-icon>drag_handle</v-icon>
                          {{ $t(`adsmanager.cols.${col}`) }}
                        </span>
                      </div>

                      <!-- КНОПКА ДОБАВЛЕНИЯ -->
                      <div 
                        v-if="selectedCols.all.indexOf(col) === -1"
                        style="display: flex; align-items: center;"
                      >
                        <v-btn
                          text
                          small
                          icon
                          @click="addCol(col)"
                        >
                          <v-icon>add</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </draggable>
            </div>
          </v-col>

          <!-- ПРАВАЯ ЧАСТЬ -->
          <v-col
            cols="4"
          >
            <!-- СТРОКА ПОИСКА -->
            <div class="mb-3">
              <v-text-field
                v-model="search"
                dense
                clearable
                :label="$t('common.search')"
                single-line
                prepend-inner-icon="fas fa-search"
                hide-details
              />
            </div>

            <!-- КАРТОЧКИ (ПРАВО) -->
            <div class="cols-container">
              <draggable
                :list="selectedCols.all"
                group="selectedCols"
              >
                <v-card
                  v-for="col in selectedCols.filtered"
                  :key="`columns-dialog-${col}-right`"
                  outlined
                  class="my-3 list-group-item"
                >
                  <v-card-text
                    style="cursor: move; padding: 8px 8px 8px 16px;"
                  >
                    <!-- СОДЕРЖИМОЕ КАРТОЧКИ (ПРАВО) -->
                    <div style="display: flex; justify-content: space-between;">
                      <!-- ТЕКСТ КАРТОЧКИ -->
                      <div>
                        <span class="title">
                          <v-icon>drag_handle</v-icon>
                          {{ $t(`adsmanager.cols.${col}`) }}
                        </span>
                      </div>

                      <!-- КНОПКА УДАЛЕНИЯ -->
                      <div style="display: flex; align-items: center;">
                        <v-btn
                          text
                          small
                          icon
                          @click="deleteCol(col)"
                        >
                          <v-icon>close</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </draggable>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import draggable    from 'vuedraggable';
import {mapGetters} from 'vuex';

import actionCols   from '../../../constants/adsmanager/action_cols';
import commonCols   from '../../../constants/adsmanager/common_cols';

export default {
  name: 'AdsManagerColumnsDialog',

  components: {
    draggable
  },

  data() {
    return {
      commonCols,
      actionCols,
      cols: {
        all: [],
        filtered: [],
      },
      selectedCols: {
        all: [],
        filtered: [],
      },
      search: '',
      preset: {
        name: '',
        shared: false,
      }
    };
  },

  computed: {
    ...mapGetters({
      dialogs: 'adsmanager/dialogs',
      loading: 'adsmanager/loading',
      activeTab: 'adsmanager/activeTab',
      profile: 'main/profile'
    }),
  },

  watch: {
    profile: {
      deep: true,
      handler() {
        if (this.selectedCols.all.length === 0) {
          this.selectedCols.all = this.selectedCols.all.concat(this.profile.columns);
          this.selectedCols.filtered = this.selectedCols.filtered.concat(this.selectedCols.all);
        }
      }
    },

    search() {
      this.filterCols();
    },

    'selectedCols.all': {
      deep: true,
      handler() {
        this.filterCols();
      }
    }
  },

  created() {
    this.cols.all = this.cols.all.concat(this.commonCols);
    this.cols.all = this.cols.all.concat(this.actionCols);
    this.cols.filtered = this.cols.all;

    this.selectedCols.all = this.selectedCols.all.concat(this.profile.columns);
    this.selectedCols.filtered = this.selectedCols.filtered.concat(this.selectedCols.all);
  },
        
  methods: {
    searchLeftCols(search) {
      if (!search) {
        this.cols.filtered = this.cols.all;
        return;
      }
      search = search.toString().toLowerCase();
      this.cols.filtered = this.cols.all.filter(col => {
        const colName = this.$t(`adsmanager.cols.${col}`).toString().toLowerCase();
        return colName.search(search) !== -1; 
      });
    },

    onMove(event) {
      return this.selectedCols.all.indexOf(event.draggedContext.element) === -1;
    },

    deleteCol(colToDelete) {
      this.selectedCols.all = this.selectedCols.all.filter(col => {
        if (col === colToDelete) return false;
        return true;
      });
      this.selectedCols.filtered = this.selectedCols.filtered.filter(col => {
        if (col === colToDelete) return false;
        return true;
      });
    },

    addCol(colToAdd) {
      if (this.selectedCols.all.indexOf(colToAdd) === -1) {
        this.selectedCols.all.push(colToAdd);
        this.filterCols();
      }
    },

    filterCols() {
      if (!this.search) {
        this.selectedCols.filtered = this.selectedCols.all;
        return;
      }

      this.selectedCols.filtered = this.selectedCols.all.filter(col => {
        const colName = this.$t(`adsmanager.cols.${col}`).toString().toLowerCase();
        return colName.search(this.search.toString().toLowerCase()) !== -1; 
      });
    },

    async saveCols() {
      const data = {
        columns: this.selectedCols.all,
        preset: this.preset,
      };
      const success = await this.$store.dispatch('adsmanager/saveCols', data);
      if (success) {
        this.$store.dispatch('adsmanager/closeDialog', 'columns');
        this.$store.dispatch('main/loadProfile');
        this.$store.dispatch('adsmanager/loadColumnsPresets');
        this.$store.dispatch(`${this.activeTab.component}/loadStat`);
      }
    },
  }
};
</script>
<style>
    .cols-container {
        overflow-y: scroll; 
        max-height: calc(100vh - 150px); 
        padding: 8px;
    }

    .cols-container::-webkit-scrollbar {
        display: none;
    }
</style>