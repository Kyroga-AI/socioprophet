export const loginReducer = (state, action) => {
  if (action.type === "SET_LOADING") {
    return {
      ...state,
      loading: action.payload,
    };
  }

  if (action.type === "MISSING_EMAIL") {
    if (action.payload === true) {
      return {
        ...state,
        emailError: { isError: true, message: "You must enter your email!" },
      };
    } else {
      return {
        ...state,
        emailError: { isError: false, message: "" },
      };
    }
  }
  if (action.type === "MISSING_PASSWORD") {
    if (action.payload === true) {
      return {
        ...state,
        passwordError: {
          isError: true,
          message: "Please enter your password!",
        },
      };
    } else {
      return {
        ...state,
        passwordError: { isError: false, message: "" },
      };
    }
  }
  if (action.type === "INCORRECT_PASSWORD") {
    return {
      ...state,
      passwordError: {
        isError: true,
        message: "Password is incorrect!",
      },
    };
  }
  if (action.type === "ERROR_PASSWORD") {
    return {
      ...state,
      passwordError: {
        isError: true,
        message: "Something went wrong!",
      },
    };
  }

  throw new Error(`no matching action type for action.type: ${action.type}`);
};
