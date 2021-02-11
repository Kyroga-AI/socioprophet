import React, { useState, useEffect } from "react";
import { useAuth } from "../../authentication/contexts/AuthContext";

import SurveyEmbed from "./SurveyEmbed";

import "./styles/survey.css";

const Survey = () => {
  const [surveyId, setSurveyId] = useState(0);
  const { emailVerification } = useAuth();
  const { currentUser } = useAuth();

  const verifyEmail = async () => {
    try {
      await emailVerification();
    } catch (err) {
      console.error(err);
    }
  };

  const getId = () => {
    const stringNum = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };

    return `${stringNum()}-${stringNum()}-${stringNum()}`;
  };

  useEffect(() => {
    verifyEmail();
    const id = getId();
    setSurveyId(id);
  }, []);
  return (
    <div>
      <SurveyEmbed id={surveyId} email={currentUser.email} />
    </div>
  );
};

export default Survey;
