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
    users: {
      all: [],
      selected: localStorage.getItem('adsmanager-users-selected')
        ? JSON.parse(localStorage.getItem('adsmanager-users-selected') || '')
        : [],
      filtered: [],
      forEdit: {}
    },
    loading: {
      mainTable: false,
      addDialog: false,
      editDialog: false,
    },
    dialogs: {
      add: false,
      edit: false,
    },
    stat: [],
  },
  getters: {
    ...mixinDialogGetters,

    allUsers: state  => state.users.all,
    users: (state) => state.users,
    selected: (state) => state.users.selected,
    loading: (state) => state.loading,
    stat: (state) => state.stat,
    forEdit: state => state.users.forEdit
  },
  mutations: {
    ...mixinDialogMutations,
    ...mixinSetLoading,

    SET_ALL_USERS: (state, users) => {
      state.users.all = users;
    },

    FILTER: (state) => {
      state.users.filtered = state.users.all;
    },

    SET_STAT: (state, stat) => {
      state.stat = stat;
    },

    SET_SELECTED: (state, data) => {
      state.users.selected = data;
      localStorage.setItem('adsmanager-users-selected', JSON.stringify(data));
    },

    SET_USER_FOR_EDIT: (state, user) => {
      state.users.forEdit = user;
    }
  },
  actions: {
    ...mixinDialogActions,

    async loadUsers(context, payload = true) {
      const response = await this._vm.api('/users');
      if (response.data.success) {
        context.commit('SET_ALL_USERS', response.data.data);
        context.commit('FILTER', null);
        if (payload) {
          context.dispatch('loadStat');
        }
      }

      return true;
    },

    async loadStat({commit, dispatch, rootState}) {
      commit('SET_LOADING', {
        param: 'mainTable',
        value: true,
      });

      const data = {
        ids: rootState.users.users.filtered.map((user) => user.id),
        dates: rootState.adsmanager.filters.dates,
      };
      const response = await this._vm.api
        .post('/stat/by_user', data)
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

    async clearSelected({commit}) {
      commit('SET_SELECTED', []);
    },

    async addUser({commit, dispatch}, payload) {
      commit('SET_LOADING', {
        param: 'addDialog',
        value: true,
      });

      const response = await this._vm.api
        .post('/users/add', payload)
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
        dispatch('loadUsers');
        dispatch('loadStat');
      } else {
        dispatch(
          'main/apiError', 
          {
            request: payload,
            response: response.data,
          },    
          {
            root: true,
          }
        );
      }
      
      return response.data.success || false;
    },

    async saveUser({
      commit,
      dispatch
    }, payload) {
      commit('SET_LOADING', {
        param: 'addDialog',
        value: true,
      });

      const response = await this._vm.api
        .post('/users/update', payload)
        .catch(error => {
          dispatch(
            'main/apiError', {
              request: payload,
              response: error
            }, {
              root: true,
            }
          );
        });

      if (response.data.success || false) {
        dispatch('loadUsers');
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

      commit('SET_LOADING', {
        param: 'addDialog',
        value: false,
      });

      return response.data.success;
    },

    async setUserForEdit({commit}, user) {
      commit('SET_USER_FOR_EDIT', user);
    },

    async deleteUser({
      commit,
      dispatch
    }, payload) {
      const data = {
        id: payload
      };
      const response = await this._vm.api
        .post('/users/delete', data)
        .catch(error => {
          dispatch(
            'main/apiError', {
              request: payload,
              response: error
            }, {
              root: true,
            }
          );
        });

      if (response.data.success || false) {
        commit('SET_SELECTED', []);
        dispatch('loadUsers');
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

      return response.data.success;
    },
  },
};