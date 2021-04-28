interface IAction {
  type: string;
  payload?: boolean;
}

// reducer function...
export const emailReducer = (state: any, action: IAction) => {
  if (action.type === 'SET_LOADING') {
    return {
      ...state,
      loading: action.payload,
    };
  }
  if (action.type === 'EMAIL_ERROR') {
    if (action.payload === true) {
      return {
        ...state,

        error: 'PLEASE ENTER A VALID EMAIL',
      };
    } else {
      return {
        ...state,
        error: '',
      };
    }
  }
  throw new Error(`no matching action type for action.type: ${action.type}`);
};
