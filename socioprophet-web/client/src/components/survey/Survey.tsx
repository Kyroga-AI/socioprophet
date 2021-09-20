import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SurveyEmbed from './SurveyEmbed';

// styles
import './scss/survey.scss';

const Survey = (): JSX.Element => {
  const [surveyId, setSurveyId] = useState<string | null>('');

  const history = useHistory();

  // gets user email address and if one does not exist in url then redirects back to landing page
  const getId = async (): Promise<void> => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (id === null) {
      history.push('/');
    }

    setSurveyId(id);
  };

  // on render, gets the user email address from url
  useEffect(() => {
    getId();
  }, []);

  return (
    <div className="survey">
      <SurveyEmbed id={surveyId} />
    </div>
  );
};
export default Survey;
