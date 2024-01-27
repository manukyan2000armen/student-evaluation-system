import { faRemove, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import Swal from "sweetalert2";

import {
    changeGrade,
    deleteGrade,
    getGradesByModuleGroupId,
    gradeHomework,
} from "../../features/Grades/gradesAPI";
import { Grades } from "../../features/type";
import { getUserThunk } from "../../features/user/userAPI";
import "./style.scss";

function ChangeGradesModal({ onClose, gradeModal, moduleGroupsId }: any) {
    const { arrGrades, grades } = useAppSelector((st: RootState) => st.grades);

    console.log("Arrgrades==>", arrGrades, grades, gradeModal, moduleGroupsId);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Grades>();
    const dispatch = useAppDispatch();

    const updateGrade = async (data: Grades) => {
        if (data.rating > 10) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Rate on a 10-point scale!",
            });
        } else {
            try {
                console.log("====>");
                if (gradeModal.bool) {
                    await dispatch(
                        changeGrade({ id: gradeModal.num, value: data })
                    ).unwrap().then(console.error)
                    await dispatch(getGradesByModuleGroupId(moduleGroupsId));
                    
                    onClose();
                } else {
                    await dispatch(
                        gradeHomework({
                            ...data,
                            homeworkId: gradeModal.homeworkId,
                            studentId: gradeModal.studentId,
                        })
                    ).unwrap().then(console.error)
                    await dispatch(getGradesByModuleGroupId(moduleGroupsId));
                    onClose();
                }
            } catch (error) {
                console.error("Error", error);
            }
        }
        reset();
    };

    const removeGrade = () => {
        dispatch(deleteGrade(gradeModal.num))
            .unwrap()
            .then(() => {
                dispatch(getGradesByModuleGroupId(moduleGroupsId));
                onClose();
            });
    };

    useEffect(() => {
        if (moduleGroupsId) {
            dispatch(getGradesByModuleGroupId(moduleGroupsId));
        }
    }, [moduleGroupsId, dispatch]);

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="forBtn">
                    <button onClick={removeGrade}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button onClick={onClose}>
                        <FontAwesomeIcon icon={faRemove} />
                    </button>
                </div>

                <div>
                    <form onSubmit={handleSubmit(updateGrade)}>
                        <div>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Enter new grade here"
                                {...register("rating", {
                                    required: "Fill in the field",
                                    pattern: {
                                        value: /[a-zA-Z0-9-]/,
                                        message: "Fill in the number",
                                    },
                                })}
                            />
                            {errors.rating && (
                                <p className="text-danger">
                                    {errors.rating.message}
                                </p>
                            )}
                        </div>
                        <button className="btn btn-success">Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChangeGradesModal;
