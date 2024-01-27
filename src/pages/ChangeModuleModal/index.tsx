import React from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { changeModuleName, getModule } from "../../features/Modules/modulesAPI";
import { Module } from "../../features/type";
import "./style.scss";

function ChangeModuleModal({ onClose, id }: any) {
    const { arrModule } = useAppSelector((st: RootState) => st.module);
    const dispatch = useAppDispatch();

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
        onClose();
    };
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="forCloseBtn">
                    <button onClick={onClose}>✖</button>
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
            </div>
        </div>
    );
}

export default ChangeModuleModal;
