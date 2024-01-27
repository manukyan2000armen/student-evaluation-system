import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { getUserByThokenThunk } from "../../features/user/userAPI";
import "./style.scss";
import { NavLink } from "react-router-dom";

function Menu() {
    const navLinkStyles = ({ isActive }: any) => {
        return {
            fontWeight: isActive ? "700" : "normal",
            color: isActive ? "black" : "black",
            letterSpacing: isActive ? "1px" : "normal",
        };
    };

    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const data = Cookies.get("access_token");
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((st: RootState) => st.user);
    const [role, setRole] = useState<string>("");

    const handleLogout = () => {
        Cookies.remove("access_token");
        navigate("/");
    };

    useEffect(() => {
        if (data) {
            dispatch(getUserByThokenThunk())
                .unwrap()
                .then((res) => {
                    setRole(
                        res.role == 2
                            ? "/student"
                            : res.role == 1
                            ? "/teacher"
                            : "/admin"
                    );
                })
                .catch((e: any) => {
                    navigate("/");
                });
        } else {
            if (location.pathname != "/register") {
                navigate("/");
            }
        }
    }, [user]);

    return (
        <div className="myMenu">
            {data ? (
                <div>
                    <div className="myMenuItems">
                        <ul>
                            <li>
                                <NavLink
                                    style={navLinkStyles}
                                    to={role + "/profile"}
                                >
                                    <h3>Profile</h3>
                                </NavLink>
                            </li>
                            {user.role == 0 ? (
                                <>
                                    <li>
                                        <NavLink
                                            style={navLinkStyles}
                                            to={role + "/addUser"}
                                        >
                                            Add User
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            style={navLinkStyles}
                                            to={role + "/user"}
                                        >
                                            User
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            style={navLinkStyles}
                                            to={role + "/course"}
                                        >
                                            Course
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            style={navLinkStyles}
                                            to={role + "/modules"}
                                        >
                                            Modules
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            style={navLinkStyles}
                                            to={role + "/groups"}
                                        >
                                            Group
                                        </NavLink>
                                    </li>
                                </>
                            ) : (
                                <></>
                            )}
                            {user.role == 1 ? (
                                <>
                                    <li>
                                        <NavLink
                                            style={navLinkStyles}
                                            to={role + "/add-homework"}
                                        >
                                            Homework
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            style={navLinkStyles}
                                            to={role + "/groups-teacher"}
                                        >
                                            Groups
                                        </NavLink>
                                    </li>
                                </>
                            ) : (
                                <></>
                            )}
                            {user.role == 1 || 2 ? (
                                <>
                                    <li>
                                        <NavLink
                                            style={navLinkStyles}
                                            to={role + "/settings"}
                                        >
                                            Settings
                                        </NavLink>
                                    </li>
                                </>
                            ) : (
                                <></>
                            )}
                            {user.role == 2 ? (
                                <>
                                    <li>
                                        <NavLink
                                            style={navLinkStyles}
                                            to={role + "/student-homework"}
                                        >
                                            Homework
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            style={navLinkStyles}
                                            to={role + "/student-group"}
                                        >
                                            Group
                                        </NavLink>
                                    </li>
                                </>
                            ) : (
                                <></>
                            )}
                            <li>
                                <button
                                    className="logout"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}

export default Menu;
