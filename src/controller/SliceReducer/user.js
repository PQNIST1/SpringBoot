import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUser = createAsyncThunk('auth/getUser', async (id, { rejectWithValue }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return rejectWithValue('No access token found');
  }
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/${id}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const getUsers = createAsyncThunk('auth/getUsers', async (_, { rejectWithValue }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return rejectWithValue('No access token found');
  }
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const createUser = createAsyncThunk('auth/createUser', async (UserDetail, { rejectWithValue }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return rejectWithValue('No access token found');
  }
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/user/add`, UserDetail, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});


export const deleteUser = createAsyncThunk('auth/deleteUser', async (id, { rejectWithValue }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return rejectWithValue('No access token found');
  }
  try {
    const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/admin/delete/user/${id}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const updateUser = createAsyncThunk('auth/updateUser', async ( {update, id}, { rejectWithValue }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return rejectWithValue('No access token found');
  }
  try {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/admin/update/${id}`, update, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});


const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    users: [],
    status: 'idle',
    error: null,
    success: false,
  },
  reducers: {
    resetSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.status = 'loading';
    })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;

      })
      .addCase(getUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createUser.pending, (state) => {
        state.status = 'loading';
        state.success = false;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.success = true;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = 'failed';
        state.success = false;
        state.error = action.payload || 'Failed to create user';
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.success = false;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.success = true;
      })
      .addCase(deleteUser.rejected, (state) => {
        state.status = 'loading';
        state.error = null;
        state.success = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
        state.success = false;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.success = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.success = false;
        state.error = action.payload || 'Failed to update user';
      })

  },
});

export const { resetSuccess } = userSlice.actions;

export default userSlice.reducer;