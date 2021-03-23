import React, { useState, useReducer, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../../authentication/contexts/AuthContext";
import Modal from "react-modal";

// reducer
import { updateReducer } from "../../../reducers/updateReducer";

// styles
import "./styles/updateProfile.css";

// styles for modal
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "550px",
    height: "300px",
    backgroundColor: "#222",
    borderRadius: "10px",
  },
  overlay: {
    color: "red",
  },
};

// set modal to DOM form html 'root' div id
Modal.setAppElement("#root");

const updateState = {
  loading: false,
  passwordErrors: {
    oldPassword: { isError: false, message: "" },
    newPassword: { isError: false, message: "" },
    confirmPassword: { isError: false, message: "" },
    modalPassword: { isError: false, message: "" },
  },
};

const UpdateProfile = () => {
  // states
  const [state, dispatch] = useReducer(updateReducer, updateState);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [logoutError, setLogoutError] = useState({
    isError: false,
    message: "",
  });

  // refs
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const passwordRefModal = useRef();
  // other hooks
  const history = useHistory();
  // custom hooks
  const { currentUser, updatePassword, reAuth, logout, deleteUser } = useAuth();

  // computed css classes based on errors
  const computedClassNameOldPasswordError = state.passwordErrors.oldPassword
    .isError
    ? "update__container__password__field__input--error"
    : "";

  const computedClassNamePasswordError = state.passwordErrors.newPassword
    .isError
    ? "update__container__password__field__input--error"
    : "";

  const computedClassNamePasswordConfirmError = state.passwordErrors
    .confirmPassword.isError
    ? "update__container__password__field__input--error"
    : "";

  const computedClassNamePasswordErrorModal = state.passwordErrors.modalPassword
    .isError
    ? "delete__container__field__input--error"
    : "";

  // closes modal on button click
  const closeModal = () => {
    setIsOpen(false);
  };

  // opens modal on button click
  const openModal = () => {
    setIsOpen(true);
  };

  // handles changing the user password
  const handleChangePassword = async () => {
    // check if a password was entered
    if (oldPasswordRef.current.value === "") {
      return dispatch({ type: "MISSING_OLD_PASSWORD", payload: true });
    }

    // check password created is at least six characters long
    if (passwordRef.current.value.length < 6) {
      return dispatch({ type: "INVALID_NEW_PASSWORD" });
    }

    // check if password and password confirmation are the same
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return dispatch({ type: "NO_MATCH" });
    }

    try {
      // set loading to disable 'begin' button
      dispatch({ type: "SET_LOADING", payload: true });
      // reauthenticte the user before performing update password action
      await reAuth(oldPasswordRef.current.value);
      // update user password with new password reference
      await updatePassword(passwordRef.current.value);
      // push user to the alpha dashboard page
      history.push("/alpha");
    } catch (err) {
      if (err.code === "auth/wrong-password") {
        // dispatch error for wrong password
        return dispatch({ type: "INCORRECT_PASSWORD" });
      } else {
        // another error occured (should be handling all Firebase errors here)
        return dispatch({ type: "ERROR_PASSWORD" });
      }
    }
    // set loading back to false and enable button again
    dispatch({ type: "SET_LOADING", payload: false });
  };

  // when user presses 'enter' for change password submission
  const handleKeyPressPassword = (e) => {
    if (e.key === "Enter") {
      handleChangePassword();
    } else {
      return;
    }
  };

  const handleDelete = async () => {
    if (passwordRefModal.current.value === "") {
      // check if a password was entered
      if (passwordRefModal.current.value === "") {
        return dispatch({ type: "MISSING_MODAL_PASSWORD", payload: true });
      }
    }
    try {
      // set loading to disable 'begin' button
      dispatch({ type: "SET_LOADING", payload: true });
      // reauthenticte the user before performing delete user action
      await reAuth(passwordRefModal.current.value);
      // delete current user
      await deleteUser();
    } catch (err) {
      if (err.code === "auth/wrong-password") {
        // dispatch error for wrong password
        return dispatch({ type: "INCORRECT_MODAL_PASSWORD" });
      } else {
        // another error occured (should be handling all Firebase errors here)
        return dispatch({ type: "INCORRECT_MODAL_PASSWORD" });
      }
    }
    // set loading back to false and enable button again
    dispatch({ type: "SET_LOADING", payload: false });
  };

  // when user presses 'enter' for delete submission
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleDelete();
    } else {
      return;
    }
  };

  // handles the user logout action
  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      return setLogoutError({
        isError: true,
        message: "Failed to logout!",
      });
    }
    history.push("/");
  };

  return (
    <div className="update">
      <h4 className="update__heading">Change Password or Delete Account</h4>
      <p className="update__email">Account Email: {currentUser.email}</p>
      <div className="update__container">
        <div className="update__container__password">
          <div className="update__container__password__field">
            <input
              className={`update__container__password__field__input ${computedClassNameOldPasswordError}`}
              name="old-password"
              type="password"
              spellCheck="false"
              ref={oldPasswordRef}
              required
              onKeyDown={handleKeyPressPassword}
              placeholder="Old Password"
            />
            {state.passwordErrors.oldPassword.isError && (
              <p className="update__container__password__field__error">
                {state.passwordErrors.oldPassword.message}
              </p>
            )}
          </div>
          <div
            style={{ marginTop: "1.5rem" }}
            className="update__container__password__field"
          >
            <input
              className={`update__container__password__field__input ${computedClassNamePasswordError}`}
              name="password"
              type="password"
              spellCheck="false"
              ref={passwordRef}
              required
              onKeyDown={handleKeyPressPassword}
              placeholder="New Password"
            />
            {state.passwordErrors.newPassword.isError && (
              <p className="update__container__password__field__error">
                {state.passwordErrors.newPassword.message}
              </p>
            )}
          </div>
          <div
            style={{ marginTop: "0.9rem" }}
            className="update__container__password__field"
          >
            <input
              className={`update__container__password__field__input ${computedClassNamePasswordConfirmError}`}
              name="password-confirmation"
              type="password"
              spellCheck="false"
              ref={passwordConfirmRef}
              required
              onKeyDown={handleKeyPressPassword}
              placeholder="Confirm New Password"
            />
            {state.passwordErrors.confirmPassword.isError && (
              <p className="update__container__password__field__error">
                {state.passwordErrors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
        <div
          className="update__container__password__btn"
          onClick={handleChangePassword}
          disabled={state.loading}
        >
          Change Password
        </div>
      </div>

      <div className="update__cancel">
        <Link className="update__cancel__link" to="/alpha">
          Cancel
        </Link>
      </div>
      <button
        className="update__btn update__logout"
        disabled={state.loading}
        onClick={handleLogout}
      >
        Logout
      </button>
      {logoutError.isError && (
        <p className="alpha__error">{logoutError.message}</p>
      )}
      <button
        className="update__btn"
        disabled={state.loading}
        onClick={openModal}
      >
        Delete Account
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="SignIn Modal"
      >
        <div className="delete__container">
          <div className="delete__container__field">
            <input
              className={`update__container__password__field__input ${computedClassNamePasswordErrorModal}`}
              name="password"
              type="password"
              spellCheck="false"
              ref={passwordRefModal}
              required
              onKeyDown={handleKeyPress}
              placeholder="ENTER PASSWORD"
            />
            {state.passwordErrors.modalPassword.isError && (
              <p className="update__container__password__field__error">
                {state.passwordErrors.modalPassword.message}
              </p>
            )}
          </div>
          <div
            className="delete__container__btn"
            onClick={handleDelete}
            disabled={state.loading}
          >
            DELETE
          </div>
          <div
            className="delete__container__btn cancel__container__btn"
            onClick={closeModal}
            disabled={state.loading}
          >
            CANCEL
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateProfile;
