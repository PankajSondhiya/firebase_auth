import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { toast } from "react-toastify";
import { useFireBase } from "../src/firebase-config";

const auth = getAuth();
const provider = new GoogleAuthProvider();

export default function UseApi() {
  const { signUp, login, resetPassword } = useFireBase();
  const register = async (email, password) => {
    try {
      await signUp(email, password);
      toast.success("Signup successful, try logging in now");
      window.location.reload();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const signin = async (email, password) => {
    try {
      await login(email, password);
      toast.success("Login successful");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const googleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      toast.success("Google sign-in successful");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Logout successful");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleForgotPassword = async (email) => {
    try {
      await resetPassword(email);
      toast.success("Check your email for the verification link");
    } catch (error) {
      toast.error("Email is required");
    }
  };
  return [register, signin, googleLogin, handleForgotPassword, logout];
}
