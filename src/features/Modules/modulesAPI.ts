import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { myAxios } from "../../app/store";
import { Module } from "../type";

export const createModule = createAsyncThunk(
    "create module",
    async (value: Module) => {
        const headers = {
            Authorization: "Bearer " + Cookies.get("access_token"),
        };
        const { data } = await myAxios.post("/module", value, { headers });
        return data;
    }
);

export const getModule = createAsyncThunk("get module", async () => {
    const headers = {
        Authorization: "Bearer " + Cookies.get("access_token"),
    };
    const { data } = await myAxios.get("/module", { headers });
    return data;
});

export const getModuleById = createAsyncThunk(
    "get module by id",
    async (id: number) => {
        const headers = {
            Authorization: "Bearer " + Cookies.get("access_token"),
        };
        const { data } = await myAxios.get(`/module/${id}`, { headers });
        return data;
    }
);

export const deleteModule = createAsyncThunk(
    "get module",
    async (id: number) => {
        const headers = {
            Authorization: "Bearer " + Cookies.get("access_token"),
        };
        const { data } = await myAxios.delete(`/module/${id}`, { headers });
        return data;
    }
);

export const changeModuleName = createAsyncThunk(
    "change module name",
    async ({ id, value }: { id: number; value: any }) => {
        const headers = {
            Authorization: "Bearer " + Cookies.get("access_token"),
        };
        const { data } = await myAxios.patch(`/module/${id}`, value, {
            headers,
        });
        return data;
    }
);

export const changeModuleCourse = createAsyncThunk(
    "change module course",
    async ({ id, value }: { id: number; value: any }) => {
        const headers = {
            Authorization: "Bearer " + Cookies.get("access_token"),
        };
        const { data } = await myAxios.patch(
            `/module/changeCourse/${id}`,
            value,
            {
                headers,
            }
        );
        return data;
    }
);
