import i18n                                                           from '../../i18n';
import {mixinDialogMutations, mixinDialogActions, mixinDialogGetters} from '../../mixins/vuex_dialogs';

export default {
  namespaced: true,
  root: true,
  state: {
    accounts: {
      all: [],
      selected: localStorage.getItem('adsmanager-accounts-selected') ?
        JSON.parse(localStorage.getItem('adsmanager-accounts-selected')) : [],
      filtered: [],
      forAssigningTags: {},
      forShare: {},
      forEdit: {},
      forPermissions: {}
    },
    stat: [],
    filters: {
      name: '',
      statuses: typeof localStorage.getItem('accounts-filters-statuses') === 'undefined' ? [] : JSON.parse(localStorage.getItem('accounts-filters-statuses')),
    },
    dialogs: {
      acceptRules: false,
      assignTags: false,
      add: false,
      edit: false,
      share: false,
      multipleShare: false,
      multipleAssignTags: false,
      permissions: false,
      createFanPage: false,
      createBm: false,
      noFacebookIdInfo: false,
      initPersonalCab: false,
    },
    loading: {
      mainTable: false,
      addDialog: false,
      assignTagsDialog: false,
      share: false,
      multipleShare: false,
      editDialog: false,
      multipleAssignTags: false,
      createFanPage: false,
      createBm: false,
    },
  },
  getters: {
    ...mixinDialogGetters,
    ACCOUNTS: state => state.accounts,
    FILTERS: state => state.filters,
    accountForAssigningTags: state => state.accounts.forAssigningTags,
    forShare: state => state.accounts.forShare,
    forEdit: state => state.accounts.forEdit,
    loading: state => state.loading,
    stat: state => state.stat,
    selected: state => state.accounts.selected,
    filtered: state => state.accounts.filtered,
    accounts: state => state.accounts,
    forPermissions: state => state.accounts.forPermissions,
  },
  mutations: {
    ...mixinDialogMutations,

    SET_FOR_PERMISSIONS: (state, account) => {
      state.accounts.forPermissions = account;
    },

    SET_LOADING: (state, data) => {
      state.loading[data.param] = data.value;
    },

    SET_STAT: (state, data) => {
      state.stat = data;
    },

    SET_ALL_ACCOUNTS: (state, payload) => {
      state.accounts.all = payload;
    },
    SET_FILTERED_ACCOUNTS: (state, payload) => {
      state.accounts.filtered = payload;
    },
        
    SET_ALL: (state, payload) => {
      state.accounts.all = payload;
    },

    SET_FILTERED: (state, payload) => {
      state.accounts.filtered = payload;
    },

    SET_SELECTED: (state, payload) => {
      state.accounts.selected = payload;
      localStorage.setItem('adsmanager-accounts-selected', JSON.stringify(payload));
    },

    DELETE_ACCOUNTS: (state, payload) => {
      state.accounts.all = state.accounts.all.filter(account => {
        return payload.indexOf(account.id) === -1;
      });
    },
    FILTER_ACCOUNTS (state) {
      let accounts = state.accounts.all;
      const filters = state.filters;

      if (filters.name) {
        if (filters.name.length > 0) {
          accounts = accounts.filter(account => {
            return (
              account.name.toString().toLowerCase().search(filters.name.toLowerCase()) !== -1
            );
          });
        }
      }

      if (filters.statuses && filters.statuses.length > 0) {
        accounts = accounts.filter(function(account) {
          return filters.statuses.indexOf(account.status) > -1;
        });
      }

      if (this.state.adsmanager.filters.tags && this.state.adsmanager.filters.tags.length > 0) {
        accounts = accounts.filter(account => {
          return this.state.adsmanager.filters.tags.some(tag => {
            if (!Array.isArray(account.tags)) return false;
            return account.tags.indexOf(tag.toString()) > -1;
          });
        });
      }
      
      state.accounts.filtered = accounts;
    },
    SET_FILTERS_NAME: (state, payload) => {
      state.filters.name = payload;
    },

    SET_FILTERS_STATUSES: (state, payload) => {
      state.filters.statuses = payload;
      localStorage.setItem('accounts-filters-statuses', JSON.stringify(payload));
    },

    UPDATE_ACCOUNT: (state, newAccount) => {
      state.accounts.all = state.accounts.all.map(account => {
        if (account.id === newAccount.id) return newAccount;
        return account;
      });
    },
    SET_ACCOUNT_FOR_ASSIGNING_TAGS: (state, account) => {
      state.accounts.forAssigningTags = account;
    },
    
    SET_ACCOUNT_TAGS: (state, newAccount) => {
      state.accounts.all = state.accounts.all.map(account => {
        if (account.id === newAccount.id) return newAccount;
        return account;
      });
    },

    SET_ACCOUNT_FOR_SHARE: (state, account) => {
      state.accounts.forShare = account;
    },

    SET_ACCOUNT_FOR_EDIT: (state, account) => {
      state.accounts.forEdit = account;
    },

    CLEAR_SELECTED_ACCOUNTS: state => {
      state.accounts.selected = [];
    }
  },

  actions: {
    ...mixinDialogActions,

    async loadAccount({commit, payload, rootState}) {
      const response = await this._vm.api.get(`/accounts/?account_id=${payload}`);
      if (typeof response.data.data[0] !== 'undefined') {
        commit('UPDATE_ACCOUNT', response.data.data[0]);
        commit('FILTER_ACCOUNTS', rootState.adsmanager.filters);
      }
    },

    async LOAD_ACCOUNTS({commit, rootState, dispatch}) {
      console.log('======================');
      console.log('LOAD ACCOUNTS');
      commit('SET_LOADING', {param: 'mainTable', value: true});
      const data = {
        users_ids: rootState.users.users.selected.length > 0 ?
          rootState.users.users.selected.map(user => user.id) :
          rootState.users.users.all.length === 0 ?
            -1 : rootState.users.users.filtered.map(user => user.id),
      };
      console.log(data);
      this._vm.api.post('/accounts', data).then(response => {
        console.log(response.data);
        console.log('======================');
        commit('SET_ALL_ACCOUNTS', response.data.data);
        commit('FILTER_ACCOUNTS', rootState.adsmanager.filters);
        commit('SET_LOADING', {
          param: 'mainTable',
          value: false
        });
        dispatch('loadStat');
      });
    },

    saveSelected(context, payload) {
      context.commit('SET_SELECTED', payload);
    },

    async setFiltersName(context, payload) {
      context.commit('SET_FILTERS_NAME', payload);
      context.commit('FILTER_ACCOUNTS');
    },

    async multipleDeleteAccounts({commit, dispatch}, payload) {
      commit('SET_LOADING', {
        param: 'mainTable',
        value: true
      });

      const data = {
        ids: payload
      };
      console.log(JSON.stringify(data));
      this._vm.api.post('/accounts/delete', data).then(response => {
        commit('SET_LOADING', {
          param: 'mainTable',
          value: false
        });

        console.log(response.data);

        if (response.data.success) {
          
          dispatch('main/alert', {
            color: 'success',
            message: i18n.t('dialogs.accounts.delete.success')
          }, {
            root: true
          });
          commit('SET_SELECTED', []);
          dispatch('LOAD_ACCOUNTS');
        } else {
          dispatch('main/apiError', {
            request: data,
            response: response.data
          }, {
            root: true
          });
        }
      }).catch((e) => {
        commit('SET_LOADING', {
          param: 'mainTable',
          value: false
        });

        dispatch('main/apiError', e, {
          root: true
        });
      });
    },

    async checkToken(context, account) {
      context.commit('SET_LOADING', {
        param: 'mainTable',
        value: true
      });

      const response = await this._vm.api(`/accounts/check_token/${account.id}`).catch((e) => {
        context.dispatch('main/apiError', e, {
          root: true
        });
      });

      console.log(JSON.stringify(response.data));

      context.commit('SET_LOADING', {
        param: 'mainTable',
        value: false
      });
      
      switch(response.data.result) {
      case 'ok':
        context.dispatch('main/alert', {
          color: 'success',
          message: i18n.t('dialogs.accounts.checkToken.ok')
        }, {
          root: true
        });
        break;
      case 'token_error':
        context.dispatch('main/alert', {
          color: 'error',
          message: i18n.t('dialogs.accounts.checkToken.tokenError')
        }, {
          root: true
        });
        break;
      case 'connection_error':
        context.dispatch('main/alert', {
          color: 'error',
          message: i18n.t('dialogs.accounts.checkToken.connectionError')
        }, {
          root: true
        });
        break;
      }

      context.dispatch('loadAccount', account.id);
    },

    async setAccountForAssigningTags(context, account) {
      context.commit('SET_ACCOUNT_FOR_ASSIGNING_TAGS', account);
    },

    async saveTags(context, account) {
      context.commit('SET_LOADING', {
        param: 'assignTagsDialog',
        value: true
      });

      const response = await this._vm.api.post('/accounts/update_tags', account).catch((e) => {
        context.dispatch('main/apiError', e, { root: true });
      });

      context.commit('SET_LOADING', {
        param: 'assignTagsDialog',
        value: false
      });

      if (response.data.success) {
        context.dispatch('main/alert', {
          color: 'success',
          message: i18n.t('dialogs.accounts.assignTags.success')
        }, {root: true});

        context.commit('SET_ACCOUNT_TAGS', account);
        context.commit('FILTER_ACCOUNTS');
        return true;
      } else {
        context.dispatch('main/apiError', response.data, { root: true });
      }

      return response.data.success;
    },

    async saveMultipleTags(context, data) {
      context.commit('SET_LOADING', {
        param: 'multipleAssignTags',
        value: true
      });

      const response = await this._vm.api.post('/accounts/update_multiple_tags', data).catch((e) => {
        context.dispatch('main/apiError', e, {
          root: true
        });
      });

      context.commit('SET_LOADING', {
        param: 'multipleAssignTags',
        value: false
      });

      if (response.data.success) {
        context.dispatch('main/alert', {
          color: 'success',
          message: i18n.t('common.saved')
        }, {
          root: true
        });

        context.dispatch('LOAD_ACCOUNTS');
        return true;
      } else {
        context.dispatch('main/apiError', response.data, {
          root: true
        });
      }

      return response.data.success;
    },

    async initAccountForShare(context, account) {
      context.commit('SET_ACCOUNT_FOR_SHARE', account);
      context.commit('OPEN_DIALOG', 'share');
      return true;
    },

    async savePermissions(context, account) {
      context.commit('SET_LOADING', {
        param: 'share',
        value: true
      });

      const response = await this._vm.api.post('/accounts/update_permissions', account).catch((e) => {
        context.dispatch('main/apiError', e, {
          root: true
        });
      });

      context.commit('SET_LOADING', {
        param: 'share',
        value: false
      });

      if (response.data.success) {
        context.dispatch('main/alert', {
          color: 'success',
          message: i18n.t('dialogs.accounts.share.success')
        }, {
          root: true
        });

        context.commit('UPDATE_ACCOUNT', account);
        context.commit('FILTER_ACCOUNTS');
      } else {
        context.dispatch('main/apiError', response.data, {
          root: true
        });
      }

      return response.data.success;
    },

    async addAccount(context, account) {
      context.commit('SET_LOADING', {
        param: 'addDialog',
        value: true
      });

      const response = await this._vm.api.post('/accounts/add', account).catch((error) => {
        context.dispatch('main/apiError', error, {
          root: true
        });
        
        return false;
      });

      context.commit('SET_LOADING', {
        param: 'addDialog',
        value: false
      });

      if (typeof response.data.success === 'undefined') {
        return false;
      }

      if (response.data.success) {
        context.commit('CLOSE_DIALOG', 'add');
        context.dispatch('LOAD_ACCOUNTS');
      } else {
        context.dispatch('main/apiError', response.data, {root: true});
      }

      return response.data.success;
    },

    async saveAccount(context, account) {
      context.commit('SET_LOADING', {
        param: 'editDialog',
        value: true
      });

      const response = await this._vm.api.post('/accounts/update', account).catch((error) => {
        context.dispatch('main/apiError', error, {
          root: true
        });

        return false;
      });

      context.commit('SET_LOADING', {
        param: 'editDialog',
        value: false
      });

      if (typeof response.data.success === 'undefined') {
        return false;
      }

      if (response.data.success) {
        context.commit('CLOSE_DIALOG', 'edit');
        context.dispatch('LOAD_ACCOUNTS');
        setTimeout(() => {
          context.dispatch('LOAD_ACCOUNTS');
        }, 5000);
      } else {
        context.dispatch('main/apiError', response.data, {
          root: true
        });
      }

      return response.data.success;
    },

    async initAccountForEdit(context, account) {
      context.commit('SET_ACCOUNT_FOR_EDIT', account);
      context.commit('OPEN_DIALOG', 'edit');
      return true;
    },

    async setFiltersStatuses(context, payload) {
      context.commit('SET_FILTERS_STATUSES', payload);
      context.commit('FILTER_ACCOUNTS');
    },

    async filterAccounts({commit, rootState}) {
      commit('FILTER_ACCOUNTS', rootState.adsmanager.filters);
    },

    async loadStat({rootState, commit}) {
      const data = {
        ids: rootState.accounts.accounts.filtered.map(account => account.id),
        dates: rootState.adsmanager.filters.dates,
      };
      const response = await this._vm.api.post('/stat/by_account', data);

      commit('SET_STAT', response.data.data);
    },

    async saveSelectedAccounts(context, accounts) {
      context.commit('SET_SELECTED', accounts);
    },

    async saveMultiplePermissions(context, data) {
      context.commit('SET_LOADING', {
        param: 'multipleShare',
        value: true
      });

      const response = await this._vm.api.post('/accounts/update_multiple_permissions', data).catch((e) => {
        context.dispatch('main/apiError', e, {
          root: true
        });
      });

      context.commit('SET_LOADING', {
        param: 'multipleShare',
        value: false
      });

      if (response.data.success) {
        context.dispatch('main/alert', {
          color: 'success',
          message: i18n.t('common.saved')
        }, {
          root: true
        });

        context.dispatch('LOAD_ACCOUNTS');
      } else {
        context.dispatch('main/apiError', response.data, {
          root: true
        });
      }

      return response.data.success;
    },

    async clearSelected(context) {
      context.commit('SET_SELECTED', []);
    },

    async clear(context) {
      context.commit('SET_ALL', []);
      context.commit('SET_FILTERED', []);
      context.commit('SET_SELECTED', []);
    },

    async setForPermissions({commit}, account) {
      commit('SET_FOR_PERMISSIONS', account);
    },

    async createFanPage(context, data) {
      context.commit('SET_LOADING', {
        param: 'createFanPage',
        value: true
      });

      const response = await this._vm.api.post('/accounts/create_fan_page', data).catch((error) => {
        context.dispatch(
          'main/apiError', 
          {
            method: '/accounts/create_fan_page',
            request: data,
            response: error,
          }, 
          {
            root: true
          }
        );
      });

      console.log(response.data);

      context.commit('SET_LOADING', {
        param: 'createFanPage',
        value: false
      });

      // if (response.data.success) {
      //   context.dispatch('main/alert', {
      //     color: 'success',
      //     message: i18n.t('common.saved')
      //   }, {
      //     root: true
      //   });

      //   context.dispatch('LOAD_ACCOUNTS');
      // } else {
      //   context.dispatch('main/apiError', response.data, {
      //     root: true
      //   });
      // }

      return response.data.success;
    },
  }
};