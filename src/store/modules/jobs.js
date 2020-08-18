export default {
  namespaced: true,
  state: {
    justCreated: false,
  },
  getters: {},
  mutations: {
    justCreatedShow( state ) {
      state.justCreated = true;
    },
    justCreatedHide( state ) {
      state.justCreated = false;
    },
  },
  actions: {},
};