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
    dates: {
      all: [],
      selected: [],
      filtered: [],
    },
    loading: {
      mainTable: false,
    },
    stat: []
  },
  getters: {
    ...mixinDialogGetters,

    dates: state => state.dates,
    selected: state => state.dates.selected,
    loading: state => state.loading,
    stat: state => state.stat,
  },
  mutations: {
    ...mixinDialogMutations,
    ...mixinSetLoading,

    SET_ALL: (state, users) => {
      state.dates.all = users;
    },

    FILTER: state => {
      state.dates.filtered = state.dates.all;
    },

    SET_STAT: (state, stat) => {
      state.stat = stat;
    },
  },
  actions: {
    ...mixinDialogActions,

    async loadDates({
      dispatch,
      commit,
      rootState
    }) {
      const data = {
        dates: rootState.adsmanager.filters.dates,
        users_ids:
                rootState.users.users.selected.length > 0
                  ? rootState.users.users.selected.map((user) => user.id)
                  : rootState.users.users.all.length === 0
                    ? -1
                    : rootState.users.users.filtered.map((user) => user.id),
        accounts_ids:
                rootState.accounts.accounts.selected.length > 0
                  ? rootState.accounts.accounts.selected.map(
                    (account) => account.id
                  )
                  : rootState.accounts.accounts.all.length === 0
                    ? -1
                    : rootState.accounts.accounts.filtered.map(
                      (account) => account.id
                    ),
        cabs_ids:
                rootState.cabs.cabs.selected.length > 0
                  ? rootState.cabs.cabs.selected.map((cab) => cab.id)
                  : rootState.cabs.cabs.all.length === 0
                    ? -1
                    : rootState.cabs.cabs.filtered.map((cab) => cab.id),
        campaigns_ids:
                rootState.campaigns.campaigns.selected.length > 0
                  ? rootState.campaigns.campaigns.selected.map(
                    (campaign) => campaign.id
                  )
                  : rootState.campaigns.campaigns.all.length === 0
                    ? -1
                    : rootState.campaigns.campaigns.filtered.map(
                      (campaign) => campaign.id
                    ),
        adsets_ids:
                rootState.adsets.adsets.selected.length > 0
                  ? rootState.adsets.adsets.selected.map((adset) => adset.id)
                  : rootState.adsets.adsets.all.length === 0
                    ? -1
                    : rootState.adsets.adsets.filtered.map((adset) => adset.id),
        ads_ids:
                rootState.ads.ads.selected.length > 0
                  ? rootState.ads.ads.selected.map((ad) => ad.id)
                  : rootState.ads.ads.all.length === 0
                    ? -1
                    : rootState.ads.ads.filtered.map((ad) => ad.id),
      };
      const response = await this._vm.api.post('/dates', data);
      console.log(response.data);
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
        dates: rootState.dates.dates.all.map(date => date.date),
        users_ids:
                    rootState.users.users.selected.length > 0
                      ? rootState.users.users.selected.map((user) => user.id)
                      : rootState.users.users.all.length === 0
                        ? -1
                        : rootState.users.users.filtered.map((user) => user.id),
        accounts_ids:
                    rootState.accounts.accounts.selected.length > 0
                      ? rootState.accounts.accounts.selected.map(
                        (account) => account.id
                      )
                      : rootState.accounts.accounts.all.length === 0
                        ? -1
                        : rootState.accounts.accounts.filtered.map(
                          (account) => account.id
                        ),
        cabs_ids:
                    rootState.cabs.cabs.selected.length > 0
                      ? rootState.cabs.cabs.selected.map((cab) => cab.id)
                      : rootState.cabs.cabs.all.length === 0
                        ? -1
                        : rootState.cabs.cabs.filtered.map((cab) => cab.id),
        campaigns_ids:
                    rootState.campaigns.campaigns.selected.length > 0
                      ? rootState.campaigns.campaigns.selected.map(
                        (campaign) => campaign.id
                      )
                      : rootState.campaigns.campaigns.all.length === 0
                        ? -1
                        : rootState.campaigns.campaigns.filtered.map(
                          (campaign) => campaign.id
                        ),
        adsets_ids:
                    rootState.adsets.adsets.selected.length > 0
                      ? rootState.adsets.adsets.selected.map((adset) => adset.id)
                      : rootState.adsets.adsets.all.length === 0
                        ? -1
                        : rootState.adsets.adsets.filtered.map((adset) => adset.id),
        ads_ids:
                    rootState.ads.ads.selected.length > 0
                      ? rootState.ads.ads.selected.map((ad) => ad.id)
                      : rootState.ads.ads.all.length === 0
                        ? -1
                        : rootState.ads.ads.filtered.map((ad) => ad.id),
      };
      const response = await this._vm.api.post('/stat/by_date', data).catch((e) => {
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
  }
};