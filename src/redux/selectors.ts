import { RootState } from "./store"

export const getUsersData = (state: RootState) => state.users?.users
export const getSelectedUserData = (state: RootState) => state.users?.selectedUser
export const loadingUsers = (state: RootState) => state.users.loading
export const startSearch = (state: RootState) => state.users.startSearch
export const loadingError = (state: RootState) => state.users.error
