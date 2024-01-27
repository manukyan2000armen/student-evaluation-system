import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import {
    createGroup,
    deleteGroup,
    getGroup,
} from "../../../features/Group/groupAPI";
import { Groups } from "../../../features/type";
import Swal from "sweetalert2";
import { getTeacher } from "../../../features/user/userAPI";
import { getModule } from "../../../features/Modules/modulesAPI";
import "./style.scss";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faRemove } from "@fortawesome/free-solid-svg-icons";

function MyGroups() {
    const { arrGroup } = useAppSelector((st: RootState) => st.group);
    console.log(arrGroup, "arrGroup=>");

    const { arrModule } = useAppSelector((st: RootState) => st.module);
    const { arrUser } = useAppSelector((st: RootState) => st.user);
    const { user } = useAppSelector((st: RootState) => st.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getModule());
        dispatch(getGroup());
        dispatch(getTeacher());
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Groups>();

    const addGroup = (data: any) => {
        // console.log(data, "dataaaaaaa");
        dispatch(createGroup(data))
            .unwrap()
            .then(() => dispatch(getGroup()));

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
        });
        reset();
    };

    return (
        <div className="myGroupsDiv">
            <div className="groupsItemsDiv">
                <form onSubmit={handleSubmit(addGroup)}>
                    <div>
                        <input
                            placeholder="Enter Group name"
                            className="form-control"
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
                        <select
                            className="form-control"
                            {...register("activeModuleId")}
                        >
                            <option hidden value={""}>
                                Select Module
                            </option>
                            {arrModule?.map((elm: any) => {
                                return (
                                    <option key={elm} value={elm.id}>
                                        {elm.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    <div>
                        <select
                            className="form-control"
                            {...register("teacherId")}
                        >
                            <option hidden value={""}>
                                Select Teacher
                            </option>
                            {arrUser?.map((elm: any) => {
                                return (
                                    <option key={elm.userId} value={elm.userId}>
                                        {elm.user?.name} {elm.user?.surname}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    <button className="btn btn-primary">Add Group</button>
                </form>
            </div>
            <div className="forAddedGroups">
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr className="table table-primary">
                            <th>Group-Name</th>
                            <th>Personal-Page</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arrGroup?.map((elm: any) => {
                            return (
                                <tr>
                                    <td>{elm.name}</td>
                                    <td>
                                        <Link
                                            to={
                                                user.role == 0
                                                    ? "/admin/see-group/" +
                                                      elm.id
                                                    : user.role == 1
                                                    ? "/teacher/see-group/" +
                                                      elm.id
                                                    : "/student/see-group/" +
                                                      elm.id
                                            }
                                        >
                                            <button className="forPersonal">
                                                <FontAwesomeIcon
                                                    icon={faArrowRight}
                                                />
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            className="forDelete"
                                            onClick={() =>
                                                dispatch(deleteGroup(elm.id))
                                                    .unwrap()
                                                    .then(() =>
                                                        dispatch(getGroup())
                                                    )
                                            }
                                        >
                                            <FontAwesomeIcon icon={faRemove} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default MyGroups;
