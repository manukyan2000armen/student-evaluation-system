import { faPen, faRemove, faTrash } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { getGradesByModuleGroupId } from "../../../features/Grades/gradesAPI";
import { getHomeworksByModuleGroupId } from "../../../features/Homework/homeworkAPI";
import { Grades, Student } from "../../../features/type";
import { getStudentByGroupId } from "../../../features/user/userAPI";
import ChangeGradesModal from "../../ChangeGradesModal";
import "./style.scss";

function ShowGrades({ moduleGroupsId, groupId }: any) {
    const { arrGrades, grades } = useAppSelector((st: RootState) => st.grades);
    const { arrUser } = useAppSelector((st: RootState) => st.user);
    const { arrHomework } = useAppSelector((st: RootState) => st.homework);
    // console.log("arrUser=====>", moduleGroupsId, groupId, arrGrades);
    console.log(grades, "arrGrades =>");

    const dispatch = useAppDispatch();
    const [gradeModal, setGradeModal] = useState<any>({
        num: 0,
        bool: false,
        studentId: 0,
        homeworkId: 0,
    });

    const isGradeModalOpen = (
        id: number,
        bool: boolean,
        studentId?: number,
        homeworkId?: number
    ) => {
        setGradeModal({
            num: id,
            bool,
            studentId,
            homeworkId,
        });
    };

    const isGradeModalClose = () => {
        setGradeModal({
            num: 0,
            bool: false,
        });
    };

    useEffect(() => {
        if (moduleGroupsId) {
            dispatch(getGradesByModuleGroupId(moduleGroupsId))
                .unwrap()
                .then(console.warn);
            dispatch(getHomeworksByModuleGroupId(moduleGroupsId))
                .unwrap()
                .then(console.log);
        }
    }, [moduleGroupsId]);

    useEffect(() => {
        if (groupId) {
            dispatch(getStudentByGroupId(groupId));
        }
    }, [groupId]);

    return (
        <div className="showGrades">
            <div className="table table-responsive">
                <table className="table table-bordered table-hover table-responsive">
                    <thead className="table-dark">
                        <tr>
                            <th>Student</th>
                            {Array.from({ length: 12 }).map(
                                (_, classNumber) => (
                                    <th key={classNumber + 1}>
                                        Class {classNumber + 1}
                                    </th>
                                )
                            )}
                        </tr>
                    </thead>

                    <tbody>
                        {grades?.students?.map((elm: any) => {
                            return (
                                <tr key={elm.id}>
                                    <td>
                                        {elm.user.name} {elm.user.surname}
                                    </td>
                                    {Array.from({ length: 12 }).map(
                                        (_, classNumber) => {
                                            const taskNumber = classNumber + 1;
                                            const hasRating: any =
                                                grades?.grade?.find(
                                                    (e: any) =>
                                                        e.homework
                                                            ?.taskNumber ===
                                                            taskNumber
                                                             &&
                                                        e.student.userId ==
                                                            elm.userId
                                                );

                                            const homework =
                                                grades?.homeworks?.some(
                                                    (elm: any) =>
                                                        elm.taskNumber ===
                                                        taskNumber
                                                );

                                            return (
                                                <td
                                                    key={classNumber}
                                                    onClick={() => {
                                                        if (hasRating) {
                                                            isGradeModalOpen(
                                                                hasRating.id,
                                                                true
                                                            );
                                                        } else {
                                                            const home =
                                                                arrHomework.find(
                                                                    (
                                                                        elem: any
                                                                    ) =>
                                                                        elem.taskNumber ===
                                                                        taskNumber
                                                                );
                                                            if (home) {
                                                                isGradeModalOpen(
                                                                    -1,
                                                                    false,
                                                                    elm.userId,
                                                                    home.id,
                                                                );
                                                            }
                                                        }
                                                    }}
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    {homework ? (
                                                        <div>
                                                            {hasRating
                                                                ? hasRating.rating
                                                                : "-"}
                                                        </div>
                                                    ) : (
                                                        <div></div>
                                                    )}
                                                </td>
                                            );
                                        }
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {gradeModal.num !== 0 && (
                <ChangeGradesModal
                    onClose={isGradeModalClose}
                    gradeModal={gradeModal}
                    moduleGroupsId={moduleGroupsId}
                />
            )}
        </div>
    );
}

export default ShowGrades;
