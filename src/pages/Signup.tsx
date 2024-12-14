import { NavLink } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../app/features/users/userSlice';
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify"

const Signup = () => {
  const [showpass, setshowpass] = useState(false)
  const [checkpassword, setcheckpassword] = useState("")
  const [name, setName] = useState('');
  const [pwd, setPwd] = useState('');
  const [email, setemail] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.users.error);

  const passwordValidator = (pass) => {
    let passobject = { password: pass, error: false, errormessege: "" }
    if (pass.length > 8) {
      let capital = []
      let small = []
      let specialordigit = []
      pass.split('').map((char) => {
        if (char.charCodeAt() >= 65 && char.charCodeAt() <= 90) {
          capital.push(char)
        }
        else if (char.charCodeAt() >= 97 && char.charCodeAt() <= 122) {
          small.push(char)
        } else { specialordigit.push(char) }
      })
      if (capital.length < 1) {
        passobject.error = true
        passobject.errormessege = "password must contain a capital letter"
        return passobject
      }
      if (specialordigit.length < 1) {
        passobject.error = true
        passobject.errormessege = "password must contain a special letter"
        return passobject
      }
      else { return passobject }
    }
    else if (pass.length < 8 || pass.length == 0) {
      passobject.error = true
      passobject.errormessege = "password must be of 8 characters"
      return passobject
    }
  }

  const handleSignup = () => {
    if (name.length <= 3) {
      toast.error('Name must be at least 3 characters');
      return;
    }

    if (pwd !== checkpassword) {
      toast.error('Passwords do not match');
      return;
    }

    dispatch(addUser({ username: name, email, password: pwd }));

    if (!error) {
      toast.success('Account created successfully!');
      navigate('/login');
    } else {
      toast.error(error);
    }
  };

  return (
    <>
      <section className="mainbg bg-no-repeat bg-left">
        <div className="bg-slate-950/60">
          <div className="smooth-entry flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <div className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create and account
                </div>
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="email" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required="" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                      type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email" required="" />
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input
                      value={pwd}
                      onChange={(e) => setPwd(e.target.value)}
                      type={showpass ? "text" : "password"} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>
                  <div>
                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                    <input
                      value={checkpassword}
                      onChange={(e) => setcheckpassword(e.target.value)}
                      type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>
                  <div className="flex text-white gap-2 text-sm">
                    <input type="checkbox" name="check" id="check" value={showpass} onChange={(e) => setshowpass(e.target.checked)} />
                    <p>view password</p>
                  </div>
                  <button onClick={handleSignup} className="w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Create an account
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account? <NavLink to={"/login"} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</NavLink>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Signup