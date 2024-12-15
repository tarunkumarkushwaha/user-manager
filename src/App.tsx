import "./App.css";
import { useDispatch } from "react-redux";
import {
  fetchUsers,
} from "./app/features/users/userSlice";
import { useEffect } from "react";
import HomePage from "./components/HomePage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div className="">
      <HomePage />
    </div>
  );
}

export default App;
