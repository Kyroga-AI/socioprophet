import React from "react";
import { useAuth } from "../../authentication/contexts/AuthContext";

const SurveyEmbed = ({ id, email }) => {
  const getSrc = () => {
    const surveyId = `id=${id}`;
    const surveyEmail = `email=${email}`;
    console.log("This id value is -> " + id);
    return `https://form.typeform.com/to/Uo505jQQ?typeform-medium=embed-snippet#${surveyId}&${surveyEmail}`;
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
