import { createSlice } from "@reduxjs/toolkit";
import { ArrayGrades, Grades } from "../type";
import { getGradesByModuleGroupId, gradeHomework } from "./gradesAPI";

const initialState: {
    arrGrades: any[];
    grades: Grades;
} = {
    arrGrades: [],
    grades: {} as Grades,
};

export const gradesSlice = createSlice({
    name: "grades slice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            getGradesByModuleGroupId.fulfilled,
            (state: any, action: any) => {
                state.grades = action.payload;
            }
        );
    },
});

export default gradesSlice.reducer;
