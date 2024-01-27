import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { getGroup } from "../../features/Group/groupAPI";
import { Groups } from "../../features/type";
import { changeStudentGroup, getUserThunk } from "../../features/user/userAPI";
import Swal from "sweetalert2";

import "./style.scss";

function ChangeGroupStudentModal({ onClose, id }: any) {
    // console.log(id);

    const { arrGroup } = useAppSelector((st: RootState) => st.group);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getGroup());
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const updateStudentGroup = (data: any) => {
        dispatch(changeStudentGroup({ id, value: data }))
            .unwrap()
            .then(() => dispatch(getUserThunk()));
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
        });
        onClose();
    };
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="forCloseModal">
                    <button onClick={onClose}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
                <form onSubmit={handleSubmit(updateStudentGroup)}>
                    <div>
                        <select
                            {...register("groupId")}
                            className="form-control"
                        >
                            <option hidden value="">
                                Select Group
                            </option>
                            {arrGroup?.map((elm: any) => {
                                return (
                                    <option key={elm.id} value={elm.id}>
                                        {elm.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <button className="btn btn-success">Save</button>
                </form>
            </div>
        </div>
    );
}

export default ChangeGroupStudentModal;
