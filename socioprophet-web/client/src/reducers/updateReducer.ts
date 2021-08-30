interface IAction {
  type: string;
  payload?: boolean;
}

export const updateReducer = (state: any, action: IAction) => {
  if (action.type === 'SET_LOADING') {
    return {
      ...state,
      loading: action.payload,
    };
  }

  if (action.type === 'MISSING_MODAL_PASSWORD') {
    return {
      ...state,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      confirmDelete: "Please type 'delete' to confirm",
    };
  }

  throw new Error(`no matching action type for action.type: ${action.type}`);
};
