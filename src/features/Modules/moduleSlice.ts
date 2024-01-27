import { createSlice } from "@reduxjs/toolkit";
import { Module } from "../type";
import { getModule, getModuleById } from "./modulesAPI";

const initialState: { arrModule: Module[]; module: Module } = {
    arrModule: [],
    module: {} as Module,
};

const moduleSlice = createSlice({
    name: "module",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getModule.fulfilled, (state: any, action: any) => {
                state.arrModule = action.payload;
            })
            .addCase(getModuleById.fulfilled, (state: any, action: any) => {
                state.module = action.payload;
            });
    },
});

export default moduleSlice.reducer;
