import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { myAxios } from "../../app/store";
import { User } from "../type";

export const createUserThunk = createAsyncThunk(
    "register",
    async (value: User) => {
        const { data } = await myAxios.post("auth/register", value);
        return data;
    }
);

export const getUserThunk = createAsyncThunk("get user ", async () => {
    const headers = { Authorization: "Bearer " + Cookies.get("access_token") };
    const { data } = await myAxios.get("/user", { headers });
    return data;
});

export const getUserByThokenThunk = createAsyncThunk(
    "get user by thunk",
    async () => {
        const headers = {
            Authorization: "Bearer " + Cookies.get("access_token"),
        };
        const { data } = await myAxios.get("auth/profile", { headers });
        return data;
    }
);

// /////////////////////////////////////////////////

export const getUserById = createAsyncThunk(
    "get user by id",
    async (id: number) => {
        const headers = {
            Authorization: "Bearer " + Cookies.get("access_token"),
        };
        const { data } = await myAxios.get(`/user/${id}`, { headers });
        return data;
    }
);

export const changeUserData = createAsyncThunk(
    "change user data",
    async (value: any) => {
        const headers = {
            Authorization: "Bearer " + Cookies.get("access_token"),
        };
        const { data } = await myAxios.patch("/user/us/updateData/", value, {
            headers,
        });
        return data;
    }
);

export const uploadPicture = createAsyncThunk(
    "upload picture",
    async (value: any) => {
        const headers = {
            Authorization: "Bearer " + Cookies.get("access_token"),
        };
        const { data } = await myAxios.patch("/user/updatePicUrl/", value, {
            headers,
        });
        return data;
    }
);

export const changeStudentGroup = createAsyncThunk(
    "change student group",
    async ({ id, value }: { id: number; value: any }) => {
        const headers = {
            Authorization: "Bearer " + Cookies.get("access_token"),
        };
        const { data } = await myAxios.patch(
            `/student/updateGroup/${id}`,
            value,
            {
                headers,
            }
        );
        return data;
    }
);

export const getTeacher = createAsyncThunk("get teacher", async () => {
    const headers = {
        Authorization: "Bearer " + Cookies.get("access_token"),
    };
    const { data } = await myAxios.get("/teacher", { headers });
    return data;
});

export const deleteUser = createAsyncThunk(
    "delete user",
    async (id: number) => {
        const headers = {
            Authorization: "Bearer " + Cookies.get("access_token"),
        };
        const { data } = await myAxios.delete(`/user/${id}`, { headers });
        return data;
    }
);

export const getStudentByGroupId = createAsyncThunk(
    "get student by group id",
    async (id: number) => {
        const headers = {
            Authorization: "Bearer " + Cookies.get("access_token"),
        };
        const { data } = await myAxios.get(
            `/student/getStudentByGroupId/${id}`,
            { headers }
        );
        // console.log("data=>", data);

        return data;
    }
);

export const changeUserPassword = createAsyncThunk(
    "change user password",
    async (value: any) => {
        const headers = {
            Authorization: "Bearer " + Cookies.get("access_token"),
        };
        const { data } = await myAxios.patch(
            "/user/us/changepassword/",
            value,
            {
                headers,
            }
        );
        return data;
    }
);

export const forgotPassword = createAsyncThunk(
    "forgot password",
    async (value: any) => {
        const headers = {
            Authorization: "Bearer " + Cookies.get("access_token"),
        };
        const { data } = await myAxios.patch(
            "/user/us/forgotPassword/",
            value,
            {
                headers,
            }
        );
        return data;
    }
);

export const resetPassword = createAsyncThunk(
    "reset password",
    async ({ email, obj }: { email: any; obj: any }) => {
        const headers = {
            Authorization: "Bearer " + Cookies.get("access_token"),
        };
        const { data } = await myAxios.patch(
            `/user/us/resetPassword/` + email,
            obj,
            {
                headers,
            }
        );
        console.log(data, obj);

        return data;
    }
);

export const getTeacherGroupAndModule = createAsyncThunk(
    "get teacher group and module by thoken",
    async () => {
        const headers = {
            Authorization: "Bearer " + Cookies.get("access_token"),
        };
        const { data } = await myAxios.get(
            "/teacher/getTeacherGroupAndModuleByToken/find",
            { headers }
        );
        return data;
    }
);

export const getGroupByStudentId = createAsyncThunk(
    "get group by student id",
    async () => {
        const headers = {
            Authorization: "Bearer " + Cookies.get("access_token"),
        };
        const { data } = await myAxios.get(
            "/student/getGroupByStudentId/find",
            { headers }
        );
        return data;
    }
);

export const getHomeworkStudent = createAsyncThunk(
    "get homework student",
    async (id: number) => {
        const headers = {
            Authorization: "Bearer " + Cookies.get("access_token"),
        };
        const { data } = await myAxios.get(
            `/student/getHomeworkStudentByModuleId/${id}`,
            { headers }
        );

        return data;
    }
);

export const userVerify = createAsyncThunk("user verify", async (obj:any) => {
    const headers = {
        Authorization: "Bearer " + Cookies.get("access_token"),
    };
    const { data } = await myAxios.post("/user/verify",obj, { headers });
    return data;
});
