export const registrationReducer = (state, action) => {
  if (action.type === "SET_LOADING") {
    return {
      ...state,
      loading: action.payload,
    };
  }
  if (action.type === "SET_EMAIL") {
    return {
      ...state,
      emailAddress: action.payload,
    };
  }
  if (action.type === "MISSING_PASSWORD") {
    return {
      ...state,
      errors: {
        passwordError: {
          isError: true,
          message: "Please create a password to continue!",
        },
        confirmationError: { isError: false, message: "" },
      },
    };
  }
  if (action.type === "INVALID_PASSWORD") {
    return {
      ...state,
      errors: {
        passwordError: {
          isError: true,
          message: "Must be at least six characters long!",
        },
        confirmationError: { isError: false, message: "" },
      },
    };
  }
  if (action.type === "NO_MATCH") {
    return {
      ...state,
      errors: {
        passwordError: { isError: false, message: "" },
        confirmationError: {
          isError: true,
          message: "Passwords do not match!",
        },
      },
    };
  }
  if (action.type === "EMAIL_TAKEN") {
    return {
      ...state,
      errors: {
        passwordError: { isError: false, message: "" },
        confirmationError: {
          isError: true,
          message: "A user with this email already exists!",
        },
      },
    };
  }
  throw new Error(`no matching action type for action.type: ${action.type}`);
};
