import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Homework } from "../../../features/type";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
    createHomework,
    getHomeworkById,
    getHomeworksByModuleGroupId,
} from "../../../features/Homework/homeworkAPI";
import Swal from "sweetalert2";
import "./style.scss";
import { RootState } from "../../../app/store";

export default function AddHomework({ onClose, moduleGroupsId }: any) {
    // console.log(moduleGroupsId, "moduleGroupsId=>");
    const { arrHomework, homework } = useAppSelector(
        (st: RootState) => st.homework
    );
    const dispatch = useAppDispatch();
    // console.log("arrHomework=>", arrHomework);

    useEffect(() => {
        if (moduleGroupsId) {
            dispatch(getHomeworksByModuleGroupId(moduleGroupsId));
        }
    }, [moduleGroupsId, dispatch]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Homework>();

    const addHomework = (data: Homework) => {
        // console.log(data, "data=>");
        if (data) {
            dispatch(
                createHomework({
                    ...data,
                    moduleGroupsId,
                    taskNumber: arrHomework.length + 1,
                })
            )
                .unwrap()
                .then((res) => {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    dispatch(getHomeworksByModuleGroupId(moduleGroupsId))
                        .unwrap()
                        .then(console.log);
                });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
        reset();
    };

    return (
        <div className="addHomeworkDiv">
            <form onSubmit={handleSubmit(addHomework)}>
                <div>
                    <input
                        placeholder="Title..."
                        className="form-control"
                        type="text"
                        {...register("title", {
                            required: "Fill in the field",
                            pattern: {
                                value: /[a-zA-Z0-9-]/,
                                message: "Fill in the letters",
                            },
                        })}
                    />
                    {errors.title && (
                        <p className="text-danger">{errors.title.message}</p>
                    )}
                </div>
                <div>
                    <textarea
                        className="form-control"
                        placeholder="Description..."
                        {...register("description", {
                            required: "Fill in the field",
                            pattern: {
                                value: /[a-zA-Z0-9-]/,
                                message: "Fill in the letters",
                            },
                        })}
                    />
                    {errors.description && (
                        <p className="text-danger">
                            {errors.description.message}
                        </p>
                    )}
                </div>
                <div>
                    <button>Save</button>
                </div>
            </form>
        </div>
    );
}
