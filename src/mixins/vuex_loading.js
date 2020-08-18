export const mixinSetLoading = {
  SET_LOADING: (state, data) => {
    state.loading[data.param] = data.value;
  }
};