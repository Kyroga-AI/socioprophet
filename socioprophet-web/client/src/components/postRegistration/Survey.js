import React, { useState, useEffect } from "react";
import { useAuth } from "../../authentication/contexts/AuthContext";
import { db } from "../../authentication/firebase-configuration/firebase";
import SurveyEmbed from "./SurveyEmbed";

import "./styles/survey.css";

const Survey = () => {
  const [id, setId] = useState("");
  const { currentUser, documentId, emailVerification } = useAuth();

  const verifyEmail = async () => {
    try {
      await emailVerification();
    } catch (err) {
      console.error(err);
    }
  };

  /**
   *  random ID generated function, format 'XXXX-XXXX-XXXX'
   */
  const getId = () => {
    const stringNum = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };

    return `${stringNum()}-${stringNum()}-${stringNum()}`;
  };

  const getDocumentId = () => {
    const docRef = db.collection("users");
    docRef.onSnapshot((snapshot) => {
      const docs = snapshot.docs.map((doc) => {
        console.log(currentUser.email);
        if (doc.data().emailAddress === currentUser.email) {
          console.log(doc.id);
          setId(doc.id);
        }
      });
    });
  };

  useEffect(() => {
    // verifyEmail();
    getDocumentId();
  }, []);
  return (
    <div>
      <SurveyEmbed id={id} email={currentUser.email} />
      <p>{id}</p>
    </div>
  );
};

export default Survey;
