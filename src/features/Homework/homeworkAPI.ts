import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { myAxios } from "../../app/store";
import { Homework } from "../type";

export const createHomework = createAsyncThunk(
    "create homework",
    async (value: any) => {
        console.log(value);

        const headers = {
            Authorization: "Bearer " + Cookies.get("access_token"),
        };
        const { data } = await myAxios.post("/homework", value, { headers });
        return data;
    }
);

export const getHomeworkById = createAsyncThunk(
    "get homework by id",
    async (id: number) => {
        console.log("===>", id);

        const headers = {
            Authorization: "Bearer " + Cookies.get("access_token"),
        };
        const { data } = await myAxios.get(`/homework/${id}`, { headers });
        return data;
    }
);

export const getHomeworksByModuleGroupId = createAsyncThunk(
    "get homework by module group id",
    async (id: number) => {
        const headers = {
            Authorization: "Bearer " + Cookies.get("access_token"),
        };
        const { data } = await myAxios.get(
            `/homework/findHomeworksByModuleGroupId/${id}`,
            { headers }
        );
        return data;
    }
);

export const deleteHomework = createAsyncThunk(
    "delete homework",
    async (id: number) => {
        const headers = {
            Authorization: "Bearer " + Cookies.get("access_token"),
        };
        const { data } = await myAxios.delete(`/homework/${id}`, { headers });
        return data;
    }
);
