import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../authentication/contexts/AuthContext";

const Users = () => {
  const currentUser = useAuth();
  const { googleSignIn } = useAuth();
  const { surveyResponseCompleted } = useAuth();
  const history = useHistory();

  const toDashboard = () => {
    // e.preventDefault();

    history.push(`/${currentUser.currentUser.uid}`);
  };

  const signInUser = async () => {
    try {
      if (!currentUser) {
        await googleSignIn();
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    const surveyCompleted = () => {
      surveyResponseCompleted();
    };

    surveyCompleted();
    signInUser();
    toDashboard();
  }, []);
  return (
    <>
      {/* <h1>Thank you for completing the survey</h1>
      <button onClick={toDashboard}>
        Continue to Dashboard {currentUser.currentUser.displayName}
      </button> */}
    </>
  );
};

export default Users;
