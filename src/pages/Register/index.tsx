import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { myAxios } from "../../app/store";
import { useAppDispatch } from "../../app/hooks";
import { createUserThunk } from "../../features/user/userAPI";
import './style.scss'

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    surname: Yup.string().required("Surname is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
    role: Yup.string().required("Role is required"),
});

function Register() {
    const dispatch = useAppDispatch();

    const initialValues = {
        name: "",
        surname: "",
        email: "",
        password: "",
        role: "",
    };

    const handleSubmit = async (values: any) => {
        console.log(values);
        dispatch(createUserThunk(values))
            .unwrap()
            .then(console.log)
            .catch(console.log);
    };
    return (
        <div className="registerForm">
            <div className="register">
                <h2>Register</h2>
                
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <div>
                            <Field
                            className="form-control"
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Name"
                            />
                            <ErrorMessage name="name" component="div" />
                        </div>
                        <div>
                            <Field
                            className="form-control"
                                type="text"
                                id="surname"
                                name="surname"
                                placeholder="Surname"
                            />
                            <ErrorMessage name="surname" component="div" />
                        </div>
                        <div>
                            <Field
                            className="form-control"
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                            />
                            <ErrorMessage name="email" component="div" />
                        </div>
                        <div>
                            <Field
                            className="form-control"
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                            />
                            <ErrorMessage name="password" component="div" />
                        </div>
                        <div>
                            <Field as="select" id="role" name="role"  className="form-control">
                                <option value="" label="Select a role" />
                                <option value="1">Teacher</option>
                                <option value="2">Student</option>
                            </Field>
                            <ErrorMessage name="role" component="div" />
                        </div>

                        <button type="submit">Register</button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}

export default Register;
