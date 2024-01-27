import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { myAxios } from "../../app/store";
import { Courses } from "../type";

export const createCourse = createAsyncThunk(
    "create course",
    async (value: Courses) => {
        const headers = {
            Authorization: "Bearer " + Cookies.get("access_token"),
        };
        const { data } = await myAxios.post("/course", value, { headers });
        return data;
    }
);
export const getCourse = createAsyncThunk("get course", async () => {
    const headers = {
        Authorization: "Bearer " + Cookies.get("access_token"),
    };
    const { data } = await myAxios.get("/course", { headers });
    return data;
});

export const deleteCourse = createAsyncThunk(
    "delete course",
    async (id: number) => {
        const headers = {
            Authorization: "Bearer " + Cookies.get("access_token"),
        };
        const { data } = await myAxios.delete(`/course/${id}`, { headers });
        return data;
    }
);

export const seeCourseById = createAsyncThunk(
    "see by id course",
    async (id: number) => {
        const headers = {
            Authorization: "Bearer " + Cookies.get("access_token"),
        };
        const { data } = await myAxios.get(`/course/${id}`, { headers });
        return data;
    }
);

export const changeCourseData = createAsyncThunk(
    "change course data",
    async ({ id, value }: { id: number; value: any }) => {
        const headers = {
            Authorization: "Bearer " + Cookies.get("access_token"),
        };
        const { data } = await myAxios.patch(`/course/${id}`, value, {
            headers,
        });
        return data;
    }
);
