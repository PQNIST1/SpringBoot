import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const getCompanyUser = createAsyncThunk('auth/getCompanyUser', async (_, { rejectWithValue }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return rejectWithValue('No access token found');
    }
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/users/no-company`, {
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

export const createCompany = createAsyncThunk('auth/createCompany', async (CompanyDetail, { rejectWithValue }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return rejectWithValue('No access token found');
    }
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/company/add`, CompanyDetail, {
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

export const getCompany = createAsyncThunk('auth/getCompany', async (_, { rejectWithValue }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return rejectWithValue('No access token found');
    }
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/companies`, {
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


export const getCom = createAsyncThunk('auth/getCom', async (id, { rejectWithValue }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return rejectWithValue('No access token found');
    }
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/company/${id}`, {
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


export const updateName = createAsyncThunk('auth/updateName', async ({ name, id }, { rejectWithValue }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return rejectWithValue('No access token found');
    }
    try {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/admin/update/company/name/${id}`, name, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'text/plain',
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


export const deleteCompany = createAsyncThunk('auth/deleteCompany', async (id, { rejectWithValue }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return rejectWithValue('No access token found');
    }
    try {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/admin/company/delete/${id}`, {
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

export const addEmploy = createAsyncThunk('auth/addEmploy', async ({ userIds, id }, { rejectWithValue }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return rejectWithValue('No access token found');
    }
    try {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/admin/add/company/${id}`, userIds, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
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


export const deleteEmploy = createAsyncThunk('auth/deleteEmploy', async ({ userId, id }, { rejectWithValue }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return rejectWithValue('No access token found');
    }
    try {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/admin/remove/company/${id}`, userId, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
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

const companySlice = createSlice({
    name: 'company',
    initialState: {
        company: null,
        companies: [],
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
        builder
            .addCase(getCom.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getCom.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.company = action.payload;
            })
            .addCase(getCom.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;

            })
            .addCase(getCompanyUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getCompanyUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(getCompanyUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;

            })
            .addCase(createCompany.pending, (state) => {
                state.status = 'loading';
                state.success = false;
                state.error = null;
            })
            .addCase(createCompany.fulfilled, (state) => {
                state.status = 'succeeded';
                state.success = true;
            })
            .addCase(createCompany.rejected, (state, action) => {
                state.status = 'failed';
                state.success = false;
                state.error = action.payload || 'Failed to create user';
            })
            .addCase(getCompany.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getCompany.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.companies = action.payload;
            })
            .addCase(getCompany.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;

            })
            .addCase(deleteCompany.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.success = false;
            })
            .addCase(deleteCompany.fulfilled, (state) => {
                state.status = 'succeeded';
                state.success = true;
            })
            .addCase(deleteCompany.rejected, (state) => {
                state.status = 'loading';
                state.error = null;
                state.success = false;
            })
            .addCase(updateName.pending, (state) => {
                state.status = 'loading';
                state.success = false;
                state.error = null;
            })
            .addCase(updateName.fulfilled, (state) => {
                state.status = 'succeeded';
                state.success = true;
            })
            .addCase(updateName.rejected, (state, action) => {
                state.status = 'failed';
                state.success = false;
                state.error = action.payload || 'Failed to update user';
            })
            .addCase(deleteEmploy.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.success = false;
            })
            .addCase(deleteEmploy.fulfilled, (state) => {
                state.status = 'succeeded';
                state.success = true;
            })
            .addCase(deleteEmploy.rejected, (state) => {
                state.status = 'loading';
                state.error = null;
                state.success = false;
            })
            .addCase(addEmploy.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.success = false;
            })
            .addCase(addEmploy.fulfilled, (state) => {
                state.status = 'succeeded';
                state.success = true;
            })
            .addCase(addEmploy.rejected, (state) => {
                state.status = 'loading';
                state.error = null;
                state.success = false;
            })
    },
});

export const { resetSuccess } = companySlice.actions;

export default companySlice.reducer;