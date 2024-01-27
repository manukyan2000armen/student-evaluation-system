import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { ChangeCourse } from "../../../component/ChangeCourse";
import { seeCourseById } from "../../../features/Course/courseAPI";
import {
    changeModuleCourse,
    changeModuleName,
    getModule,
    getModuleById,
} from "../../../features/Modules/modulesAPI";
import { Module } from "../../../features/type";
import "./style.scss";

function ChangeModuleModal({ onClose, id }: any) {
    const { arrModule } = useAppSelector((st: RootState) => st.module);
    const { module } = useAppSelector((st: RootState) => st.module);

    console.log(module, "moduleeee=>");

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (id) {
            dispatch(getModuleById(+id))
                .unwrap()
                .then(() => dispatch(getModule()));
        }
    }, [id]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Module>();

    const changeName = (data: any) => {
        dispatch(changeModuleName({ id, value: data }))
            .unwrap()
            .then(() => dispatch(getModule()));

        reset();
        // onClose();
    };
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="forCloseBtn">
                    <button onClick={onClose}>✖</button>
                </div>
                <div>
                    <h5>{module.name}</h5>
                    <h6>{module.course?.name}</h6>
                </div>
                <form onSubmit={handleSubmit(changeName)}>
                    <div>
                        <input
                            className="form-control"
                            placeholder="Enter new name for Module"
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

                <span></span>
                <ChangeCourse id={id} />
            </div>
        </div>
    );
}

export default ChangeModuleModal;
