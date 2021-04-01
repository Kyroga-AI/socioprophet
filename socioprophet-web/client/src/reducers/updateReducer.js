export const updateReducer = (state, action) => {
  if (action.type === "SET_LOADING") {
    return {
      ...state,
      loading: action.payload,
    };
  }
  if (action.type === "MISSING_OLD_PASSWORD") {
    return {
      ...state,
      passwordErrors: {
        oldPassword: {
          isError: true,
          message: "Please enter your password!",
        },
        newPassword: { isError: false, message: "" },
        confirmPassword: { isError: false, message: "" },
        confirmDeletePassword: { isError: false, message: "" },
      },
    };
  }
  if (action.type === "INVALID_NEW_PASSWORD") {
    return {
      ...state,
      passwordErrors: {
        oldPassword: { isError: false, message: "" },
        newPassword: {
          isError: true,
          message: "Must be at least six characters long!",
        },
        confirmPassword: { isError: false, message: "" },
        confirmDeletePassword: { isError: false, message: "" },
      },
    };
  }
  if (action.type === "NO_MATCH") {
    return {
      ...state,
      passwordErrors: {
        oldPassword: { isError: false, message: "" },
        newPassword: { isError: false, message: "" },
        confirmPassword: { isError: true, message: "Passwords do not match!" },
        confirmDeletePassword: { isError: false, message: "" },
      },
    };
  }
  if (action.type === "INCORRECT_PASSWORD") {
    return {
      ...state,
      passwordErrors: {
        oldPassword: { isError: true, message: "Password is incorrect!" },
        newPassword: { isError: false, message: "" },
        confirmPassword: { isError: false, message: "" },
        confirmDeletePassword: { isError: false, message: "" },
      },
    };
  }
  if (action.type === "INCORRECT_PASSWORD") {
    return {
      ...state,
      passwordErrors: {
        oldPassword: { isError: true, message: "Something went wrong!" },
        newPassword: { isError: false, message: "" },
        confirmPassword: { isError: false, message: "" },
        confirmDeletePassword: { isError: false, message: "" },
      },
    };
  }
  if (action.type === "MISSING_MODAL_PASSWORD") {
    return {
      ...state,
      passwordErrors: {
        oldPassword: { isError: false, message: "" },
        newPassword: { isError: false, message: "" },
        confirmPassword: { isError: false, message: "" },
        confirmDeletePassword: {
          isError: true,
          message: "Please enter your password!",
        },
      },
    };
  }
  if (action.type === "INCORRECT_MODAL_PASSWORD") {
    return {
      ...state,
      passwordErrors: {
        oldPassword: { isError: false, message: "" },
        newPassword: { isError: false, message: "" },
        confirmPassword: { isError: false, message: "" },
        confirmDeletePassword: {
          isError: true,
          message: "Password is incorrect!",
        },
      },
    };
  }
  if (action.type === "INCORRECT_MODAL_PASSWORD") {
    return {
      ...state,
      passwordErrors: {
        oldPassword: { isError: false, message: "" },
        newPassword: { isError: false, message: "" },
        confirmPassword: { isError: false, message: "" },
        confirmDeletePassword: {
          isError: true,
          message: "Something went wrong!",
        },
      },
    };
  }

  throw new Error(`no matching action type for action.type: ${action.type}`);
};
