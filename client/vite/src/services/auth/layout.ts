import { createSlice } from '@reduxjs/toolkit';

// Load persisted state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("auth");
    return serializedState ? JSON.parse(serializedState) : { token: null, email: null };
  } catch (error) {
    console.error("Error loading auth state:", error);
    return { token: null, email: null };
  }
};

const initialState = loadState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => { 
      state.token = action.payload.token;
      state.email = action.payload.email;
      localStorage.setItem("auth", JSON.stringify(state));
    },
    clearUser: (state) => {
      state.token = null;
      state.email = null;
      localStorage.removeItem("auth");
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
