import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { myAxios } from "../../app/store";
import { Grades } from "../type";

export const getGradesByModuleGroupId = createAsyncThunk(
    "get grades by module group id",
    async (id: number) => {
        const headers = {
            Authorization: "Bearer " + Cookies.get("access_token"),
        };
        const { data } = await myAxios.get(
            `/grades/getRateByModuleGroupId/${id}`,
            {
                headers,
            }
        );

        return data;
    }
);

export const changeGrade = createAsyncThunk(
    "change grade",
    async ({ id, value }: { id: number; value: any }) => {
        const headers = {
            Authorization: "Bearer " + Cookies.get("access_token"),
        };
        const { data } = await myAxios.patch(`/grades/${id}`, value, {
            headers,
        });

        return data;
    }
);

export const gradeHomework = createAsyncThunk(
    "grade homework",
    async (value: any) => {
        const headers = {
            Authorization: "Bearer " + Cookies.get("access_token"),
        };
        const { data } = await myAxios.post("/grades", value, { headers });

        return data;
    }
);

export const deleteGrade = createAsyncThunk(
    "delete grade",
    async (id: number) => {
        const headers = {
            Authorization: "Bearer " + Cookies.get("access_token"),
        };
        const { data } = await myAxios.delete(`/grades/${id}`, {
            headers,
        });

        return data;
    }
);
