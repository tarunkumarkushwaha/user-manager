import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// Define types for User and Redux State
interface User {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive";
}

interface UsersState {
  users: User[];
  deletedUsers: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

const Analytics: React.FC = () => {
  const navigate = useNavigate();

  const { users, deletedUsers, currentUser }: UsersState = useSelector(
    (state: { users: UsersState }) => state.users
  );

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
  }, [currentUser, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Total Users */}
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 text-center">
          <h3 className="text-lg sm:text-xl font-semibold">Total Users</h3>
          <p className="text-xl sm:text-2xl text-blue-500 font-bold">
            {totalUsers}
          </p>
        </div>

        {/* Active Users */}
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 text-center">
          <h3 className="text-lg sm:text-xl font-semibold">Active Users</h3>
          <p className="text-xl sm:text-2xl text-green-500 font-bold">
            {activeUsers}
          </p>
        </div>

        {/* Deleted Users Count */}
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 text-center">
          <h3 className="text-lg sm:text-xl font-semibold">Deleted Users</h3>
          <p className="text-xl sm:text-2xl text-red-500 font-bold">
            {deletedUsers.length}
          </p>
        </div>

        {/* Pie Chart */}
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 flex items-center justify-center">
          <Pie data={chartData} />
        </div>

        {/* Deleted Users List */}
        <div className="bg-white shadow rounded-lg p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold mb-4">Deleted Users</h3>
          <div className="overflow-auto max-h-64">
            <ol className="space-y-2">
              {deletedUsers.map((user) => (
                <li
                  key={user.id}
                  className="text-sm sm:text-base text-gray-700"
                >
                  {user.name} - <span className="text-gray-500">{user.email}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
