import { useEffect, useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import HomePage from "./components/HomePage";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  fetchUsers,
  addUser,
  modifyUser,
  deleteUser,
} from "./app/features/users/userSlice";

const API_URL = "https://jsonplaceholder.typicode.com/users";

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
