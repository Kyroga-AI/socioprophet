import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SurveyEmbed from './SurveyEmbed';

// styles
import './scss/survey.scss';

const Survey = () => {
  const [surveyEmail, setSurveyEmail] = useState<string | null>('');
  const history = useHistory();

  // gets user email address and if one does not exist in url then redirects back to landing page
  const getEmailAddress = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailAddress = urlParams.get('email_address');

    if (emailAddress === null) {
      history.push('/');
    }

    setSurveyEmail(emailAddress);
  };

  // on render, gets the user email address from url
  useEffect(() => {
    getEmailAddress();
  }, []);

  return (
    <div className="survey">
      <SurveyEmbed id={surveyEmail} />
    </div>
  );
};

export default Survey;
