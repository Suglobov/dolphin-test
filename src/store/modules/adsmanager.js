import moment from 'moment';

import i18n   from '../../i18n';
import {
  mixinDialogMutations,
  mixinDialogActions,
  mixinDialogGetters
} from '../../mixins/vuex_dialogs';

export default {
  namespaced: true,
  state: {
    activeTab: localStorage.getItem('adsmanager-active-tab') ?
      JSON.parse(localStorage.getItem('adsmanager-active-tab')) : {tab: 1, component: 'accounts'},
    filters: {
      tags:
        typeof localStorage.getItem('adsmanager-filters-tags') === 'undefined'
          ? []
          : JSON.parse(localStorage.getItem('adsmanager-filters-tags')),
      dates:
        localStorage.getItem('adsmanager-filters-dates') === null
          ? {
            startDate: moment().format('YYYY-MM-DD'),
            endDate: moment().format('YYYY-MM-DD'),
          }
          : JSON.parse(localStorage.getItem('adsmanager-filters-dates')),
    },
    dialogs: {
      columns: false,
      refresh: false,
    },
    loading: {
      columnsDialog: false,
    },
    columnsPresets: [],
  },
  getters: {
    ...mixinDialogGetters,
    activeTab: (state) => state.activeTab,
    filters: (state) => state.filters,
    dialogs: (state) => state.dialogs,
    loading: (state) => state.loading,
    columnsPresets: (state) => state.columnsPresets,
  },
  mutations: {
    ...mixinDialogMutations,

    SET_ACTIVE_TAB: (state, tab) => {
      state.activeTab = tab;
      localStorage.setItem('adsmanager-active-tab', JSON.stringify(tab));
    },

    SET_FILTERS_TAGS: (state, tags) => {
      state.filters.tags = tags;
      localStorage.setItem('adsmanager-filters-tags', JSON.stringify(tags));
    },

    SET_FILTERS_DATES: (state, dates) => {
      state.filters.dates = dates;
      localStorage.setItem('adsmanager-filters-dates', JSON.stringify(dates));
    },

    SET_LOADING: (state, data) => {
      state.loading[data.param] = data.value;
    },

    SET_COLUMNS_PRESETS: (state, data) => {
      state.columnsPresets = data;
    }
  },
  actions: {
    ...mixinDialogActions,

    async setActiveTab(context, tab) {
      context.commit('SET_ACTIVE_TAB', tab);
    },

    async setFiltersTags(context, tags) {
      context.commit('SET_FILTERS_TAGS', tags);
    },

    async setFiltersDates(context, dates) {
      context.commit('SET_FILTERS_DATES', dates);
    },

    async saveCols(context, data) {
      context.commit('SET_LOADING', {
        param: 'columnsDialog',
        value: true,
      });

      const response = await this._vm.api
        .post('/profile/save_columns', {
          columns: data.columns,
          preset: data.preset,
        })
        .catch((e) => {
          context.dispatch('main/apiError', e, {
            root: true,
          });
        });

      context.commit('SET_LOADING', {
        param: 'columnsDialog',
        value: false,
      });

      context.dispatch(
        'main/alert',
        {
          color: 'success',
          message: i18n.t('dialogs.adsmanager.columns.success'),
        },
        {
          root: true,
        }
      );

      return response.data.success;
    },

    async loadColumnsPresets(context) {
      const response = await this._vm.api('/profile/columns_presets');
      if (typeof response.data.success !== 'undefined' && response.data.success) {
        context.commit('SET_COLUMNS_PRESETS', response.data.data);
      }
    }
  },
};