import React, { useEffect } from "react";
import { useAuth } from "../../../authentication/contexts/AuthContext";
import { useHistory } from "react-router-dom";

const Redirect = () => {
  const currentUser = useAuth();
  const history = useHistory();
  const { googleSignIn } = useAuth();

  useEffect(() => {
    const signIn = async () => {
      try {
        if (currentUser.currentUser.email) {
          history.push("/alpha");
        }
      } catch (err) {
        console.error(err);
        googleSignIn();
      }
    };

    signIn();
  }, []);

  return () => {
    <div></div>;
  };
};

export default Redirect;
