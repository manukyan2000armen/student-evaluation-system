import { createSlice } from "@reduxjs/toolkit";
import { Courses } from "../type";
import { createCourse, getCourse, seeCourseById } from "./courseAPI";

const initialState: { arrCourse: Courses[]; course: Courses } = {
    arrCourse: [],
    course: {} as Courses,
};

const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCourse.fulfilled, (state: any, action: any) => {
                state.arrCourse = action.payload;
            })
            .addCase(seeCourseById.fulfilled, (state: any, action: any) => {
                state.course = action.payload;
            });
    },
});
export default courseSlice.reducer;
