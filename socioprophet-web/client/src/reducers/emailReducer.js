// reducer function...
export const emailReducer = (state, action) => {
  if (action.type === "SET_LOADING") {
    return {
      ...state,
      loading: action.payload,
    };
  }
  if (action.type === "EMAIL_ERROR") {
    if (action.payload === true) {
      return {
        ...state,
        emailError: { isError: true, message: "PLEASE ENTER A VALID EMAIL" },
      };
    } else {
      return {
        ...state,
        emailError: { isError: false, message: "" },
      };
    }
  }
  throw new Error(`no matching action type for action.type: ${action.type}`);
};
