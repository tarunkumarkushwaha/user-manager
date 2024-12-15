import React, { useEffect, useState, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  fetchUsers,
  addUser,
  modifyUser,
  deleteUser,
} from "../app/features/users/userSlice";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import LoadingIcon from "../components/LoadingIcon";
import { toast } from "react-toastify";

ChartJS.register(ArcElement, Tooltip, Legend);

// TypeScript types for the User and RootState
type User = {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive";
};

type RootState = {
  users: {
    currentUser: User | null;
    users: User[];
    loading: boolean;
    error: string | null;
  };
};

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state: RootState) => state.users.currentUser);
  const { users, loading, error } = useSelector((state: RootState) => state.users);

  const [userForm, setUserForm] = useState<User>({
    id: "",
    name: "",
    email: "",
    status: "active",
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const usersPerPage = 5;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string): boolean => /\S+@\S+\.\S+/.test(email);

  const handleAddOrEditUser = () => {
    if (!userForm.name || !userForm.email) {
      toast.error("Name and email are required!");
      return;
    }
    if (!validateEmail(userForm.email)) {
      toast.error("Please enter a valid email address!");
      return;
    }
    if (isEditing) {
      dispatch(modifyUser(userForm));
      toast.success("User edited successfully!");
      setIsEditing(false);
    } else {
      dispatch(addUser({ ...userForm, id: Date.now().toString() }));
      toast.success("User added successfully!");
    }
    resetForm();
  };

  const handleEdit = (user: User) => {
    setUserForm({
      id: user.id,
      name: user.name,
      email: user.email,
      status: user.status,
    });
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteUser(id));
    toast.success("User deleted successfully!");
  };

  const resetForm = () => {
    setUserForm({ id: "", name: "", email: "", status: "active" });
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center flex-col items-center h-screen">
        <LoadingIcon />
        <p className="text-xl font-serif font-semibold">Loading data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center flex-col items-center h-screen">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12" y2="20" />
        </svg>
        <p className="text-xl font-serif font-semibold">
          Error loading users: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div
        onClick={() => navigate("/")}
        className="text-center cursor-pointer"
      >
        <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-gray-800">
          <span className="text-blue-500">Employee</span>
          <span className="text-green-500">Management</span>
          <span className="text-yellow-500">App</span>
        </h1>
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
        User Management Dashboard
      </h2>

      {/* User Form */}
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 mb-6">
        <h3 className="text-xl sm:text-2xl font-semibold mb-4">
          {isEditing ? "Edit User" : "Add New User"}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            name="name"
            value={userForm.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="p-3 border rounded-lg w-full"
          />
          <input
            type="email"
            name="email"
            value={userForm.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="p-3 border rounded-lg w-full"
          />
          <select
            name="status"
            value={userForm.status}
            onChange={handleInputChange}
            className="p-3 border rounded-lg w-full"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <div className="flex gap-2">
            <button
              onClick={handleAddOrEditUser}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {isEditing ? "Update User" : "Add User"}
            </button>
            {isEditing && (
              <button
                onClick={resetForm}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-100">
                <td className="p-3">{user.id}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td
                  className={`p-3 font-semibold ${
                    user.status === "active"
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                >
                  {user.status}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleEdit(user)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 mx-1 rounded-lg ${
                page === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Dashboard;


