import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { ForgotPassword } from "../../features/type";
import { forgotPassword } from "../../features/user/userAPI";
import "./style.scss";

export function ForgotUserPassword() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ForgotPassword>();

    const forgotUserPassword = (data: any) => {
        dispatch(forgotPassword(data));
        reset();
        navigate("/reset-password/" + data.email);
    };

    return (
        <div className="forgotPassword">
            <h2>
                Enter your <span style={{ color: "red" }}>email</span> to reset
                your password
            </h2>
            <div className="forForgot">
                <div>
                    <form onSubmit={handleSubmit(forgotUserPassword)}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Email"
                            {...register("email")}
                        />
                        <button className="btn btn-primary">Send</button>
                    </form>
                </div>
            </div>
            <Link to={"/"}>go back</Link>
        </div>
    );
}
