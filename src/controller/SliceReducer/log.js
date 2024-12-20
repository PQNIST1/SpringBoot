import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const login = createAsyncThunk('auth/login', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, userData);
    const accessToken = response.data.token;
    localStorage.setItem('accessToken', accessToken);
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const register = createAsyncThunk('auth/rigister', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`, userData);
    const accessToken = response.data.token;
    localStorage.setItem('accessToken', accessToken);
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const logoutAndNavigate = () => (dispatch) => {
  dispatch(logout());
  window.location.href = '/login';
};



const logSlice = createSlice({
  name: 'log',
  initialState: {
    user: false,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    logout(state) {
      state.user = false;
      localStorage.removeItem('accessToken');
    },
    setSuccess: (state) => { state.success = false },
    setError: (state) => { state.error = null },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = false;
        state.user = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Đăng nhập không thành công';
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.user = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Đăng ký không thành công';
      })
  },
});
export const {  logout, setError, setSuccess } = logSlice.actions;

export default logSlice.reducer;
