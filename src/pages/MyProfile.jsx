import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { auth } from "../firebase/firebase.config";
import {
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const MyProfile = () => {
  const { user: currentUser, loading: isLoading, logout: userLogout } = useContext(AuthContext);
  const navigateToPage = useNavigate();

  const [userName, setUserName] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmUserPassword, setConfirmUserPassword] = useState("");
  const [userPhoto, setUserPhoto] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setUserName(currentUser.displayName || "");
      setUserMobile(currentUser.phoneNumber || "");
      setUserPhoto(currentUser.photoURL || null);
    }
  }, [currentUser]);

  useEffect(() => {
    document.title = "My Profile | ToyTopia";
  }, []);

  const handleUserPhotoChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setUserPhoto(URL.createObjectURL(selectedFile));
    }
  };

  const handleProfileSave = async (event) => {
    event.preventDefault();
    if (!userName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    if (userPassword && userPassword !== confirmUserPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsSaving(true);
    try {
      const authenticatedUser = auth.currentUser;
      if (!authenticatedUser) throw new Error("No authenticated user.");

      await updateProfile(authenticatedUser, {
        displayName: userName.trim(),
        photoURL: userPhoto || null,
      });

      if (userPassword) {
        const userCredential = EmailAuthProvider.credential(
          authenticatedUser.email,
          prompt("Please enter your current password to confirm changes:")
        );
        await reauthenticateWithCredential(authenticatedUser, userCredential);
        await updatePassword(authenticatedUser, userPassword);
      }

      toast.success("Profile updated successfully!");
      navigateToPage("/");
    } catch (profileError) {
      console.error(profileError);
      toast.error(profileError.message || "Update failed");
    } finally {
      setIsSaving(false);
      setUserPassword("");
      setConfirmUserPassword("");
    }
  };

  const handleUserLogout = async () => {
    try {
      await userLogout();
      toast.success("Logged out");
      navigateToPage("/signin");
    } catch (logoutError) {
      console.error(logoutError);
      toast.error("Logout failed");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-600">
          You must be logged in to view this page.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center px-4 py-12 bg-[#67D4E0] text-black">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-center mb-4">My Profile</h2>

        <div className="flex flex-col items-center mb-6">
          <img
            src={userPhoto || "https://via.placeholder.com/120?text=Avatar"}
            alt="avatar"
            className="w-28 h-28 rounded-full object-cover border mb-3"
          />
          <label className="cursor-pointer bg-[#FBC270] text-black px-4 py-2 rounded-full hover:opacity-90 transition">
            Choose File
            <input
              type="file"
              accept="image/*"
              onChange={handleUserPhotoChange}
              className="hidden"
            />
          </label>
        </div>

        <form onSubmit={handleProfileSave} className="flex flex-col gap-4">
          <div className="flex items-center gap-3 rounded-full px-5 py-3 shadow-md focus-within:ring-2 focus-within:ring-[#FBC270]">
            <input
              type="text"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
              placeholder="Full Name"
              className="outline-none flex-1 bg-transparent text-black"
            />
          </div>

          <div className="flex items-center gap-3 rounded-full px-5 py-3 shadow-md focus-within:ring-2 focus-within:ring-[#FBC270]">
            <input
              type="text"
              value={userMobile}
              onChange={(event) => setUserMobile(event.target.value)}
              placeholder="Mobile"
              className="outline-none flex-1 bg-transparent text-black"
            />
          </div>

          <div className="flex items-center gap-3 rounded-full px-5 py-3 shadow-md focus-within:ring-2 focus-within:ring-[#FBC270]">
            <input
              type="password"
              value={userPassword}
              onChange={(event) => setUserPassword(event.target.value)}
              placeholder="New Password"
              className="outline-none flex-1 bg-transparent text-black"
            />
          </div>

          <div className="flex items-center gap-3 rounded-full px-5 py-3 shadow-md focus-within:ring-2 focus-within:ring-[#FBC270]">
            <input
              type="password"
              value={confirmUserPassword}
              onChange={(event) => setConfirmUserPassword(event.target.value)}
              placeholder="Confirm Password"
              className="outline-none flex-1 bg-transparent text-black"
            />
          </div>

          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-[#FBC270] text-black font-semibold px-6 py-2 rounded-full hover:opacity-90 transition disabled:opacity-60"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={handleUserLogout}
              className="border border-gray-300 text-black px-6 py-2 rounded-full hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
