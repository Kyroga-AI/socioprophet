import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../authentication/contexts/AuthContext";

import "./styles/survey.css";

const Survey = () => {
  const history = useHistory();
  const { emailVerification } = useAuth();

  const finishSurvey = (e) => {
    e.preventDefault();

    history.push("/alpha");
  };

  const verifyEmail = async () => {
    try {
      if (!currentUser) {
        await emailVerification();
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    verifyEmail();
  }, []);
  return (
    <div>
      <iframe
        id="typeform-full"
        width="100%"
        height="100%"
        frameBorder="0"
        allow="camera; microphone; autoplay; encrypted-media;"
        src="https://form.typeform.com/to/Uo505jQQ?typeform-medium=embed-snippet"
      ></iframe>
      {/* <button
        onClick={() => {
          history.push("/alpha");
        }}
      ></button> */}
    </div>
  );
};

export default Survey;
