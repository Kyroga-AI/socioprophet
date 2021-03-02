import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import SurveyEmbed from "./SurveyEmbed";

import "./styles/survey.css";

const Survey = () => {
  const [surveyEmail, setSurveyEmail] = useState("");
  const history = useHistory();

  // const verifyEmail = async () => {
  //   try {
  //     await emailVerification();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const getEmailAddress = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailAddress = urlParams.get("email_address");

    if (emailAddress === null) {
      history.push("/");
    }

    setSurveyEmail(emailAddress);
  };
  useEffect(() => {
    getEmailAddress();
    console.log(surveyEmail);

    // verifyEmail(); this will be moved to after user is registered and authenticated (not here)...
    // https: getDocumentId();
  }, []);
  return (
    <div className="survey">
      <SurveyEmbed id={surveyEmail} />
    </div>
  );
};

export default Survey;
