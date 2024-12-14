import React from 'react';
import { useNavigate } from 'react-router';

const HomePage = () => {
  let navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4 text-gray-800">
          <span className="text-blue-500">Employee</span> 
          <span className="text-green-500">Management</span> 
          <span className="text-yellow-500">App</span>
        </h1>
        <p className="text-lg mb-8 text-gray-600">
          Simplify your workforce management with our intuitive and powerful app.
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HomePage;