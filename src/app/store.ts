import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import axios from "axios";
import courseSlice from "../features/Course/courseSlice";
import groupSlice from "../features/Group/groupSlice";
import homeworkSlice from "../features/Homework/homeworkSlice";
import moduleSlice from "../features/Modules/moduleSlice";
import userSlice from "../features/user/userSlice";
import gradesSlice from "../features/Grades/gradesSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    course: courseSlice,
    module: moduleSlice,
    group: groupSlice,
    homework: homeworkSlice,
    grades: gradesSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const myAxios = axios.create({
  baseURL: "http://localhost:3001/",
});
