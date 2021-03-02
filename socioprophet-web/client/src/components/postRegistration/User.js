import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../authentication/contexts/AuthContext";

// styles
import "./styles/user.css";

const User = () => {
  const [redirectId, setRedirectId] = useState("");
  const [survey, setSurvey] = useState(false);
  const [validDocumentId, setValidDocumentId] = useState(false);
  const {
    checkForUserDocument,
    updateUserSurveyCompleted,
    currentUser,
  } = useAuth();
  const passwordRef = useRef();
  const history = useHistory();

  const getId = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    console.log(id);
    if (id != null) {
      if (id.length > 0) {
        console.log(id);
        setRedirectId(id);
        setSurvey(true);
      } else {
      }
    } else {
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await checkForUserDocument(redirectId, passwordRef.current.value);
      await updateUserSurveyCompleted(redirectId);
      history.push("/alpha");
    } catch (err) {
      console.error(`Please fill out the survey to continue`);
    }
  };

  // const logoutForSurvey = async () => {
  //   try {
  //     await logout();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  useEffect(() => {
    // logoutForSurvey();
    // console.log(currentUser);
    getId();
  }, []);

  return (
    <div className="user">
      {survey && (
        <div>
          <h3 className="user__heading">
            Please enter the password you registered with to continue!
          </h3>
          <div className="user__form">
            <label>
              <input
                className="form__input user__form__input"
                name="password"
                type="password"
                required
                placeholder="Enter your password to log in"
                ref={passwordRef}
              />
            </label>
          </div>
          <div className="user__login">
            <button
              className="form__btn user__login__btn"
              onClick={handleClick}
            >
              Log In
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
