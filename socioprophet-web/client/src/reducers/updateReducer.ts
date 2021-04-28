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
  if (action.type === 'MISSING_OLD_PASSWORD') {
    return {
      ...state,
      oldPassword: 'Please enter your password!',
      newPassword: '',
      confirmPassword: '',
      confirmDeletePassword: '',
    };
  }
  if (action.type === 'INVALID_NEW_PASSWORD') {
    return {
      ...state,
      oldPassword: '',
      newPassword: 'Must be at least six characters long!',
      confirmPassword: '',
      confirmDeletePassword: '',
    };
  }
  if (action.type === 'NO_MATCH') {
    return {
      ...state,
      oldPassword: '',
      newPassword: '',
      confirmPassword: 'Passwords do not match!',
      confirmDeletePassword: '',
    };
  }
  if (action.type === 'INCORRECT_PASSWORD') {
    return {
      ...state,
      oldPassword: 'Password is incorrect!',
      newPassword: '',
      confirmPassword: '',
      confirmDeletePassword: '',
    };
  }
  if (action.type === 'INCORRECT_PASSWORD') {
    return {
      ...state,
      oldPassword: 'Something went wrong!',
      newPassword: '',
      confirmPassword: '',
      confirmDeletePassword: '',
    };
  }
  if (action.type === 'MISSING_MODAL_PASSWORD') {
    return {
      ...state,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      confirmDeletePassword: 'Please enter your password!',
    };
  }
  if (action.type === 'INCORRECT_MODAL_PASSWORD') {
    return {
      ...state,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      confirmDeletePassword: 'Password is incorrect!',
    };
  }
  if (action.type === 'INCORRECT_MODAL_PASSWORD') {
    return {
      ...state,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      confirmDeletePassword: 'Something went wrong!',
    };
  }

  throw new Error(`no matching action type for action.type: ${action.type}`);
};
