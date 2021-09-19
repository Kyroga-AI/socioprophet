import React from 'react';

const SurveyEmbed = (id: { id: string }): JSX.Element => {
  const DEV_SURVEY = 'https://form.typeform.com/to/Pm2Pmwsd?typeform-medium=embed-snippet#';
  const PROD_SURVEY = 'https://form.typeform.com/to/Uo505jQQ?typeform-medium=embed-snippet#';

  const getSrc = (): string => {
    const surveyId: string = `id=${id}`;

    if (process.env.NODE_ENV === 'development') {
      return `${DEV_SURVEY}${surveyId}`;
    } else {
      return `${PROD_SURVEY}${surveyId}`;
    }
  };

  return (
    <div>
      <iframe
        id="typeform-full"
        width="100%"
        height="100%"
        frameBorder="0"
        allow="camera; microphone; autoplay; encrypted-media;"
        src={getSrc()}
      ></iframe>
    </div>
  );
};

export default SurveyEmbed;
