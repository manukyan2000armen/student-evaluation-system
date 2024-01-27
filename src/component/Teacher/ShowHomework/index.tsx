import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import {
    deleteHomework,
    getHomeworkById,
} from "../../../features/Homework/homeworkAPI";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";

function ShowHomework({ onClose, moduleGroupsId }: any) {
    const { arrHomework, homework } = useAppSelector(
        (st: RootState) => st.homework
    );
    const dispatch = useAppDispatch();
    const [selectHomework, setSelectHomework] = useState<any>(null);

    useEffect(() => {
        if (moduleGroupsId) {
            dispatch(getHomeworkById(moduleGroupsId));
        }
    }, [moduleGroupsId]);

    return (
        <div className="seeHomeworkDiv">
            <div className="seeHomeworkDiv2">
                <select
                    className="form-control lg"
                    onChange={(e) => {
                        dispatch(getHomeworkById(+e.target.value));
                        setSelectHomework(+e.target.value);
                    }}
                >
                    <option hidden value={""}>
                        Select Homework
                    </option>
                    {arrHomework?.map((elm: any) => {
                        return (
                            <option key={elm.id} value={elm.id}>
                                {elm.title}
                            </option>
                        );
                    })}
                </select>
                {selectHomework && (
                    <div className="seeHomeworkItems">
                        <div className="forDelHomework">
                            <button
                                onClick={() =>
                                    dispatch(deleteHomework(homework.id))
                                        .unwrap()
                                        .then(() =>
                                            dispatch(
                                                getHomeworkById(homework.id)
                                            )
                                        )
                                }
                            >
                                <FontAwesomeIcon icon={faRemove} />
                            </button>
                        </div>
                        <h4>{homework.title}</h4>
                        <p>{homework.description}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ShowHomework;
