import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../authentication/contexts/AuthContext";

import "./styles/verifyEmail.css";

const VerifyEmail = () => {
  const { currentUser, applyVerificationCode } = useAuth();
  const history = useHistory();
  const [mode, setMode] = useState("");
  const [actionCode, setActionCode] = useState("");

  const verifyEmail = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const mode = urlParams.get("mode");
    setMode(mode);
    const actionCode = urlParams.get("oobCode");
    setActionCode(actionCode);

    try {
      applyVerificationCode(actionCode);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // verifyEmail();
    console.log("lol");
  }, []);

  return (
    <div className="verify">
      stuff
      {mode === "verifyEmail" && currentUser.emailVerified && (
        <>
          <h2 className="verify__heading">Email Verified!</h2>
          <h4 className="verify__email">{currentUser.email}</h4>
          <div className="verify__signin">
            <button
              className="verify__signin__btn"
              onClick={() => {
                history.push("/");
              }}
            >
              Back to Sign In
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default VerifyEmail;
