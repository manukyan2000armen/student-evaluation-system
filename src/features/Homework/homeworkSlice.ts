import { createSlice } from "@reduxjs/toolkit";
import { Homework } from "../type";
import { getHomeworkStudent } from "../user/userAPI";
import {
    createHomework,
    getHomeworkById,
    getHomeworksByModuleGroupId,
} from "./homeworkAPI";

const initialState: { arrHomework: Homework[]; homework: Homework } = {
    arrHomework: [],
    homework: {} as Homework,
};

export const homeworkSlice = createSlice({
    name: "homework slice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                getHomeworksByModuleGroupId.fulfilled,
                (state: any, action: any) => {
                    state.arrHomework = action.payload;
                }
            )
            .addCase(getHomeworkById.fulfilled, (state: any, action: any) => {
                state.homework = action.payload;
            })
            .addCase(
                getHomeworkStudent.fulfilled,
                (state: any, action: any) => {
                    state.arrHomework = action.payload;
                }
            );
    },
});

export default homeworkSlice.reducer;
