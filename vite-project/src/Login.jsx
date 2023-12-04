import React, { useCallback, useState } from "react";
// import "./app.css";
import { User } from "./User"; // component display user (see detail on /example directory)

import.meta.env;
import { LoginSocialGoogle, LoginSocialGithub } from "reactjs-social-login";

// CUSTOMIZE ANY UI BUTTON
import {
  GoogleLoginButton,
  GithubLoginButton,
} from "react-social-login-buttons";

import {
  createRoutesFromChildren,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

// import { ReactComponent as PinterestLogo } from "./assets/pinterest.svg";
// import { ReactComponent as TiktokLogo } from "./assets/tiktok.svg";

// REDIRECT URL must be same with URL where the (reactjs-social-login) components is locate
// MAKE SURE the (reactjs-social-login) components aren't unmounted or destroyed before the ask permission dialog closes
const REDIRECT_URI = window.location.href;

const Login = () => {
  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState(null);

  const onLoginStart = useCallback(() => {
    alert("login start");
  }, []);

  const navigate = useNavigate();
  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider("");
    alert("logout success");
  }, []);
  // console.log(process.env.development.VITE_APP_GG_APP_ID);
  console.log(import.meta.env.VITE_APP_GG_APP_ID);
  // console.log(process.env.VITE_APP_GG_APP_ID);
  // console.log(.env.REACT_APP_GG_APP_ID)
  // console.log(import.meta.env.development.REACT_APP_GG_APP_ID)
  return (
    <>
      {provider && profile ? (
        <User
          provider={provider}
          profile={profile}
          onLogout={onLogoutSuccess}
        />
      ) : (
        <div className={`App ${provider && profile ? "hide" : ""}`}>
          <h1 className="title">ReactJS Social Login</h1>

          <LoginSocialGoogle
            isOnlyGetToken
            // client_id="297248572097-v24t8i1jbbivtkdr1ef13qn0sid8gbjh.apps.googleusercontent.com"
            client_id={import.meta.env.VITE_APP_GG_APP_ID || ""}
            onLoginStart={onLoginStart}
            onResolve={({ provider, data }) => {
              setProvider(provider);
              setProfile(data);
              navigate("/home");
            }}
            onReject={(err) => {
              console.log(err);
            }}
          >
            <GoogleLoginButton />
          </LoginSocialGoogle>

          {/* <LoginSocialGithub
            isOnlyGetToken
            client_id={process.env.REACT_APP_GITHUB_APP_ID || ""}
            client_secret={process.env.REACT_APP_GITHUB_APP_SECRET || ""}
            redirect_uri={REDIRECT_URI}
            onLoginStart={onLoginStart}
            onResolve={({ provider, data }) => {
              setProvider(provider);
              setProfile(data);
            }}
            onReject={(err) => {
              console.log(err);
            }}
          >
            <GithubLoginButton />
          </LoginSocialGithub> */}
        </div>
      )}
    </>
  );
};

export default Login;
