interface IAction {
  type: string;
  payload?: boolean;
}

export const loginReducer = (state: any, action: IAction) => {
  if (action.type === 'SET_LOADING') {
    return {
      ...state,
      loading: action.payload,
    };
  }

  if (action.type === 'MISSING_EMAIL') {
    if (action.payload === true) {
      return {
        ...state,
        emailError: 'You must enter your email!',
      };
    } else {
      return {
        ...state,
        emailError: '',
      };
    }
  }
  if (action.type === 'MISSING_PASSWORD') {
    if (action.payload === true) {
      return {
        ...state,
        passwordError: 'Please enter your password!',
      };
    } else {
      return {
        ...state,
        passwordError: '',
      };
    }
  }
  if (action.type === 'INCORRECT_PASSWORD') {
    return {
      ...state,
      passwordError: 'Password is incorrect!',
    };
  }
  if (action.type === 'ERROR_PASSWORD') {
    return {
      ...state,
      passwordError: 'Password or email is incorrect!',
    };
  }

  throw new Error(`no matching action type for action.type: ${action.type}`);
};
