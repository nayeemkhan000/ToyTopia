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
    <div className="w-full flex justify-center items-center min-h-[80vh]">
      <div className="bg-white rounded-2xl p-10 w-[90%] max-w-[500px] shadow-2xl">
        <h1
          className="text-[#FF616B] text-4xl text-center mb-10"
          style={{ fontFamily: "Fredoka One" }}
        >
          Sign In
        </h1>

        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
          <div className="flex items-center gap-3 border rounded-full px-5 py-3 shadow-sm bg-white focus-within:ring-2 focus-within:ring-[#FBC270]">
            <FaUser className="text-gray-400 text-xl" />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={userFormData.email}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              className="outline-none flex-1 text-gray-700 bg-transparent"
            />
          </div>

          <div className="flex items-center gap-3 border rounded-full px-5 py-3 shadow-sm bg-white focus-within:ring-2 focus-within:ring-[#FBC270]">
            <FaLock className="text-gray-400 text-xl" />
            <input
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={userFormData.password}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              className="outline-none flex-1 text-gray-700 bg-transparent"
            />
            <span
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="cursor-pointer text-gray-500"
            >
              {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="flex justify-end text-sm text-[#FF616B] font-semibold">
            <button
              type="button"
              onClick={handleForgotPasswordClick}
              className="hover:underline cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#FBC270] text-[#00000088] shadow-md font-semibold py-3 rounded-full hover:bg-[#4178a1] hover:text-white transition-colors cursor-pointer disabled:opacity-50"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 bg-gray-300"></div>
          <p className="px-4 text-gray-500 text-sm">Or sign in with</p>
          <div className="flex-1 bg-gray-300"></div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleSocialAuthentication("google")}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 px-5 py-3 shadow-xl rounded-full cursor-pointer transition disabled:opacity-50 hover:scale-[1.1]"
          >
            <FaGoogle className="text-red-500" />
            <p className="text-black">Google</p>
          </button>

          <button
            onClick={() => handleSocialAuthentication("github")}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 px-5 py-3 shadow-xl rounded-full cursor-pointer transition disabled:opacity-50 hover:scale-[1.1]"
          >
            <FaGithub className="text-gray-700" />
            <p className="text-black">Github</p>
          </button>
        </div>

        <div className="text-center mt-6 text-gray-600">
          <p>
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#FF616B] font-semibold hover:underline"
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
