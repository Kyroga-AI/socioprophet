import React, { useState, useRef, useReducer } from 'react';
import { useAuth } from '../../../authentication/contexts/AuthContext';
import { useDarkMode } from './ThemeContext';
// reducer
import { updateReducer } from '../../../reducers/updateReducer';

// styles
import './scss/profile.scss';

const updateState = {
  loading: false,
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
  confirmDelete: '',
};

const Profile = () => {
  // states
  const [state, dispatch] = useReducer(updateReducer, updateState);

  const [renderDeleteConfirmation, setRenderDeleteConfirmation] = useState<boolean>(false);
  const [logoutError, setLogoutError] = useState('');
  const [deletion, setDeletion] = useState<string>('');

  // refs
  const confirmDeleteRef = useRef<HTMLInputElement>(null);

  const { supabaseSession, logout, deleteUser } = useAuth();

  const { theme, toggleTheme, componentMounted } = useDarkMode();

  let themeClass = '';

  if (!componentMounted) {
    return <div />;
  }
  if (theme === 'light') {
    themeClass = 'lightTheme';
  } else {
    themeClass = 'darkTheme';
  }

  const computedClassNameConfirmDeleteError = state.confirmDelete
    ? 'profile__container__password__field__input--error'
    : '';

  // handles the user logout action
  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      return setLogoutError('Failed to logout!');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(supabaseSession.user.id);
    } catch (error) {
      console.log(error + 'failed to remove user from users');
    }
  };

  const validateConfirmation = (): boolean => {
    if (confirmDeleteRef.current) {
      if (confirmDeleteRef.current.value === '' || confirmDeleteRef.current.value !== 'delete') {
        return false;
      }
      return true;
    }

    return false;
  };

  // when user presses 'enter' for delete submission
  const handleKeyPressDelete = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleAccountDeletion();
    } else {
      return;
    }
  };

  const handleAccountDeletion = async () => {
    let confirm = validateConfirmation();

    if (!confirm) {
      return dispatch({ type: 'MISSING_MODAL_PASSWORD', payload: true });
    }

    setDeletion('deleting account...');

    handleDelete();

    const data = { user_id: supabaseSession.user.id };

    const response = await fetch('/api/auth/user', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.status === 200) {
      handleLogout();
    } else {
      alert('Account could not be deleted, please try again in a few minutes.');
    }
  };

  return (
    <div className={`profile ${themeClass}`}>
      <div className="profile__container">
        <div className="profile__container__header">
          <p className="profile__container__header__heading">My Account</p>
          {/* <p className="profile__container__header__creationTime">
           
          </p> */}
          <span style={{ fontSize: '12px', marginTop: '0' }}>Theme (Dark or Light)</span>
          {/* <button
            className={`${themeClass} profile__container__header__toggle`}
            onClick={toggleTheme}
          >
            hi
          </button> */}
          <div className={`${themeClass} profile__container__header__toggle`}>
            <label className="switch">
              <input type="checkbox" onClick={toggleTheme} />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        <div className="profile__container__user">
          <span style={{ color: '#777' }}>Email:</span> {supabaseSession.user.email}
        </div>
        <div className={`profile__container__footer ${themeClass}`}>
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
                  className={`inputText inputText--sm ${computedClassNameConfirmDeleteError}`}
                  name="confirmation"
                  type="text"
                  ref={confirmDeleteRef}
                  spellCheck="false"
                  required
                  onKeyDown={handleKeyPressDelete}
                  placeholder="Type 'delete'"
                />

                <div className="button button--sm" onClick={handleAccountDeletion}>
                  Confirm Delete
                </div>
              </div>
              {state.confirmDelete && <p className="logout-error">{state.confirmDelete}</p>}
              {deletion && (
                <p style={{ color: '#3e593a', fontSize: '20px' }} className="logout-error">
                  {deletion}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
