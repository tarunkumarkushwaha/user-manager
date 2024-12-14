import { useEffect, useState } from 'react'
import './App.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import HomePage from './components/HomePage';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  fetchUsers,
  addUser,
  modifyUser,
  deleteUser,
} from "./app/features/users/userSlice";

const API_URL = 'https://jsonplaceholder.typicode.com/users';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
    const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
      <div className=''>
         <HomePage/>
          {/* {isAuthenticated ? <Dashboard users={users} setUsers={setUsers} /> : <Login onLogin={setIsAuthenticated} />} */}
      </div>
  );
}

export default App
