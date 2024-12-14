import { useEffect, useState } from 'react'
import './App.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import HomePage from './components/HomePage';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
      <div className=''>
         <HomePage/>
          {/* {isAuthenticated ? <Dashboard users={users} setUsers={setUsers} /> : <Login onLogin={setIsAuthenticated} />} */}
      </div>
  );
}

export default App
