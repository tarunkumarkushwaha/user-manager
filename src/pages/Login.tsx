import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../app/features/users/userSlice';
import { NavLink, useNavigate } from 'react-router';
import { toast } from "react-toastify"

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.users.error);
  const currentUser = useSelector((state) => state.users.currentUser);

  const handleSignin = () => {
    dispatch(loginUser({ username, password }));

    if (!error) {
      toast.success(`Welcome ${username}!`);
      navigate('/dashboard');
    } else {
      toast.error(error);
    }
  };

  return (
    <>
      <div className="mainbg bg-no-repeat bg-left h-screen">
        <div className="bg-slate-950/60 h-screen flex justify-center m-0 item-center flex-col">
          <section className="smooth-entry flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
                </h1>
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">username</label>
                    <input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      type="username" name="username" id="username" className="bg-green-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter username" required="" />
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password" name="password" id="password" placeholder="••••••••" className="bg-green-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>
                  <button onClick={handleSignin} className="w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Sign in
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet? <NavLink to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</NavLink>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default Login