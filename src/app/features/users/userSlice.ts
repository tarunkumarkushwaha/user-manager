import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL =  'https://jsonplaceholder.typicode.com/users';

interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  username?: string;
  password?: string;
}

interface UserState {
  users: User[];
  deletedUsers: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

const currentUser = (() => {
  try {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  } catch {
    return null;
  }
})();

const initialState: UserState = {
  users: [],
  deletedUsers: [],
  currentUser,
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk<User[]>('users/fetchUsers', async () => {
  const response = await axios.get<User[]>(API_URL);
  return response.data.map((user) => ({
    ...user,
    status: Math.random() > 0.5 ? 'active' : 'inactive',
  }));
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<Partial<User>>) => {
      const { name, email, password } = action.payload;
      console.log(action.payload)
      if (!name) {
        throw new Error('Username is required');
      }
    
      state.users.push({
        id: Date.now(),
        username: name,
        email: email || '',
        password: password || '',
        status: 'active',
      } as User);
    
      // Debugging
      console.log('Users in state after signup:', JSON.stringify(state.users));
    },    
       
    loginUser: (
      state,
      action: PayloadAction<{ username: string; password: string }>
    ) => {
      const { username, password } = action.payload;
    
      // Check if a user with matching username and password exists
      const user = state.users.find(
        (u) => u.name === username && u.password === password // Ensure correct fields are checked
      );
    
      if (user) {
        state.currentUser = user;
        state.error = null;
        localStorage.setItem('currentUser', JSON.stringify(user));
      } else {
        state.error = 'Invalid username or password!';
      }
    
      console.log('Login attempt:', { username, password }); // Debugging
      console.log('Current Users in state:', state.users); // Debugging
    },
    
    logoutUser: (state) => {
      state.currentUser = null;
      localStorage.removeItem('currentUser');
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      const userId = action.payload;
      const userIndex = state.users.findIndex((user) => user.id === userId);

      if (userIndex !== -1) {
        const [deletedUser] = state.users.splice(userIndex, 1);
        state.deletedUsers.push(deletedUser);
      } else {
        console.warn(`User with ID ${userId} not found.`);
      }
    },
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
    modifyUser: (state, action: PayloadAction<User>) => {
      const updatedUser = action.payload;
      const index = state.users.findIndex((user) => user.id === updatedUser.id);
      if (index !== -1) {
        const existingUser = state.users[index];
        state.users[index] = {
          ...existingUser,
          ...updatedUser,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });
  },
});

export const {
  addUser,
  loginUser,
  logoutUser,
  deleteUser,
  modifyUser,
  setCurrentUser,
} = userSlice.actions;

export default userSlice.reducer;
