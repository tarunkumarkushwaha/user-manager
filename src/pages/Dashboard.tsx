import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, addUser, modifyUser, deleteUser } from '../app/features/users/userSlice';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.users);

    const [userForm, setUserForm] = useState({ id: '', name: '', email: '', status: 'active' });
    const [isEditing, setIsEditing] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddOrEditUser = () => {
        if (isEditing) {
            dispatch(modifyUser(userForm)); 
            setIsEditing(false);
        } else {
            dispatch(addUser({ ...userForm, id: Date.now() })); 
        }
        resetForm();
    };

    const handleEdit = (user) => {
        setUserForm(user);
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        dispatch(deleteUser(id));
    };

    const resetForm = () => {
        setUserForm({ id: '', name: '', email: '', status: 'active' });
    };

    const totalUsers = users.length;
    const activeUsers = users.filter((user) => user.status === 'active').length;

    const chartData = {
        labels: ['Active Users', 'Inactive Users'],
        datasets: [
            {
                data: [activeUsers, totalUsers - activeUsers],
                backgroundColor: ['#4CAF50', '#FFC107'],
                hoverBackgroundColor: ['#45A049', '#FFB300'],
            },
        ],
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(users.length / usersPerPage);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading users: {error}</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h2 className="text-3xl font-bold text-center mb-6">User Management Dashboard</h2>

            {/* User Form */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
                <h3 className="text-2xl font-semibold mb-4">{isEditing ? 'Edit User' : 'Add New User'}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="name"
                        value={userForm.name}
                        onChange={handleInputChange}
                        placeholder="Name"
                        className="p-3 border rounded-lg"
                    />
                    <input
                        type="email"
                        name="email"
                        value={userForm.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className="p-3 border rounded-lg"
                    />
                    <select
                        name="status"
                        value={userForm.status}
                        onChange={handleInputChange}
                        className="p-3 border rounded-lg"
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
                <button
                    onClick={handleAddOrEditUser}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    {isEditing ? 'Update User' : 'Add User'}
                </button>
                {isEditing && (
                    <button
                        onClick={resetForm}
                        className="mt-4 ml-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                )}
            </div>

            {/* Analytics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                <div className="bg-white shadow rounded-lg p-4 text-center">
                    <h3 className="text-xl font-semibold">Total Users</h3>
                    <p className="text-2xl text-blue-500 font-bold">{totalUsers}</p>
                </div>
                <div className="bg-white shadow rounded-lg p-4 text-center">
                    <h3 className="text-xl font-semibold">Active Users</h3>
                    <p className="text-2xl text-green-500 font-bold">{activeUsers}</p>
                </div>
                <div className="bg-white h-80 shadow rounded-lg p-6">
                    <Pie data={chartData} />
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
                                        user.status === 'active' ? 'text-green-500' : 'text-gray-500'
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
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 mx-1 rounded-lg ${
                            page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;