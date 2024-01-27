import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { getGroup } from "../../features/Group/groupAPI";
import { getTeacherGroupAndModule } from "../../features/user/userAPI";
import "./style.scss";

function GroupsForTeacher() {
    const { arrGroup, group } = useAppSelector((st: RootState) => st.group);
    console.log("arrGroup==>", arrGroup);

    const [selectedGroup, setSelectedGroup] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getGroup());
        dispatch(getTeacherGroupAndModule());
    }, []);

    const groupClick = (elm: any) => {
        setSelectedGroup(elm);
        setIsOpen(true);
    };

    return (
        <div className="divForGroupsTeacher">
            <div className="forGroups">
                {arrGroup?.map((elm: any) => (
                    <div
                        key={elm.id}
                        className="groupsItems"
                        onClick={() => groupClick(elm)}
                        style={{ cursor: "pointer" }}
                    >
                        <h5>{elm.name}</h5>
                    </div>
                ))}
                {isOpen && (
                    <div className="forSeeModules">
                        <div className="forClose">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="btn btn-dark d-flex justify-content-center align-items-center"
                                style={{ width: "25px", height: "25px" }}
                            >
                                <FontAwesomeIcon icon={faRemove} />
                            </button>
                        </div>
                        <div className="modules">
                            {selectedGroup?.moduleGroups?.map((m: any) => (
                                <div className="moduleItems" key={m.id}>
                                    <h6>{m.module.name}</h6>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default GroupsForTeacher;
