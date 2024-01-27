import { createSlice } from "@reduxjs/toolkit";
import { Groups } from "../type";
import { getTeacherGroupAndModule } from "../user/userAPI";
import { getGroup, getGroupById, getGroupByTeacherId } from "./groupAPI";
import { getGroupByStudentId } from "./../user/userAPI";

const initialState: { arrGroup: Groups[]; group: Groups } = {
    arrGroup: [],
    group: {} as Groups,
};

const groupSlice = createSlice({
    name: "group slice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getGroup.fulfilled, (state: any, action: any) => {
                state.arrGroup = action.payload;
            })
            .addCase(getGroupById.fulfilled, (state: any, action: any) => {
                state.group = action.payload;
            })
            .addCase(
                getGroupByTeacherId.fulfilled,
                (state: any, action: any) => {
                    state.arrGroup = action.payload;
                }
            )
            .addCase(
                getTeacherGroupAndModule.fulfilled,
                (state: any, action: any) => {
                    state.arrGroup = action.payload.groups;
                }
            )
            .addCase(
                getGroupByStudentId.fulfilled,
                (state: any, action: any) => {
                    state.arrGroup = action.payload;
                }
            );
    },
});

export default groupSlice.reducer;
