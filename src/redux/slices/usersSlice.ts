import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { $api } from "../../services/http";
import axios from "axios";

export interface RequestData {
    names: string;
    usersLimit: number;
    page: number;
}

export interface ResponseData {
    data: IUser[];
    usersCount: number;
}

export const findUsers = createAsyncThunk<ResponseData, RequestData, { rejectValue: string }>(
    "users/findUsers",
    async ({ names, usersLimit, page }: RequestData, { rejectWithValue }) => {
        try {
            const response = await $api.get(`/users?${names}&_limit=${usersLimit}&_page=${page}`);
            console.log(response);
            return {
                data: response.data,
                usersCount: response.headers["x-total-count"],
            };
        } catch (e) {
            if (axios.isAxiosError(e)) {
                return rejectWithValue(e.message);
            }

            return rejectWithValue("error");
        }
    }
);

export interface IUser {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
}

type UsersSlice = {
    users: IUser[];
    usersCount: number;
    selectedUser: IUser | null;
    loading: boolean;
    startSearch: boolean;
    error?: string;
};

const initialState: UsersSlice = {
    users: [] as IUser[],
    usersCount: 0,
    selectedUser: null,
    startSearch: false,
    loading: false,
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        selectUser: (state, action: PayloadAction<IUser | null>) => {
            state.selectedUser = action.payload;
        },
        clearResults: (state) => {
            state.users = [];
            state.usersCount = 0;
            state.startSearch = false;
            state.error = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(findUsers.pending, (state) => {
                state.loading = true;
                state.startSearch = true;
                state.error = "";
            })
            .addCase(findUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(findUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.usersCount = action.payload.usersCount;
                state.users = action.payload.data;
            });
    },
});

export const { selectUser, clearResults } = usersSlice.actions;
export const loginReducer = usersSlice.reducer;
