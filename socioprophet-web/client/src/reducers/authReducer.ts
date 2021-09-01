interface IAction {
  type: string;
  payload?: string;
}

// reducer function...
export const authReducer = (state: any, action: IAction): any => {
  if (action.type === 'SET_LOADING') {
    if (state.loading === true) {
      return {
        ...state,
        loading: false,
      };
    }
    if (state.loading === false) {
      return {
        ...state,
        loading: true,
      };
    }
  }
  if (action.type === 'EMAIL_ERROR') {
    return {
      ...state,
      error: action.payload,
    };
  }
  if (action.type === 'INVALID_CONFIRMATION') {
    return {
      ...state,
      confirmation: action.payload,
    };
  }
  throw new Error(`no matching action type for action.type: ${action.type}`);
};
