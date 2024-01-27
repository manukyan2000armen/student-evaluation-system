import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import {
    createModule,
    deleteModule,
    getModule,
} from "../../features/Modules/modulesAPI";
import { Module } from "../../features/type";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { getCourse } from "../../features/Course/courseAPI";
import "./style.scss";
import ChangeModuleModal from "../ChangeModuleModal";

function Modules() {
    const { arrModule } = useAppSelector((st: RootState) => st.module);
    console.log(arrModule, "arrModule=>");
    const [openId, setOpenId] = useState<number>(-1)
    const { arrCourse } = useAppSelector((st: RootState) => st.course);
    const dispatch = useAppDispatch();

    const [moduleModal, setModuleModal] = useState(false);

    const openModuleModal = () => {
        setModuleModal(true);
    };

    const closeModuleModal = () => {
        setModuleModal(false);
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Module>();

    const addModule = (data: Module) => {
        dispatch(createModule(data))
            .unwrap()
            .then(() => dispatch(getModule()));
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
        });
    };

    useEffect(() => {
        dispatch(getModule());
        dispatch(getCourse());
    }, []);
    return (
        <div className="modulesDiv">
            <div className="addModule">
                <form onSubmit={handleSubmit(addModule)}>
                    <div>
                        <input
                            placeholder="Module name:"
                            className="form-control"
                            type="text"
                            {...register("name", {
                                required: "Fill in the field",
                                pattern: {
                                    value: /[a-zA-Z0-9-]/,
                                    message: "Fill in the letters",
                                },
                            })}
                        />
                        {errors.name && (
                            <p className="text-danger">{errors.name.message}</p>
                        )}
                    </div>
                    <div>
                        <select
                            {...register("courseId")}
                            className="form-control"
                        >
                            <option disabled>Select Course</option>
                            {arrCourse.map((elm: any) => {
                                return (
                                    <option key={elm.id} value={elm.id}>
                                        {elm.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div>
                        <button>Save</button>
                    </div>
                </form>
            </div>
            <div className="forModules">
                {arrModule.map((elm: any) => {
                    return (
                        <>
                            <div className="moduleItems">
                                <h4>{elm.name}</h4>
                                <div className="forDeleteDiv">
                                    <button
                                        onClick={() =>
                                            dispatch(deleteModule(elm.id))
                                                .unwrap()
                                                .then(() =>
                                                    dispatch(getModule())
                                                )
                                        }
                                    >
                                        ✖
                                    </button>
                                </div>
                                <div>
                                    <button
                                        className="btnChangeModuleName"
                                        onClick={()=>{
                                            openModuleModal()
                                            setOpenId(elm.id)
                                        }}
                                    >
                                        Change
                                    </button>
                                </div>
                            </div>
                        </>
                    );
                })}
            </div>
            {moduleModal && <ChangeModuleModal id={openId} onClose={closeModuleModal} />}
        </div>
    );
}

export default Modules;
