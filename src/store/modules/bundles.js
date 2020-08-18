export default {
  namespaced: true,
  state: {
    justCreated: false,
    justUpdated: false,
  },
  getters: {},
  mutations: {
    justCreatedShow( state ) {
      state.justCreated = true;
    },
    justCreatedHide( state ) {
      state.justCreated = false;
    },
    justUpdatedShow( state ) {
      state.justUpdated = true;
    },
    justUpdatedHide( state ) {
      state.justUpdated = false;
    },
  },
  actions: {},
};