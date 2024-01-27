import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import ShowGradesForStudent from "../../component/ShowGradesForStudent";
import {
    getHomeworkById,
    getHomeworksByModuleGroupId,
} from "../../features/Homework/homeworkAPI";
import { Groups, Homework } from "../../features/type";
import {
    getGroupByStudentId,
    getHomeworkStudent,
} from "../../features/user/userAPI";
import { useAppDispatch } from "./../../app/hooks";
import "./style.scss";

function ShowStudentHomework() {
    const { homework, arrHomework } = useAppSelector(
        (st: RootState) => st.homework
    );

    const { arrGroup } = useAppSelector((st: RootState) => st.group);
    const [selectHomework, setSelectHomework] = useState<any>(null);
    const [mm, setMM] = useState<number>(0);
    const [openGrades, setOpenGrades] = useState(false);

    const isOpen = () => {
        setOpenGrades(true);
    };

    const isClose = () => {
        setOpenGrades(false);
    };
    // console.log(arrHomework, homework, "homework==>", moduleId, arrGroup);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getGroupByStudentId())
            .unwrap()
            .then((res: Groups[]) => {
                const x = res.map((elm) => {
                    const activeModule: any = elm.moduleGroups.find(
                        (e: any) => elm.activeModuleId === e.module.id
                    );
                    return activeModule;
                });

                setMM(x.length ? x[0].id : 0);

                dispatch(getHomeworksByModuleGroupId(x.length ? x[0].id : 0));
            });
    }, []);

    const [reversedArrHomework, setRev] = useState<Homework[]>([]);

    useEffect(() => {
        setRev(Array.isArray(arrHomework) ? [...arrHomework].reverse() : []);

        if (Array.isArray(arrHomework) && arrHomework.length) {
            dispatch(getHomeworkById(arrHomework[arrHomework.length - 1].id));
            setSelectHomework(1);
        }
    }, [arrHomework]);

    return (
        <div className="showStudentHomework">
            <div className="showItemsDiv">
                <select
                    defaultValue={mm}
                    className="form-control"
                    onChange={(e) => {
                        const selectedModuleId = +e.target.value;
                        dispatch(getHomeworksByModuleGroupId(+e.target.value));
                        setMM(selectedModuleId);
                    }}
                >
                    {arrGroup?.map((elm: any) => {
                        const activeModule: any = elm.moduleGroups.find(
                            (e: any) => elm.activeModuleId === e.module.id
                        );

                        return elm?.moduleGroups?.map((e: any) => {
                            return (
                                <option
                                    key={e.id}
                                    value={e.id}
                                    selected={mm == e.id}
                                >
                                    {e.module.name}
                                </option>
                            );
                        });
                    })}
                </select>
                <select
                    className="form-control"
                    onChange={(e) => {
                        dispatch(getHomeworkById(+e.target.value));
                        setSelectHomework(+e.target.value);
                    }}
                >
                    {reversedArrHomework?.map((elm: Homework) => {
                        return (
                            <option key={elm.id} value={elm.id}>
                                {elm.taskNumber} - {elm.title}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div>
                {selectHomework && (
                    <div className="seeHomework">
                        <h4>
                            {homework.taskNumber} - {homework.title}
                        </h4>
                        <p>
                            <i>{homework.description}</i>
                        </p>
                    </div>
                )}
            </div>
            <div>
                <button
                    className="btn btn-success"
                    style={{ width: "150px" }}
                    onClick={isOpen}
                >
                    Grades
                </button>
            </div>
            {openGrades && (
                <ShowGradesForStudent
                    onClose={isClose}
                    moduleGroupsId={mm}
                    groupId={arrGroup[0].id}
                />
            )}
        </div>
    );
}

export default ShowStudentHomework;
