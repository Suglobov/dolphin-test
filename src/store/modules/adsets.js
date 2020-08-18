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
    adsets: {
      all: [],
      selected: localStorage.getItem('adsmanager-adsets-selected') ?
        JSON.parse(localStorage.getItem('adsmanager-adsets-selected')) : [],
      filtered: [],
    },
    dialogs: {
      changeBudget: false,
      pause: false,
      start: false,
      duplicate: false,
    },
    loading: {
      mainTable: false,
    },
    stat: []
  },
  getters: {
    ...mixinDialogGetters,

    adsets: state => state.adsets,
    selected: state => state.adsets.selected,
    loading: state => state.loading,
    stat: state => state.stat,
  },
  mutations: {
    ...mixinDialogMutations,
    ...mixinSetLoading,

    FILTER: state => {
      state.adsets.filtered = state.adsets.all;
    },

    SET_STAT: (state, stat) => {
      state.stat = stat;
    },

    SET_SELECTED: (state, data) => {
      state.adsets.selected = data;
      localStorage.setItem('adsmanager-adsets-selected', JSON.stringify(data));
    },

    SET_ALL: (state, payload) => {
      state.adsets.all = payload;
    },

    SET_FILTERED: (state, payload) => {
      state.adsets.filtered = payload;
    },
  },
  actions: {
    ...mixinDialogActions,

    async loadAdsets({commit, dispatch, rootState}) {
      const data = {
        users_ids: rootState.users.users.selected.length > 0 ?
          rootState.users.users.selected.map(user => user.id) :
          rootState.users.users.all.length === 0 ?
            -1 : rootState.users.users.filtered.map(user => user.id),
        accounts_ids: rootState.accounts.accounts.selected.length > 0 ?
          rootState.accounts.accounts.selected.map(account => account.id) :
          rootState.accounts.accounts.all.length === 0 ?
            -1 : rootState.accounts.accounts.filtered.map(account => account.id),
        cabs_ids: rootState.cabs.cabs.selected.length > 0 ?
          rootState.cabs.cabs.selected.map(cab => cab.id) :
          rootState.cabs.cabs.all.length === 0 ?
            -1 : rootState.cabs.cabs.filtered.map(cab => cab.id),
        campaigns_ids: rootState.campaigns.campaigns.selected.length > 0 ?
          rootState.campaigns.campaigns.selected.map(campaign => campaign.id) :
          rootState.campaigns.campaigns.all.length === 0 ?
            -1 : rootState.campaigns.campaigns.filtered.map(campaign => campaign.id),
      };
      
      const response = await this._vm.api.post('/adsets', data);

      if (response.data.success) {
        commit('SET_ALL', response.data.data);
        commit('FILTER');
        dispatch('loadStat');
      }
    },

    async loadStat({
      dispatch,
      commit,
      rootState
    }) {
      commit('SET_LOADING', {
        param: 'mainTable',
        value: true,
      });

      const data = {
        ids: rootState.adsets.adsets.filtered.map(adset => adset.id),
        dates: rootState.adsmanager.filters.dates,
      };
      const response = await this._vm.api.post('/stat/by_adset', data).catch((e) => {
        dispatch('main/apiError', e, {
          root: true
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

    async clearSelected(context) {
      context.commit('SET_SELECTED', []);
    },

    async clear(context) {
      context.commit('SET_ALL', []);
      context.commit('SET_FILTERED', []);
      context.commit('SET_SELECTED', []);
    }
  }
};