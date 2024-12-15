// @ts-nocheck
import { useNavigate } from 'react-router';

const HomePage = () => {
  let navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center max-w-3xl">
      
        <h1 className="text-xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-800 leading-tight">
          <span className="text-blue-500">Employee</span> 
          <span className="text-green-500">Management</span> 
          <span className="text-yellow-500">App</span>
        </h1>


        <p className="text-sm sm:text-base md:text-lg mb-8 text-gray-600">
          Simplify your workforce management with our intuitive and powerful app.
        </p>

     
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded text-sm md:text-base"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HomePage;
