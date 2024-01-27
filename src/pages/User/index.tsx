import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { deleteUser, getUserThunk } from "../../features/user/userAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowRight,
    faArrowUpFromGroundWater,
    faChampagneGlasses,
} from "@fortawesome/free-solid-svg-icons";
import "./style.scss";
import { Link } from "react-router-dom";
import ChangeGroupStudentModal from "../../component/ChangeGroupStudentModal";

function User() {
    const { arrUser } = useAppSelector((st: RootState) => st.user);
    const { user } = useAppSelector((st: RootState) => st.user);
    const [changeGroupModal, setChangeGroupModal] = useState(false);
    const [stId, setStId] = useState<number>(0);
    const openChangeGroupModal = () => {
        setChangeGroupModal(true);
    };

    const closeChangeGroupModal = () => {
        setChangeGroupModal(false);
    };

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUserThunk());
    }, []);
    return (
        <div className="forUserPage">
            <div className="userItems">
                {arrUser?.map((elm: any) => {
                    return (
                        <div className="usersCard">
                            <div className="forPic">
                                <img
                                    src={
                                        "http://localhost:3001/uploads/" +
                                        user.pic_url
                                    }
                                    width="100%"
                                    height={"100%"}
                                />
                            </div>
                            <h4>
                                {elm.name} {elm.surname}
                            </h4>
                            <p>
                                {elm.role == 1
                                    ? "Teacher"
                                    : elm.role == 2
                                    ? "Student"
                                    : "Admin"}
                            </p>
                            <button
                                className="btnDeleteUser"
                                onClick={() =>
                                    dispatch(deleteUser(elm.id))
                                        .unwrap()
                                        .then(() => dispatch(getUserThunk()))
                                }
                            >
                                Delete
                            </button>
                            {elm?.role == 2 ? (
                                <button
                                    className="btnRigth"
                                    onClick={() => {
                                        openChangeGroupModal();
                                        setStId(elm.id);
                                    }}
                                >
                                    Change Group
                                </button>
                            ) : (
                                ""
                            )}
                        </div>
                    );
                })}
            </div>
            {changeGroupModal && (
                <ChangeGroupStudentModal
                    id={stId}
                    onClose={closeChangeGroupModal}
                />
            )}
        </div>
    );
}

export default User;
