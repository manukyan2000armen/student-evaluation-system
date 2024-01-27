import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { myAxios } from "../../app/store";
import { Groups } from "../type";

export const createGroup = createAsyncThunk(
    "create group",
    async (value: Groups) => {
        const headers = {
            Authorization: "Bearer " + Cookies.get("access_token"),
        };
        const { data } = await myAxios.post("/group", value, { headers });
        return data;
    }
);
export const getGroupByTeacherId = createAsyncThunk(
    "get grop teacher by id",
    async (id: number) => {
        const headers = {
            Authorization: "Bearer " + Cookies.get("access_token"),
        };
        const { data } = await myAxios.get(`/teacher/${id}`, { headers });
        console.log(data);

        return data.groups;
    }
);

export const getTeacherGroupAndModuleByToken = createAsyncThunk(
    "get Teacher Group And Module By Token",
    async () => {
        const headers = {
            Authorization: "Bearer " + Cookies.get("access_token"),
        };
        const { data } = await myAxios.get(
            "teacher/getTeacherGroupAndModuleByToken/find",
            { headers }
        );
        return data;
    }
);

export const getGroup = createAsyncThunk("get group", async () => {
    const headers = {
        Authorization: "Bearer " + Cookies.get("access_token"),
    };
    const { data } = await myAxios.get("/group", { headers });
    return data;
});

export const getGroupById = createAsyncThunk(
    "get group by id",
    async (id: number) => {
        const headers = {
            Authorization: "Bearer " + Cookies.get("access_token"),
        };
        const { data } = await myAxios.get(`/group/${id}`, { headers });
        // console.log("===>", data);
        return data;
    }
);



export const deleteGroup = createAsyncThunk(
    "delete group",
    async (id: number) => {
        const headers = {
            Authorization: "Bearer " + Cookies.get("access_token"),
        };
        const { data } = await myAxios.delete(`/group/${id}`, { headers });
        return data;
    }
);

export const updateGroupName = createAsyncThunk(
    "update group name",
    async ({ id, value }: { id: number; value: any }) => {
        const headers = {
            Authorization: "Bearer " + Cookies.get("access_token"),
        };
        const { data } = await myAxios.patch(`/group/updateName/${id}`, value, {
            headers,
        });
        return data;
    }
);

export const updateGroupTeacher = createAsyncThunk(
    "update group teacher",
    async ({ id, value }: { id: number; value: any }) => {
        const headers = {
            Authorization: "Bearer " + Cookies.get("access_token"),
        };
        const { data } = await myAxios.patch(
            `/group/updateTeacher/${id}`,
            value,
            {
                headers,
            }
        );
        return data;
    }
);

export const updateGroupModule = createAsyncThunk(
    "update group module",
    async ({ id, value }: { id: number; value: any }) => {
        const headers = {
            Authorization: "Bearer " + Cookies.get("access_token"),
        };
        const { data } = await myAxios.patch(
            `/group/updateModule/${id}`,
            value,
            {
                headers,
            }
        );
        return data;
    }
);
