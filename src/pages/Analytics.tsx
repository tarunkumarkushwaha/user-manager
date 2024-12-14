import React, { useEffect } from "react";
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

const Analytics = () => {
  const { users, deletedUsers, loading, error } = useSelector(
    (state) => state.users
  );
  const currentUser = useSelector((state) => state.users.currentUser);

  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.status === "active").length;

  const chartData = {
    labels: ["Active Users", "Inactive Users"],
    datasets: [
      {
        data: [activeUsers, totalUsers - activeUsers],
        backgroundColor: ["#4CAF50", "#FFC107"],
        hoverBackgroundColor: ["#45A049", "#FFB300"],
      },
    ],
  };
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div className="bg-white shadow rounded-lg p-4 text-center">
            <h3 className="text-xl font-semibold">Total Users</h3>
            <p className="text-2xl text-blue-500 font-bold">{totalUsers}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4 text-center">
            <h3 className="text-xl font-semibold">Active Users</h3>
            <p className="text-2xl text-green-500 font-bold">{activeUsers}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4 text-center">
            <h3 className="text-xl font-semibold">Deleted Users</h3>
            <p className="text-2xl text-green-500 font-bold">
              {deletedUsers.length}
            </p>
          </div>
          <div className="bg-white h-80 shadow rounded-lg p-6">
            <Pie data={chartData} />
          </div>
          <div className="flex flex-col justify-center items-center">
            <h3 className="text-xl font-semibold">Deleted Users</h3>
            <ol className="flex flex-col justify-center items-center">
              {deletedUsers.map((user) => (
                <li key={user.id}>
                  {user.name} - {user.email}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
