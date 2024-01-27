import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { useAppDispatch } from "./../../app/hooks";
import { getGroupByStudentId } from "./../../features/user/userAPI";
import "./style.scss";

function ShowGroupsForStudent() {
    const { arrGroup } = useAppSelector((st: RootState) => st.group);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedModule, setSelectedModule] = useState<any>(null);
    //     console.log(arrGroup, "===>");

    const moduleClick = (elm: any) => {
        setSelectedModule(elm);
        setIsOpen(true);
    };

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getGroupByStudentId());
    }, []);
    return (
        <div className="showGroupStudent">
            {arrGroup?.map((elm: any) => {
                const activeModule = elm.moduleGroups.find(
                    (e: any) => elm.activeModuleId === e.module.id
                );
                //     console.log(activeModule, "activeMoudle");

                return (
                    <div
                        key={elm.id}
                        className="showGroupItem"
                        style={{ cursor: "pointer" }}
                        onClick={() => moduleClick(elm)}
                    >
                        <h6> {elm.name}</h6>
                        <p>
                            <i>{activeModule?.module.name}</i>
                        </p>
                        {isOpen && (
                            <div className="seeModule">
                                <div className="forClose">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsOpen(false);
                                        }}
                                        className="btn btn-dark d-flex justify-content-center align-items-center"
                                        style={{
                                            width: "25px",
                                            height: "25px",
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faRemove} />
                                    </button>
                                </div>
                                <div className="module">
                                    {selectedModule.moduleGroups?.map(
                                        (e: any) => {
                                            return (
                                                <div
                                                    key={e.id}
                                                    className="moduleItem"
                                                >
                                                    <h6>{e.module.name}</h6>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default ShowGroupsForStudent;
