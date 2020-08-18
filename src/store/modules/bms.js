import {
  mixinDialogMutations,
  mixinDialogActions,
  mixinDialogGetters
} from '../../mixins/vuex_dialogs';
import {
  mixinSetLoading
} from '../../mixins/vuex_loading';

// import i18n from '../../i18n';

export default {
  namespaced: true,
  state: {
    bms: {
      all: [],
      selected: localStorage.getItem('adsmanager-bms-selected') ?
        JSON.parse(localStorage.getItem('adsmanager-bms-selected') || '') :
        [],
      filtered: [],
    },
    loading: {
      mainTable: false,
    },
    dialogs: {
    },
    stat: [],
    filters: {}
  },
  getters: {
    ...mixinDialogGetters,

    bms: (state) => state.bms,
    selected: (state) => state.bms.selected,
    loading: (state) => state.loading,
    stat: (state) => state.stat,
  },
  mutations: {
    ...mixinDialogMutations,
    ...mixinSetLoading,

    SET_ALL_BMS: (state, bms) => {
      state.bms.all = bms;
    },

    SET_ALL: (state, bms) => {
      state.bms.all = bms;
    },

    SET_FILTERED: (state, bms) => {
      state.bms.filtered = bms;
    },

    FILTER: (state) => {
      state.bms.filtered = state.bms.all;
    },

    SET_STAT: (state, stat) => {
      state.stat = stat;
    },

    SET_SELECTED: (state, data) => {
      state.bms.selected = data;
      localStorage.setItem('adsmanager-bms-selected', JSON.stringify(data));
    },
  },
  actions: {
    ...mixinDialogActions,

    async loadBms({rootState, commit}) {
      const data = {
        users_ids: rootState.users.users.selected.length > 0 ?
          rootState.users.users.selected.map(user => user.id) : rootState.users.users.all.length === 0 ?
            -1 : rootState.users.users.filtered.map(user => user.id),
        accounts_ids: rootState.accounts.accounts.selected.length > 0 ?
          rootState.accounts.accounts.selected.map(account => account.id) : rootState.accounts.accounts.all.length === 0 ?
            -1 : rootState.accounts.accounts.filtered.map(account => account.id),
      };
      const response = await this._vm.api.post('/businesses', data);
      if (response.data.success) {
        commit('SET_ALL_BMS', response.data.data);
        commit('FILTER', null);
        // context.dispatch('loadStat');
      }

      return true;
    },

    async loadStat({
      commit,
      dispatch,
      rootState
    }) {
      commit('SET_LOADING', {
        param: 'mainTable',
        value: true,
      });

      const data = {
        ids: rootState.bms.bms.filtered.map((bm) => bm.id),
        dates: rootState.adsmanager.filters.dates,
      };
      const response = await this._vm.api
        .post('/stat/by_bm', data)
        .catch((e) => {
          dispatch('main/apiError', e, {
            root: true,
          });
        });

      commit('SET_LOADING', {
        param: 'mainTable',
        value: false,
      });

      commit('SET_STAT', response.data.data);
    },

    async saveSelected(context, data) {
      context.commit('SET_SELECTED', data);
    },

    async clearSelected({
      commit
    }) {
      commit('SET_SELECTED', []);
    },

    async addBusiness({
      commit,
      dispatch
    }, payload) {
      commit('SET_LOADING', {
        param: 'addDialog',
        value: true,
      });

      const response = await this._vm.api
        .post('/bms/add', payload)
        .catch((e) => {
          dispatch('main/apiError', e, {
            root: true,
          });
        });

      commit('SET_LOADING', {
        param: 'addDialog',
        value: false,
      });

      if (response.data.success || false) {
        dispatch('loadBusinesses');
        dispatch('loadStat');
      } else {
        dispatch(
          'main/apiError', {
            request: payload,
            response: response.data,
          }, {
            root: true,
          }
        );
      }

      return response.data.success || false;
    },

    async clear(context) {
      context.commit('SET_ALL', []);
      context.commit('SET_FILTERED', []);
      context.commit('SET_SELECTED', []);
    },
  },
};