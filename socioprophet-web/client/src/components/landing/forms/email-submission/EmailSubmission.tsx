import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// auth context
import { useAuth } from '../../../../authentication/contexts/AuthContext';

import './scss/emailSubmission.scss';

const EmailSubmission = () => {
  // router hook
  const navigate = useNavigate();
  // custom auth hook
  const { sendEmailAuthentication } = useAuth();

  // check for email query parameter then posts email address to server
  const sendEmail = async () => {
    const email = getEmailParam();

    // if no query param send back to landing page '/'
    if (email === null) {
      navigate('/');
    }

    try {
      sendEmailAuthentication(email);
    } catch (error) {
      console.log(error);
    }
  };

  const getEmailParam = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailAddress = urlParams.get('email_address');
    return emailAddress;
  };

  useEffect(() => {
    sendEmail();
  }, []);

  return (
    <div className="submit">
      <h1 className="submit__heading">Please check your inbox.</h1>
      <p className="submit__instructions">
        We've just sent a link to {getEmailParam()}. Use the link to sign in!
      </p>
      <div className="submit__btn">
        <div className="button button--lg" onClick={() => (window.location.href = '/')}>
          Got it!
        </div>
      </div>
    </div>
  );
};

export default EmailSubmission;
