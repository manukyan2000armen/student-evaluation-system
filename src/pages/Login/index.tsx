import Cookies from "js-cookie";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAppDispatch } from "../../app/hooks";
import { myAxios } from "../../app/store";
import {
    forgotPassword,
    getUserByThokenThunk,
    resetPassword,
} from "../../features/user/userAPI";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faRemove } from "@fortawesome/free-solid-svg-icons";
import { ForgotPassword, ResetPass } from "../../features/type";
import { useForm } from "react-hook-form";
import { ForgotUserPassword } from "../ForgotPassword";

const validationSchema = Yup.object().shape({
    username: Yup.string().required("Name is required"),
    password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
});
function Login() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [showPassword, setShowPassword] = useState(false);

    const passwordSee = () => {
        setShowPassword((prev) => !prev);
    };

    const initialValues = {
        username: "",
        password: "",
    };

    const handleSubmit = async (values: any) => {
        try {
            const response = await myAxios.post("auth/login", { ...values });
            const { data } = response;
            console.log(data);

            Cookies.set("access_token", data.access_token, { path: "login" });
            console.log(Cookies.get("access_token"));
            navigate(
                data.role == 2
                    ? "/student/profile"
                    : data.role == 1
                    ? "/teacher/profile"
                    : "/admin/profile"
            );
        } catch (error) {
            console.error("Login failed:", error);
        }
    };
    return (
        <div className="loginForm">
            <div className="login">
                <h2>Log In</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <div>
                            <Field
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username"
                            />
                            <ErrorMessage name="username" component="div" />
                        </div>

                        <div style={{ position: "relative" }}>
                            <Field
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Password"
                                style={{ paddingRight: "30px" }}
                            />
                            <span
                                onClick={passwordSee}
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    right: "10px",
                                    transform: "translateY(-50%)",
                                    cursor: "pointer",
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={showPassword ? faEye : faEyeSlash}
                                />
                            </span>
                        </div>
                        <ErrorMessage name="password" component="div" />

                        <button type="submit">Log In</button>
                    </Form>
                </Formik>
                <Link to={"/forgot-password"}>Forgot password ? </Link>
            </div>
        </div>
    );
}

export default Login;
