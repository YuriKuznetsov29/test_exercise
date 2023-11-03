import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { $api } from "../../services/http"
import axios from "axios"

export const findUsers = createAsyncThunk<ResponseData, RequestData, { rejectValue: string }>(
    "users/findUsers",
    async ({ names }: RequestData, { rejectWithValue }) => {
        try {
            const response = await $api.get(`/users?${names}`)
            return response.data
        } catch (e) {
            if (axios.isAxiosError(e)) {
                return rejectWithValue(e.message)
            }

            return rejectWithValue("error")
        }
    }
)

export interface RequestData {
    names: string
}

export type ResponseData = IUser[]

export interface IUser {
    id: number
    name: string
    username: string
    email: string
    phone: string
}

type UsersSlice = {
    users: IUser[]
    selectedUser: IUser | null
    loading: boolean
    startSearch: boolean
    error?: string
}

const initialState: UsersSlice = {
    users: [] as IUser[],
    selectedUser: null,
    startSearch: false,
    loading: false,
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        selectUser: (state, action: PayloadAction<IUser | null>) => {
            state.selectedUser = action.payload
        },
        clearResults: (state) => {
            state.users = []
            state.startSearch = false
            state.error = ""
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(findUsers.pending, (state) => {
                state.loading = true
                state.startSearch = true
                state.error = ""
            })
            .addCase(findUsers.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(findUsers.fulfilled, (state, action) => {
                state.loading = false
                state.users = action.payload
            })
    },
})

export const { selectUser, clearResults } = usersSlice.actions
export const loginReducer = usersSlice.reducer
