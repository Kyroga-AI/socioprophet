import React, { useState, useRef, useReducer } from 'react';
import { useAuth } from '../../../authentication/contexts/AuthContext';

// reducer
import { updateReducer } from '../../../reducers/updateReducer';

// styles
import './scss/profile.scss';

const updateState = {
  loading: false,
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
  confirmDeletePassword: '',
};

const Profile = () => {
  // states
  const [state, dispatch] = useReducer(updateReducer, updateState);
  const [verification, setVerification] = useState({
    isError: false,
    message: '',
    sending: false,
  });
  const [changePassword, setChangePassword] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [renderDeleteConfirmation, setRenderDeleteConfirmation] = useState(false);
  const [logoutError, setLogoutError] = useState('');

  // refs
  const oldPasswordRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const passwordConfirmDeleteRef = useRef<HTMLInputElement>(null);

  const { currentUser, emailVerification, reAuth, updatePassword, logout, deleteUser } = useAuth();

  // computed css classes based on errors
  const computedClassNameOldPasswordError = state.oldPassword
    ? 'profile__container__password__field__input--error'
    : '';

  const computedClassNamePasswordError = state.newPassword
    ? 'profile__container__password__field__input--error'
    : '';

  const computedClassNamePasswordConfirmError = state.confirmPassword
    ? 'profile__container__password__field__input--error'
    : '';

  const computedClassNamePasswordConfirmDeleteError = state.confirmDeletePassword
    ? 'profile__container__password__field__input--error'
    : '';

  const sendVerificationLink = async () => {
    try {
      setVerification({
        isError: false,
        message: `Verification link is being sent to ${currentUser.email}!`,
        sending: true,
      });
      await emailVerification();
    } catch (err) {
      console.log(err);

      setVerification({
        isError: true,
        message: 'There was a problem sending the verification link, please wait and try again.',
        sending: false,
      });
    }
  };

  // handles changing the user password
  const handleChangePassword = async () => {
    if (oldPasswordRef.current && passwordRef.current && passwordConfirmRef.current) {
      // check if a password was entered
      if (oldPasswordRef.current.value === '') {
        return dispatch({ type: 'MISSING_OLD_PASSWORD', payload: true });
      }

      // check password created is at least six characters long
      if (passwordRef.current.value.length < 6) {
        return dispatch({ type: 'INVALID_NEW_PASSWORD' });
      }

      // check if password and password confirmation are the same
      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        return dispatch({ type: 'NO_MATCH' });
      }

      try {
        // set loading to disable 'begin' button
        dispatch({ type: 'SET_LOADING', payload: true });
        // reauthenticte the user before performing update password action
        await reAuth(oldPasswordRef.current.value);
        // update user password with new password reference
        await updatePassword(passwordRef.current.value);
      } catch (err) {
        if (err.code === 'auth/wrong-password') {
          // dispatch error for wrong password
          return dispatch({ type: 'INCORRECT_PASSWORD' });
        } else {
          // another error occured (should be handling all Firebase errors here)
          return dispatch({ type: 'ERROR_PASSWORD' });
        }
      }
      // set loading back to false and enable button again
      dispatch({ type: 'SET_LOADING', payload: false });
      setChangePassword(changePassword === false ? true : false);
      setPasswordUpdated(true);
      setTimeout(() => {
        setPasswordUpdated(false);
      }, 2000);
    }
  };

  // when user presses 'enter' for delete submission
  const handleKeyPressChangePassword = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleChangePassword();
    } else {
      return;
    }
  };

  // handles the user logout action
  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      return setLogoutError('Failed to logout!');
    }
  };

  const handleDelete = async () => {
    if (passwordConfirmDeleteRef.current) {
      if (passwordConfirmDeleteRef.current.value === '') {
        // check if a password was entered
        if (passwordConfirmDeleteRef.current.value === '') {
          return dispatch({ type: 'MISSING_MODAL_PASSWORD', payload: true });
        }
      }
      try {
        // set loading to disable 'begin' button
        dispatch({ type: 'SET_LOADING', payload: true });
        // reauthenticte the user before performing delete user action
        await reAuth(passwordConfirmDeleteRef.current.value);
        // delete current user
        await deleteUser();
      } catch (err) {
        if (err.code === 'auth/wrong-password') {
          // dispatch error for wrong password
          console.log(err);
          return dispatch({ type: 'INCORRECT_MODAL_PASSWORD' });
        } else {
          // another error occured (should be handling all Firebase errors here)
          return dispatch({ type: 'INCORRECT_MODAL_PASSWORD' });
        }
      }
      // set loading back to false and enable button again
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // when user presses 'enter' for delete submission
  const handleKeyPressDelete = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleDelete();
    } else {
      return;
    }
  };

  return (
    <div className="profile">
      <div className="profile__container">
        <div className="profile__container__header">
          <p className="profile__container__header__heading">My Account</p>
          <p className="profile__container__header__creationTime">
            Created {currentUser.metadata.creationTime}
          </p>
        </div>

        <div className="profile__container__user">
          {currentUser.emailVerified ? (
            <p>
              <span style={{ color: '#777' }}>Email:</span> {currentUser.email}
              <span className="email-verified">Verified</span>
            </p>
          ) : (
            <>
              <p>
                Email: {currentUser.email}
                <span className="email-not-verified">Not Verified</span>
              </p>
              <p className="verification-link" onClick={sendVerificationLink}>
                Verify Email Address
              </p>
              {verification.sending && (
                <p className="update-notification">{verification.message}</p>
              )}
              {verification.isError && (
                <p className="verification-link--error">{verification.message}</p>
              )}
            </>
          )}
          <div className="profile__container__user__password">
            <p
              className="profile__container__user__password__btn"
              onClick={() => {
                setChangePassword(changePassword === false ? true : false);
              }}
            >
              Change Password
            </p>
            {passwordUpdated && <p className="update-notification">Password has been changed!</p>}
            {changePassword && (
              <div className="profile__container__user__password__field">
                <input
                  className={`inputText inputText--sm ${computedClassNameOldPasswordError}`}
                  name="old-password"
                  type="password"
                  spellCheck="false"
                  ref={oldPasswordRef}
                  required
                  placeholder="Old Password"
                />
                {state.oldPassword && (
                  <p className="profile__container__password__field__error">{state.oldPassword}</p>
                )}
                <input
                  className={`inputText inputText--sm ${computedClassNamePasswordError}`}
                  style={{ marginTop: '20px' }}
                  name="password"
                  type="password"
                  spellCheck="false"
                  ref={passwordRef}
                  required
                  placeholder="New Password"
                />
                {state.newPassword && (
                  <p className="profile__container__password__field__error">{state.newPassword}</p>
                )}
                <input
                  className={`inputText inputText--sm ${computedClassNamePasswordConfirmError}`}
                  name="password-confirmation"
                  type="password"
                  spellCheck="false"
                  ref={passwordConfirmRef}
                  required
                  onKeyDown={handleKeyPressChangePassword}
                  placeholder="Confirm New Password"
                />
                {state.confirmPassword && (
                  <p className="profile__container__password__field__error">
                    {state.confirmPassword}
                  </p>
                )}
                <div
                  style={{ marginTop: '20px' }}
                  className="button button--sm"
                  onClick={handleChangePassword}
                >
                  Update
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="profile__container__footer">
          <div className="profile__container__footer__btn logout" onClick={handleLogout}>
            Sign out
          </div>
          {logoutError && <p className="logout-error">{logoutError}</p>}
          <div
            className="profile__container__footer__btn delete"
            onClick={() => {
              setRenderDeleteConfirmation(renderDeleteConfirmation === false ? true : false);
            }}
          >
            Delete Account
          </div>
          {renderDeleteConfirmation && (
            <>
              <div className="profile__container__footer__confirm">
                <input
                  className={`inputText inputText--sm ${computedClassNamePasswordConfirmDeleteError}`}
                  name="password-delete-confirm"
                  type="password"
                  spellCheck="false"
                  ref={passwordConfirmDeleteRef}
                  required
                  onKeyDown={handleKeyPressDelete}
                  placeholder="Enter Password"
                />

                <div className="button button--sm" onClick={handleDelete}>
                  Confirm Delete
                </div>
              </div>
              {state.confirmDeletePassword && (
                <p className="logout-error">{state.confirmDeletePassword}</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
