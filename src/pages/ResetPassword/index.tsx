import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { ResetPass } from "../../features/type";
import { resetPassword } from "../../features/user/userAPI";
import "./style.scss";

export function ResetPassword() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ResetPass>();

    const resetPassWithEmail = (data: any) => {
        dispatch(resetPassword({ email: params.email, obj: data }))
            .unwrap()
            .then((res) => {
                console.log(res);

                reset();
                navigate("/");
            })
            .catch(console.log);
    };

    return (
        <div className="forResetPassword">
            <h2>
                Write down the received{" "}
                <span style={{ color: "red" }}>code</span> and new password
            </h2>
            <div className="forForm">
                <form onSubmit={handleSubmit(resetPassWithEmail)}>
                    <input
                        type="text"
                        {...register("code")}
                        placeholder="Code"
                        className="form-control"
                    />
                    <input
                        type="text"
                        {...register("password")}
                        placeholder="Password"
                        className="form-control"
                    />
                    <input
                        type="text"
                        {...register("confirm_password")}
                        placeholder="Confirm Password"
                        className="form-control"
                    />
                    <button className="btn btn-success">Save</button>
                </form>
            </div>
            <Link to={"/forgot-password"}>Go back</Link>
            <br />
            <Link to={"/"}>Login</Link>
        </div>
    );
}
