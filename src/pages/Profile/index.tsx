import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import Admin from "./Admin";
import Student from "./Student";
import Teacher from "./Teacher";
import "./style.scss";

function Profile() {
    const { user } = useAppSelector((st: RootState) => st.user);

    return (
        <div className="forUser">
            <div className="usersCard">
                <div className="dzevakan">
                    <p>●●●</p>
                </div>
                <h2>
                    {user.name} {user.surname}
                </h2>
                <p>Email: {user.email}</p>
                <p>
                    {user.role == 0
                        ? "Admin"
                        : user.role == 1
                        ? "Teacher"
                        : user.role == 2
                        ? "Student"
                        : user.role}
                </p>

                <img
                    src={"http://localhost:3001/uploads/" + user.pic_url}
                    alt=""
                    width={100}
                    height="100"
                    style={{ borderRadius: "50%" }}
                />
            </div>
            {user.role == 0 ? (
                <Admin />
            ) : user.role == 1 ? (
                <Teacher />
            ) : (
                <Student />
            )}
            <Outlet />
        </div>
    );
}

export default Profile;
