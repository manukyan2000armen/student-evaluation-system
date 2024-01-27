import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import {
    changeCourseData,
    seeCourseById,
} from "../../../features/Course/courseAPI";
import { getModule } from "../../../features/Modules/modulesAPI";
import { Courses } from "../../../features/type";
import "./style.scss";

function ChangeCourseData({ onClose, id }: any) {
    const dispatch = useAppDispatch();

    const changeData = (data: Courses) => {
        dispatch(changeCourseData({ value: data, id }))
            .unwrap()
            .then(() => dispatch(seeCourseById(id)));
        reset();
        onClose();
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Courses>();
    return (
        <div className="modal2">
            <div className="modal-content2">
                <div className="forCloseBtn">
                    <button onClick={onClose}>✖</button>
                </div>
                <form onSubmit={handleSubmit(changeData)}>
                    <div>
                        <input
                            className="form-control"
                            placeholder="Enter new name for Course"
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
                        <button className="changeModule">Change</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ChangeCourseData;
