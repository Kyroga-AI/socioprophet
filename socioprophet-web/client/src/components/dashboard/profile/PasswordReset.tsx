import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../../header/Header';
import Footer from '../../footer/Footer';
import { useAuth } from '../../../authentication/contexts/AuthContext';

// email validator
import { validateEmail } from '../../landing/validate-email/validateEmail';

// styles
import './scss/passwordReset.scss';

const PasswordReset: React.FC = () => {
  // states
  const [loading, setLoading] = useState<any>(false);
  const [emailError, setEmailError] = useState('');
  const [notification, setNotification] = useState<string>('');
  // refs
  const emailRef = useRef<HTMLInputElement>(null);
  // custom hooks
  const { resetPassword } = useAuth();
  // other hooks
  const history = useHistory();

  // computed css classes for invalid email error message
  const computedClassName = emailError ? 'reset__container__field__input--error' : '';

  // handles the email submission and sends user to survey
  const handleEmail = async () => {
    if (emailRef.current) {
      // set loading to disable 'begin' button
      setLoading(true);

      // check for valid email and dispatch error accordingly

      if (typeof emailRef.current.value === 'string') {
        if (!validateEmail(emailRef.current.value)) {
          return setEmailError('Invalid email address!');
        }
      }

      // if email check passes, reset any previously dispatched error
      setEmailError('');

      try {
        await resetPassword(emailRef.current.value);
        setNotification('Please check your inbox for further instructions!');
      } catch {
        return setEmailError('An account does not exist with this email address');
      }
      setTimeout(() => {
        history.push('/');
      }, 2000);
    }
  };

  // when user presses 'enter' for email submition
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleEmail();
    } else {
      return;
    }
  };

  return (
    <div className="reset">
      <Header />
      {notification && <p className="reset-notification">{notification}</p>}
      <div className="reset__container">
        <div className="reset__container__field">
          <input
            className={`inputText inputText--lg ${computedClassName}`}
            name="email"
            type="email"
            spellCheck="false"
            ref={emailRef}
            required
            onKeyDown={handleKeyPress}
            placeholder="ENTER EMAIL"
          />
          {emailError && <p className="reset__container__field__error">{emailError}</p>}
        </div>

        <div className="button button--lg" onClick={handleEmail}>
          Send Reset Password Link
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PasswordReset;
