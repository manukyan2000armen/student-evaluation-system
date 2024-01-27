import { createSlice } from "@reduxjs/toolkit";
import { User } from "../type";
import {
    getGroupByStudentId,
    getStudentByGroupId,
    getTeacher,
    getUserById,
    getUserByThokenThunk,
    getUserThunk,
} from "./userAPI";

const initialState: { arrUser: User[]; user: User; guest: User } = {
    arrUser: [],
    user: {} as User,
    guest: {} as User,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                getUserByThokenThunk.fulfilled,
                (state: any, action: any) => {
                    state.user = action.payload;
                }
            )
            .addCase(getUserThunk.fulfilled, (state: any, action: any) => {
                state.arrUser = action.payload;
            })
            .addCase(getTeacher.fulfilled, (state: any, action: any) => {
                state.arrUser = action.payload;
            })
            .addCase(getUserById.fulfilled, (state: any, action: any) => {
                state.guest = action.payload;
            })
            .addCase(
                getStudentByGroupId.fulfilled,
                (state: any, action: any) => {
                    state.arrUser = action.payload;
                }
            );
    },
});

export default userSlice.reducer;
