import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import {
    getGroup,
    getGroupById,
    getGroupByTeacherId,
} from "../../../features/Group/groupAPI";
import {
    getHomeworkById,
    getHomeworksByModuleGroupId,
} from "../../../features/Homework/homeworkAPI";
import homeworkSlice from "../../../features/Homework/homeworkSlice";
import "./style.scss";
import AddHomework from "../AddHomework";
import ShowGrades from "../ShowGrades";
import ShowHomework from "../ShowHomework";

function SelectGroupAndModule({ onClose }: any) {
    const { user } = useAppSelector((st: RootState) => st.user);
    const { arrGroup, group } = useAppSelector((st: RootState) => st.group);
    const { homework, arrHomework } = useAppSelector(
        (st: RootState) => st.homework
    );

    const [open, setOpen] = useState<boolean>(false);
    const [openAddHomework, setOpenAddHomework] = useState(false);
    const [openGrades, setOpenGrades] = useState(false);
    const [openHomework, setOpenHomework] = useState(false);
    const [groupId, setgroupId] = useState<any>(null);
    const [moduleGroupsId, setmoduleGroupsId] = useState<any>(null);
    const [taskNumber, setTaskNumber] = useState<any>(null);
    // console.log(arrHomework, "=>>>>>>", groupId, moduleGroupsId);

    const isOpenHomework = () => {
        setOpenHomework(true);
        setOpenAddHomework(false);
        setOpenGrades(false);
    };

    const isCloseHomework = () => {
        setOpenHomework(false);
    };

    const isOpen = () => {
        setOpenAddHomework(true);
        setOpenHomework(false);
        setOpenGrades(false);
    };

    const isClose = () => {
        setOpenAddHomework(false);
    };

    const isOpenGrades = () => {
        setOpenGrades(true);
        setOpenAddHomework(false);
        setOpenHomework(false);
    };
    const isCloseGrades = () => {
        setOpenGrades(false);
    };

    // console.log(user, arrGroup);
    // console.log(group);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user.id) dispatch(getGroupByTeacherId(user.id));
    }, [user]);
    return (
        <>
            <div className="forSelects">
                <div className="selectDiv">
                    <select
                        className="form-control"
                        onChange={(e) => {
                            // console.log(e.target.value);
                            dispatch(getGroupById(+e.target.value));
                            setgroupId(+e.target.value);
                        }}
                    >
                        <option hidden value={""}>
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
                    {group.moduleGroups?.length ? (
                        <select
                            className="form-control"
                            onChange={(e) => {
                                // console.log(e.target.value);
                                dispatch(
                                    getHomeworksByModuleGroupId(+e.target.value)
                                );
                                setOpen(true);
                                setmoduleGroupsId(e.target.value);
                            }}
                        >
                            <option hidden value={""}>
                                Select Module
                            </option>
                            {group.moduleGroups?.map((elm: any) => {
                                return (
                                    <option key={elm.id} value={elm.id}>
                                        {elm.module.name}
                                    </option>
                                );
                            })}
                        </select>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            <div className="d1">
                {open && (
                    <div className="forButtons">
                        <button className="add" onClick={isOpen}>
                            Add Homework
                        </button>
                        <button className="seegrades" onClick={isOpenGrades}>
                            See Grades
                        </button>
                        <button
                            className="seeHomework"
                            onClick={isOpenHomework}
                        >
                            See Homework
                        </button>
                    </div>
                )}
            </div>
            {openAddHomework && (
                <AddHomework
                    onClose={isClose}
                    moduleGroupsId={moduleGroupsId}
                />
            )}
            {openGrades && (
                <ShowGrades
                    onClose={isCloseGrades}
                    moduleGroupsId={moduleGroupsId}
                    groupId={groupId}
                    taskNumber={taskNumber}
                />
            )}
            {openHomework && (
                <ShowHomework
                    onClose={isCloseHomework}
                    moduleGroupsId={moduleGroupsId}
                />
            )}
        </>
    );
}

export default SelectGroupAndModule;
