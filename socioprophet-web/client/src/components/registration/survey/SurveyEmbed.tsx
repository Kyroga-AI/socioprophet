import React from 'react';

interface Props {
  id: string;
}

const SurveyEmbed = ({ id }: Props) => {
  const getSrc = () => {
    const surveyId = `id=${id}`;

    if (process.env.NODE_ENV === 'development') {
      return `https://form.typeform.com/to/Pm2Pmwsd?typeform-medium=embed-snippet#${surveyId}`;
    } else {
      return `https://form.typeform.com/to/Uo505jQQ?typeform-medium=embed-snippet#${surveyId}`;
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
