import React from "react";
import { useRoutes } from "react-router-dom";
import AddUser from "../pages/User/AddUser";
import Course from "../pages/Courses/Course";
import Group from "../pages/Group/Groups";
import Home from "../pages/Home";
import Layout from "../pages/Layout";
import Login from "../pages/Login";
import Modules from "../pages/Module/Modules";
import Profile from "../pages/Profile";
import SeeCourseById from "../pages/Courses/SeeCourseById";
import User from "../pages/User";
import Groups from "../pages/Group/Groups";
import SeeGroupById from "../pages/Group/SeeGroupById";
import Homework from "../pages/Teacher/Homework";
import Settings from "../pages/Settings";
import ShowStudentHomework from "../pages/ShowStudentHomework";
import GroupsForTeacher from "../pages/GroupsForTeacher";
import { ForgotUserPassword } from "../pages/ForgotPassword";
import { ResetPassword } from "../pages/ResetPassword";
import ShowGroupsForStudent from "../pages/ShowGroupsForStudent";
import UserVerify from "../pages/UserVerify";

export const MyRouter: React.FC = () => {
    const router = useRoutes([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "",
                    element: <Login />,
                },
                {
                    path: "forgot-password",
                    element: <ForgotUserPassword />,
                },
                {
                    path: "reset-password/:email",
                    element: <ResetPassword />,
                },
                {
                    path: ":name",
                    element: <Home />,
                    children: [
                        {
                            path: "profile",
                            element: <Profile />,
                        },
                        {
                            path: "addUser",
                            element: <AddUser />,
                        },
                        {
                            path: "user",
                            element: <User />,
                        },
                        {
                            path: "course",
                            element: <Course />,
                        },
                        {
                            path: "modules",
                            element: <Modules />,
                        },
                        {
                            path: "groups",
                            element: <Groups />,
                        },
                        {
                            path: "see-course/:id",
                            element: <SeeCourseById />,
                        },
                        {
                            path: "see-group/:id",
                            element: <SeeGroupById />,
                        },
                        {
                            path: "add-homework",
                            element: <Homework />,
                        },
                        {
                            path: "settings",
                            element: <Settings />,
                        },
                        {
                            path: "groups-teacher",
                            element: <GroupsForTeacher />,
                        },
                        {
                            path: "student-homework",
                            element: <ShowStudentHomework />,
                        },
                        {
                            path: "student-group",
                            element: <ShowGroupsForStudent />,
                        },
                    ],
                },
            ],
        },
        {
            path: "/verify",
            element: <UserVerify />,
        },
        {
            path: "*",
            element: <h1>404 page not found</h1>,
        },
    ]);
    return router;
};
