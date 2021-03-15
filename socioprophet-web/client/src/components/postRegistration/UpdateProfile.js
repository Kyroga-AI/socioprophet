import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../authentication/contexts/AuthContext";
import Modal from "react-modal";

// styles
import "./styles/updateProfile.css";

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
    backgroundColor: "#333",
    borderRadius: "10px",
  },
  overlay: {
    color: "red",
  },
};

Modal.setAppElement("#root");

const UpdateProfile = () => {
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const passwordRefModal = useRef();
  const { currentUser, updatePassword, reAuth, deleteUser } = useAuth();
  const [error, setError] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState({
    isError: false,
    message: "",
  });
  const [passwordError, setPasswordError] = useState({
    isError: false,
    message: "",
  });
  const [passwordConfirmError, setPasswordConfirmError] = useState({
    isError: false,
    message: "",
  });
  const [passwordErrorModal, setPasswordErrorModal] = useState({
    isError: false,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [modalIsOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleKeyPressPassword = (e) => {
    if (e.key === "Enter") {
      handleChangePassword();
    } else {
      return;
    }
  };

  const handleChangePassword = async () => {
    if (oldPasswordRef.current.value.length == 0) {
      return setOldPasswordError({
        isError: true,
        message: "Please enter your password!",
      });
    }
    if (passwordRef.current.value.length < 6) {
      return setPasswordError({
        isError: true,
        message: "Must be at least six characters long!",
      });
    }
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setPasswordConfirmError({
        isError: true,
        message: "Passwords do not match!",
      });
    }

    setLoading(true);
    try {
      await reAuth(oldPasswordRef.current.value);
      await updatePassword(passwordRef.current.value);
      history.push("/alpha");
    } catch (err) {
      if (err.code === "auth/wrong-password") {
        return setOldPasswordError({
          isError: true,
          message: "Password in incorrect!",
        });
      } else {
        setOldPasswordError({
          isError: true,
          message: "Something went wrong!",
        });
        console.log(err);
      }
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleDelete();
    } else {
      return;
    }
  };

  const handleDelete = async () => {
    if (passwordRefModal.current.value === "") {
      return setPasswordErrorModal({
        isError: true,
        message: "Please enter your password!",
      });
    }

    setPasswordErrorModal({ isError: false });

    setLoading(true);
    try {
      await reAuth(passwordRefModal.current.value);
      await deleteUser();
    } catch (err) {
      if (err.code === "auth/wrong-password") {
        return setPasswordErrorModal({
          isError: true,
          message: "Password in incorrect!",
        });
      } else {
        setPasswordErrorModal({
          isError: true,
          message: "Something went wrong!",
        });
        console.log(err);
      }
    }

    setLoading(false);
  };

  const computedClassNameOldPasswordError = oldPasswordError.isError
    ? "update__password__container__input__text__error"
    : "update__password__container__input__text";

  const computedClassNamePasswordError = passwordError.isError
    ? "update__password__container__input__text__error"
    : "update__password__container__input__text";

  const computedClassNamePasswordConfirmError = passwordConfirmError.isError
    ? "update__password__container__input__text__error"
    : "update__password__container__input__text";

  const computedClassNamePasswordErrorModal = passwordErrorModal.isError
    ? "delete__container__input__text__error"
    : "delete__container__input__text";

  return (
    <div className="update">
      <h4 className="update__heading">Change Password or Delete Account</h4>
      <div className="update__password">
        <div className="update__password__container">
          <div className="update__password__container__input">
            <input
              className={computedClassNameOldPasswordError}
              name="old-password"
              type="password"
              spellCheck="false"
              ref={oldPasswordRef}
              required
              onKeyDown={handleKeyPressPassword}
              placeholder="Old Password"
            />
            {oldPasswordError.isError && (
              <p className="update__password__container__input__error">
                {oldPasswordError.message}
              </p>
            )}
          </div>
          <div
            style={{ marginTop: "1.5rem" }}
            className="update__password__container__input"
          >
            <input
              className={computedClassNamePasswordError}
              name="password"
              type="password"
              spellCheck="false"
              ref={passwordRef}
              required
              onKeyDown={handleKeyPressPassword}
              placeholder="New Password"
            />
            {passwordError.isError && (
              <p className="update__password__container__input__error">
                {passwordError.message}
              </p>
            )}
          </div>
          <div
            style={{ marginTop: "0.9rem" }}
            className="update__password__container__input"
          >
            <input
              className={computedClassNamePasswordConfirmError}
              name="password-confirmation"
              type="password"
              spellCheck="false"
              ref={passwordConfirmRef}
              required
              onKeyDown={handleKeyPressPassword}
              placeholder="Confirm New Password"
            />
            {passwordConfirmError.isError && (
              <p className="update__password__container__input__error">
                {passwordConfirmError.message}
              </p>
            )}
          </div>
        </div>
        <div
          className="update__password__container__input__btn"
          onClick={handleChangePassword}
          disabled={loading}
        >
          Change Password
        </div>
      </div>
      {/* {error && <p className="update__error">{error}</p>}
      <form className="update__form" onSubmit={handleSubmit}>
        <div className="update__form__label">
          <label>
            <span className="update__form__label__text">New Password</span>
            <input
              className="update__form__input"
              name="password"
              type="password"
              placeholder="Leave blank to keep the same"
              ref={passwordRef}
            />
          </label>
        </div>
        <div className="update__form__label">
          <label>
            <span className="update__form__label__text">
              Password Confirmation
            </span>
            <input
              className="update__form__input"
              name="password-confirmation"
              type="password"
              placeholder="Leave blank to keep the same"
              ref={passwordConfirmRef}
            />
          </label>
        </div>
        <button className="update__form__btn" disabled={loading} type="submit">
          Change Password
        </button> */}
      <div className="update__form__cancel">
        <Link className="update__form__cancel__link" to="/">
          Cancel
        </Link>
      </div>
      <button
        className="update__form__delete"
        disabled={loading}
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
          <div className="delete__container__input">
            <input
              className={computedClassNamePasswordErrorModal}
              name="password"
              type="password"
              spellCheck="false"
              ref={passwordRefModal}
              required
              onKeyDown={handleKeyPress}
              placeholder="ENTER PASSWORD"
            />
            {passwordErrorModal.isError && (
              <p className="main__background__email__input__error">
                {passwordErrorModal.message}
              </p>
            )}
          </div>
          <div
            className="delete__container__input__btn"
            onClick={handleDelete}
            disabled={loading}
          >
            DELETE
          </div>
          <div
            className="delete__container__input__btn cancel__delete__btn"
            onClick={closeModal}
            disabled={loading}
          >
            CANCEL
          </div>
        </div>
      </Modal>
      {/* </form> */}
    </div>
  );
};

export default UpdateProfile;
