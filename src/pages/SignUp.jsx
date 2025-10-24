import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

const SignUp = () => {
  const navigateToPage = useNavigate();
  const { register: userRegister } = useContext(AuthContext);

  const [userFormData, setUserFormData] = useState({
    fullName: "",
    email: "",
    photoURL: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData((previousData) => ({ ...previousData, [name]: value }));
  };

  const validateUserPassword = (userPassword) => {
    const hasUpperCase = /[A-Z]/.test(userPassword);
    const hasLowerCase = /[a-z]/.test(userPassword);
    const hasMinimumLength = userPassword.length >= 6;
    if (!hasUpperCase)
      return (
        Swal.fire(
          "Error",
          "Password must have at least one uppercase letter.",
          "error"
        ),
        false
      );
    if (!hasLowerCase)
      return (
        Swal.fire(
          "Error",
          "Password must have at least one lowercase letter.",
          "error"
        ),
        false
      );
    if (!hasMinimumLength)
      return (
        Swal.fire(
          "Error",
          "Password must be at least 6 characters long.",
          "error"
        ),
        false
      );
    return true;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const { fullName, email, password, confirmPassword, photoURL } = userFormData;

    if (password !== confirmPassword)
      return Swal.fire("Error", "Passwords do not match!", "error");

    if (!validateUserPassword(password)) return;

    setIsLoading(true);
    try {
      await userRegister(email, password, fullName, photoURL);
      Swal.fire("Success", "Account created successfully!", "success");
      navigateToPage("/");
    } catch (registrationError) {
      console.error("Signup error:", registrationError);
      if (registrationError.code === "auth/email-already-in-use") {
        Swal.fire(
          "Error",
          "This email is already registered. Please sign in instead.",
          "error"
        );
      } else {
        Swal.fire(
          "Error",
          "Failed to create account. Please try again.",
          "error"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegistration = async () => {
    setIsLoading(true);
    const authInstance = getAuth();
    const googleProvider = new GoogleAuthProvider();

    try {
      const googleResult = await signInWithPopup(authInstance, googleProvider);
      const userEmail = googleResult.user.email;
      const signInMethods = await fetchSignInMethodsForEmail(authInstance, userEmail);

      if (signInMethods.length > 0) {
        await googleResult.user.delete();
        Swal.fire(
          "Error",
          "An account already exists with this email. Please sign in instead.",
          "error"
        );
        return;
      }

      Swal.fire("Success", "Signed up successfully with Google!", "success");
      navigateToPage("/");
    } catch (googleError) {
      console.error("Google signup failed:", googleError);
      Swal.fire("Error", "Google sign-up failed. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center items-center min-h-[80vh]">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-[90%] max-w-[500px]">
        <h2
          className="text-4xl text-center text-[#FF616B] mb-10"
          style={{ fontFamily: "Fredoka One" }}
        >
          Create an Account
        </h2>

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
          <div className="flex items-center gap-3 border rounded-full px-5 py-3 shadow-sm focus-within:ring-2 focus-within:ring-[#FBC270]">
            <FaUser className="text-gray-400 text-xl" />
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={userFormData.fullName}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              className="outline-none flex-1 bg-transparent text-gray-700"
            />
          </div>

          <div className="flex items-center gap-3 border rounded-full px-5 py-3 shadow-sm focus-within:ring-2 focus-within:ring-[#FBC270]">
            <FaEnvelope className="text-gray-400 text-xl" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={userFormData.email}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              className="outline-none flex-1 bg-transparent text-gray-700"
            />
          </div>

          <div className="flex items-center gap-3 border rounded-full px-5 py-3 shadow-sm focus-within:ring-2 focus-within:ring-[#FBC270]">
            <FaUser className="text-gray-400 text-xl" />
            <input
              type="text"
              name="photoURL"
              placeholder="Photo URL (optional)"
              value={userFormData.photoURL}
              onChange={handleInputChange}
              disabled={isLoading}
              className="outline-none flex-1 bg-transparent text-gray-700"
            />
          </div>

          <div className="flex items-center gap-3 border rounded-full px-5 py-3 shadow-sm focus-within:ring-2 focus-within:ring-[#FBC270]">
            <FaLock className="text-gray-400 text-xl" />
            <input
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={userFormData.password}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              className="outline-none flex-1 bg-transparent text-gray-700"
            />
            <span
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="cursor-pointer text-gray-500"
            >
              {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="flex items-center gap-3 border rounded-full px-5 py-3 shadow-sm focus-within:ring-2 focus-within:ring-[#FBC270]">
            <FaLock className="text-gray-400 text-xl" />
            <input
              type={isConfirmPasswordVisible ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={userFormData.confirmPassword}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              className="outline-none flex-1 bg-transparent text-gray-700"
            />
            <span
              onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
              className="cursor-pointer text-gray-500"
            >
              {isConfirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#FBC270] shadow-md text-gray-700 font-semibold py-3 rounded-full hover:bg-[#4178a1] hover:text-white transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 bg-gray-300"></div>
          <p className="px-4 text-gray-500 text-sm">Or sign up with</p>
          <div className="flex-1 bg-gray-300"></div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleGoogleRegistration}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 px-5 py-3 shadow-xl rounded-full cursor-pointer transition disabled:opacity-50 hover:scale-[1.1]"
          >
            <FaGoogle className="text-red-500" />
            <p className="text-black">Google</p>
          </button>
        </div>

        <div className="text-center mt-6 text-gray-600">
          <p>
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-[#FF616B] font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
