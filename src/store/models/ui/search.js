const initialState = {
  isSearchFocused: false
};

export const searchUi = {
  state: initialState,
  reducers: {
    setIsSearchFocused(state, isSearchFocused) {
      return {
        ...state,
        isSearchFocused
      }
    },
    reset() {
      return initialState;
    }
  }
};
