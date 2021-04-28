interface IAction {
  type: string;
  payload?: boolean;
}

export const registrationReducer = (state: any, action: IAction) => {
  if (action.type === 'SET_LOADING') {
    return {
      ...state,
      loading: action.payload,
    };
  }
  if (action.type === 'SET_EMAIL') {
    return {
      ...state,
      emailAddress: action.payload,
    };
  }
  if (action.type === 'MISSING_PASSWORD') {
    return {
      ...state,
      passwordError: 'Please create a password to continue!',
      confirmationError: '',
    };
  }
  if (action.type === 'INVALID_PASSWORD') {
    return {
      ...state,
      passwordError: 'Must be at least six characters long!',
      confirmationError: '',
    };
  }
  if (action.type === 'NO_MATCH') {
    return {
      ...state,

      passwordError: '',
      confirmationError: 'Passwords do not match!',
    };
  }
  if (action.type === 'EMAIL_TAKEN') {
    return {
      ...state,
      passwordError: '',
      confirmationError: 'A user with this email already exists!',
    };
  }
  throw new Error(`no matching action type for action.type: ${action.type}`);
};
