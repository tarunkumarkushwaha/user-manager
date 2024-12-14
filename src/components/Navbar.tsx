import React from "react";
import { Link } from "react-router";
import { logoutUser } from "../app/features/users/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify"

const Navbar = () => {
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    toast.success(`user ${currentUser} has logged out`);
    dispatch(logoutUser());
  };

  return (
    <>
      <nav className="flex justify-between items-center bg-slate-400 p-3">
        <h1 className="text-xl font-bold  bg-gray-200 p-2 rounded-lg">
          <span className="text-blue-500">Employee</span>
          <span className="text-green-500">Management</span>
          <span className="text-yellow-500">App</span>
        </h1>
        <div className="flex justify-center items-center gap-3">
          <Link
            to="/"
            className={`px-4 py-2 rounded-lg hover:bg-blue-600 ${
              window.location.pathname === "/"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Home
          </Link>

          {currentUser ? (
            <>
              <Link
                to="/dashboard"
                className={`px-4 py-2 rounded-lg hover:bg-blue-600 ${
                  window.location.pathname === "/dashboard"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/analytics"
                className={`px-4 py-2 rounded-lg hover:bg-blue-600 ${
                  window.location.pathname === "/analytics"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                Analytics
              </Link>

              <button
                onClick={handleLogout}
                className=" px-4 py-2 bg-blue-300 text-white rounded-lg hover:bg-blue-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className={`px-4 py-2 rounded-lg hover:bg-blue-600 ${
                  window.location.pathname === "/signup"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                Signup
              </Link>
              <Link
                to="/login"
                className={`px-4 py-2 rounded-lg hover:bg-blue-600 ${
                  window.location.pathname === "/login"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                Login
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
