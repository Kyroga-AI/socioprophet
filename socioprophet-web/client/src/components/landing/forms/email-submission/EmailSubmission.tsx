import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './scss/emailSubmission.scss';

const EmailSubmission = () => {
  // router hook
  const history = useHistory();

  // check for email query parameter then posts email address to server
  const sendEmail = async () => {
    const email = getEmailParam();

    // if no query param send back to landing page '/'
    if (email === null) {
      history.push('/');
    }

    // set json data
    const data = { email: email };

    // send post request with fetch
    const response = await fetch('/api/test/data', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    window.localStorage.setItem('signin_email', email);

    return response.json();
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
        We've just sent a link to {getEmailParam()}. Use the link to complete your account set up!
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
