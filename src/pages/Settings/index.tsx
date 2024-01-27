import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import {
    changeUserData,
    changeUserPassword,
    forgotPassword,
    getUserByThokenThunk,
    getUserThunk,
    resetPassword,
    uploadPicture,
} from "../../features/user/userAPI";
import Admin from "../Profile/Admin";
import Teacher from "../Profile/Teacher";
import Student from "../Profile/Student";
import { Outlet } from "react-router-dom";
import "./style.scss";
import { useForm } from "react-hook-form";
import {
    ChangePassword,
    ForgotPassword,
    ResetPass,
    User,
} from "../../features/type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";

function Settings() {
    const { user } = useAppSelector((st: RootState) => st.user);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<User>();

    const updateUserData = (data: any) => {
        dispatch(changeUserData(data))
            .unwrap()
            .then(() => dispatch(getUserThunk()));

        reset();
    };

    const uploadPic = (data: FormData) => {
        dispatch(uploadPicture(data))
            .unwrap()
            .then(() => dispatch(getUserByThokenThunk()));
        dispatch(getUserByThokenThunk());
    };

    return (
        <div>
            <div className="user">
                <div className="userCard">
                    <div className="forPicUser">
                        <img
                            src={
                                "http://localhost:3001/uploads/" + user.pic_url
                            }
                            width="100%"
                            height={"100%"}
                        />
                    </div>
                    <input
                        src={user.pic_url}
                        className="form-control"
                        type="file"
                        onChange={(e) => {
                            console.log(e.target.files);
                            let x = e.target?.files;
                            const data = new FormData();
                            if (x) {
                                data.append("file", x[0]);
                                uploadPic(data);
                            }
                        }}
                    />
                    <div className="usersData">
                        <h2>
                            {user.name} {user.surname}
                        </h2>

                        {!isFormOpen && (
                            <button onClick={() => setIsFormOpen(true)}>
                                Change
                            </button>
                        )}
                        {isFormOpen && (
                            <button onClick={() => setIsFormOpen(false)}>
                                <FontAwesomeIcon icon={faRemove} />
                            </button>
                        )}
                    </div>
                    {isFormOpen && (
                        <div className="myFormForData">
                            <form onSubmit={handleSubmit(updateUserData)}>
                                <input
                                    className="form-control"
                                    placeholder="Name"
                                    type="text"
                                    id="name"
                                    {...register("name", {
                                        required: "Name is required",
                                    })}
                                />
                                {errors.name && <p>{errors.name.message}</p>}

                                <input
                                    className="form-control"
                                    placeholder="Surname"
                                    type="text"
                                    id="surname"
                                    {...register("surname", {
                                        required: "Surname is required",
                                    })}
                                />
                                {errors.surname && (
                                    <p>{errors.surname.message}</p>
                                )}

                                <button
                                    type="submit"
                                    className="btn btn-success"
                                >
                                    Save
                                </button>
                            </form>
                        </div>
                    )}
                </div>

                {user.role == 0 ? (
                    <Admin />
                ) : user.role == 1 ? (
                    <Teacher />
                ) : (
                    <Student />
                )}
                <Outlet />
                <ChangeUserPassword />
            </div>
        </div>
    );
}

export default Settings;

// change password ////////////////////////////////////////////////////////////////////////

export function ChangeUserPassword() {
    const [isPasswordFormOpen, setIsPasswordFormOpen] = useState(false);
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ChangePassword>();
    const updatePassword = (data: any) => {
        dispatch(changeUserPassword(data));
        reset();
    };

    return (
        <div className="changePasswordDiv">
            {!isPasswordFormOpen && (
                <button
                    onClick={() => setIsPasswordFormOpen(true)}
                    className="btn btn-outline-success"
                >
                    Change Password
                </button>
            )}
            {isPasswordFormOpen && (
                <button
                    onClick={() => setIsPasswordFormOpen(false)}
                    className="btn btn-dark d-flex justify-content-center align-items-center"
                    style={{ width: "25px", height: "25px" }}
                >
                    <FontAwesomeIcon icon={faRemove} />
                </button>
            )}
            {isPasswordFormOpen && (
                <div>
                    <form onSubmit={handleSubmit(updatePassword)}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Current Password"
                            {...register("currentPassword")}
                        />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Password"
                            {...register("password")}
                        />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Confirmation Password"
                            {...register("confirmationPassword")}
                        />
                        <button
                            className="btn btn-success"
                            style={{ width: "210px" }}
                        >
                            Save
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
