import "./App.css";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import { FcGoogle } from "react-icons/fc";
import "react-toastify/dist/ReactToastify.css";

import UseApi from "./API";
// import { GoogleAuthProvider } from "firebase/auth/web-extension";

function App() {
  const [registerEmailAddress, setRegisterEmailAddress] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [user, setUser] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [passwordResetEmail, setPasswordResetEmail] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState();
  const auth = getAuth();
  const [register, signin, googleLogin, handleForgotPassword, logout] =
    UseApi();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) =>
      setUser(currentUser)
    );
    return () => unsubscribe();
  }, []);

  return (
    <div className="App vh-100 d-flex">
      <div className="vh-100 w-50 bg-dark"></div>
      <div className="vh-100 w-50 bg-success d-flex justify-content-center align-items-center">
        <div className="custum-card p-1 bg-dark">
          {isForgotPassword ? (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <div className="text-white m-3">
                Enter your email address for the verfication
              </div>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="email..."
                value={passwordResetEmail}
                onChange={(e) => setPasswordResetEmail(e.target.value)}
                required
              />
              <button
                className="btn btn-success mb-3"
                onClick={() => handleForgotPassword(passwordResetEmail)}
              >
                send vefication link
              </button>
            </div>
          ) : (
            <div className="login_form d-flex flex-column justify-content-center align-items-center">
              <div className=" mb-3 text-white m-auto title">
                {isSignUp ? "Signup" : "login"}
              </div>
              <div className="input-group mb-2">
                <input
                  className="form-control"
                  placeholder="email..."
                  type="text"
                  value={isSignUp ? registerEmailAddress : loginEmail}
                  onChange={
                    isSignUp
                      ? (e) => setRegisterEmailAddress(e.target.value)
                      : (e) => setLoginEmail(e.target.value)
                  }
                />
              </div>
              <div className="input-group ">
                <input
                  className="form-control"
                  type="password"
                  placeholder="password..."
                  value={isSignUp ? registerPassword : loginPassword}
                  onChange={
                    isSignUp
                      ? (e) => setRegisterPassword(e.target.value)
                      : (e) => setLoginPassword(e.target.value)
                  }
                />
              </div>
              <div className="forgot_password mb-1">
                <div
                  onClick={() => setIsForgotPassword(!isForgotPassword)}
                  className="text-primary"
                >
                  Forgot Password ?
                </div>
              </div>

              <div className="login_button ">
                <button
                  className="btn btn-success mb-2 login_button"
                  onClick={
                    isSignUp
                      ? () => register(registerEmailAddress, registerPassword)
                      : () => signin(loginEmail, loginPassword)
                  }
                >
                  {isSignUp ? "Signup" : "login"}
                </button>
              </div>
              <div className="login_button">
                <button
                  className="btn btn-danger custum_btn"
                  onClick={() => googleLogin()}
                >
                  sign in with <FcGoogle fontSize={25} />
                </button>
              </div>

              <div className="text-white">
                dont have an account!{" "}
                <span
                  className="text-primary toggle"
                  onClick={() => setIsSignUp(!isSignUp)}
                >
                  signup
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
