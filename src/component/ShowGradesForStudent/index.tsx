import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { useAppDispatch } from "./../../app/hooks";
import { useEffect } from "react";
import { getGradesByModuleGroupId } from "../../features/Grades/gradesAPI";
import { getHomeworksByModuleGroupId } from "../../features/Homework/homeworkAPI";
import { getStudentByGroupId } from "../../features/user/userAPI";
import { Student } from "../../features/type";

function ShowGradesForStudent({ onClose, moduleGroupsId, groupId }: any) {
    const { arrGrades, grades } = useAppSelector((st: RootState) => st.grades);

    console.log(arrGrades, grades, "arrGrades=>", moduleGroupsId, groupId);
    // console.log(arrHomework, "arrHomework=>");

    const dispatch = useAppDispatch();

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
        <div>
            <button
                onClick={onClose}
                className="btn btn-dark d-flex justify-content-center align-items-center"
                style={{ width: "25px", height: "25px" }}
            >
                <FontAwesomeIcon icon={faRemove} />
            </button>
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
                            {grades?.students?.map((elem: any) => {
                                return (
                                    <tr key={elem.id}>
                                        <td>
                                            {elem.user.name} {elem.user.surname}
                                        </td>
                                        {Array.from({ length: 12 }).map(
                                            (_, classNumber) => {
                                                const taskNumber =
                                                    classNumber + 1;
                                                const grade: any =
                                                    grades?.grade?.find(
                                                        (elm: any) =>
                                                            elm.homework
                                                                ?.taskNumber ===
                                                                taskNumber &&
                                                            elm.student
                                                                .userId ==
                                                                elem.userId
                                                    );

                                                const homework =
                                                    grades?.homeworks?.some(
                                                        (elm: any) =>
                                                            elm.taskNumber ===
                                                            taskNumber
                                                    );

                                                return (
                                                    <td key={classNumber}>
                                                        {homework ? (
                                                            <div>
                                                                {grade
                                                                    ? grade.rating
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
            </div>
        </div>
    );
}

export default ShowGradesForStudent;
