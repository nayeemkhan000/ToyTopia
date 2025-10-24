import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaLock,
  FaGoogle,
  FaGithub,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

const Signin = () => {
  const navigateToPage = useNavigate();
  const { login: userLogin } = useContext(AuthContext);

  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData((previousData) => ({ ...previousData, [name]: value }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setIsLoading(true);
    try {
      await userLogin(userFormData.email, userFormData.password);
      Swal.fire("Success", "Signed in successfully!", "success");
      navigateToPage("/");
    } catch (loginError) {
      console.error("Login error:", loginError);
      if (loginError.code === "auth/user-not-found") {
        Swal.fire(
          "Error",
          "No account found with this email. Please sign up first.",
          "error"
        );
      } else if (loginError.code === "auth/wrong-password") {
        Swal.fire("Error", "Incorrect password. Try again.", "error");
      } else {
        Swal.fire("Error", "Failed to sign in. Try again.", "error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuthentication = async (socialProviderType) => {
    setErrorMessage("");
    setIsLoading(true);
    const authInstance = getAuth();
    const socialProvider =
      socialProviderType === "google"
        ? new GoogleAuthProvider()
        : new GithubAuthProvider();

    try {
      const authResult = await signInWithPopup(authInstance, socialProvider);
      const userEmail = authResult.user.email;
      const signInMethods = await fetchSignInMethodsForEmail(authInstance, userEmail);

      if (signInMethods.length === 0) {
        await authResult.user.delete();
        Swal.fire(
          "Error",
          "No account found with this email. Please sign up first.",
          "error"
        );
        return;
      }
      Swal.fire(
        "Success",
        `Signed in with ${socialProviderType === "google" ? "Google" : "GitHub"}!`,
        "success"
      );
      navigateToPage("/");
    } catch (socialError) {
      console.error(`${socialProviderType} login failed:`, socialError);
      setErrorMessage(`${socialProviderType} sign-in failed. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPasswordClick = () => {
    navigateToPage("/forgot-password", { state: { email: userFormData.email } });
  };

  return (
    <div className="w-full flex justify-center items-center min-h-[80vh] py-12">
      <div className="card p-8 md:p-10 w-[90%] max-w-[500px] shadow-2xl">
        <h1
          className="text-accent text-3xl md:text-4xl text-center mb-10 font-bold"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Welcome Back
        </h1>

        {errorMessage && (
          <div className="bg-red-400/10 border border-red-400 text-red-300 px-4 py-3 rounded-lg mb-6">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
          <div className="flex items-center gap-3 border border-accent rounded-xl px-5 py-4 shadow-sm bg-accent/10 focus-within:ring-2 focus-within:ring-accent">
            <FaUser className="text-secondary text-xl" />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={userFormData.email}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              className="input-field flex-1 bg-transparent border-none focus:ring-0"
            />
          </div>

          <div className="flex items-center gap-3 border border-accent rounded-xl px-5 py-4 shadow-sm bg-accent/10 focus-within:ring-2 focus-within:ring-accent">
            <FaLock className="text-secondary text-xl" />
            <input
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={userFormData.password}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              className="input-field flex-1 bg-transparent border-none focus:ring-0"
            />
            <span
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="cursor-pointer text-secondary hover:text-accent transition-colors"
            >
              {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="flex justify-end text-sm text-accent font-semibold">
            <button
              type="button"
              onClick={handleForgotPasswordClick}
              className="hover:underline cursor-pointer transition-colors"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full py-4 text-lg font-semibold rounded-xl disabled:opacity-50"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 bg-accent h-px"></div>
          <p className="px-4 text-secondary text-sm">Or continue with</p>
          <div className="flex-1 bg-accent h-px"></div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleSocialAuthentication("google")}
            disabled={isLoading}
            className="btn-secondary flex items-center justify-center gap-3 px-6 py-3 rounded-xl disabled:opacity-50 hover:scale-105 transition-all"
          >
            <FaGoogle className="text-red-400" />
            <p className="text-primary">Google</p>
          </button>

          <button
            onClick={() => handleSocialAuthentication("github")}
            disabled={isLoading}
            className="btn-secondary flex items-center justify-center gap-3 px-6 py-3 rounded-xl disabled:opacity-50 hover:scale-105 transition-all"
          >
            <FaGithub className="text-primary" />
            <p className="text-primary">GitHub</p>
          </button>
        </div>

        <div className="text-center mt-6 text-secondary">
          <p>
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-accent font-semibold hover:underline transition-colors"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
