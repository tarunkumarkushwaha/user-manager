import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

const initialState = {
  users: [],
  deletedUsers: [],
  currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get(API_URL);
  return response.data.map((user) => ({
    ...user,
    status: Math.random() > 0.5 ? 'active' : 'inactive',
    region : "north east"
  }));
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { id, name, email, status } = action.payload;
      if (!name) {
        throw new Error("Username is required");
      }

      state.users.push({
        id: id || Date.now(),
        name,
        email,
        status: status || "active",
      });
    },
    loginUser: (state, action) => {
      const { username, password } = action.payload;
      const user = state.users.find((u) => u.username === username && u.password === password);
      if (user) {
        state.currentUser = user;
        state.error = null;
        localStorage.setItem('currentUser', JSON.stringify(user));
      } else {
        state.error = 'Invalid username or password!';
      }
    },
    logoutUser: (state) => {
      state.currentUser = null;
      localStorage.removeItem('currentUser');
    },

    deleteUser: (state, action) => {
      const userId = action.payload;
      const userIndex = state.users.findIndex((user) => user.id === userId);

      if (userIndex !== -1) {
        const [deletedUser] = state.users.splice(userIndex, 1);
        state.deletedUsers.push(deletedUser); 
      }
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    modifyUser: (state, action) => {
      const updatedUser = action.payload;
      const index = state.users.findIndex((user) => user.id === updatedUser.id);
      if (index !== -1) {
        state.users[index] = updatedUser;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addUser, loginUser, logoutUser, deleteUser, modifyUser } = userSlice.actions;
export default userSlice.reducer;