import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { ChangeGroupTeacher } from "../../../component/ChangeGroupTeacher";
import { ChangeModuleName } from "../../../component/ChangeModuleName";
import {
    getGroupById,
    updateGroupModule,
    updateGroupName,
    updateGroupTeacher,
} from "../../../features/Group/groupAPI";
import { getModule } from "../../../features/Modules/modulesAPI";
import { Groups } from "../../../features/type";
import { getTeacher, getUserThunk } from "../../../features/user/userAPI";
import "./style.scss";

function SeeGroupById() {
    const { group } = useAppSelector((st: RootState) => st.group);

    const dispatch = useAppDispatch();
    const params = useParams();
    console.log(group, "group => ");

    useEffect(() => {
        dispatch(getModule());
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Groups>();

    const changeGroupName = (data: any) => {
        if (params.id)
            dispatch(updateGroupName({ id: +params.id, value: data }))
                .unwrap()
                .then(() => {
                    if (params.id) {
                        dispatch(getGroupById(+params.id));
                    }
                });

        reset();
    };

    useEffect(() => {
        if (params.id) {
            dispatch(getGroupById(+params.id));
        }
    }, []);

    return (
        <div className="seeGroup">
            <div className="forChangeData">
                <h4>Change Group Datas</h4>
                <form onSubmit={handleSubmit(changeGroupName)}>
                    <div>
                        <input
                            placeholder="Enter new name for group"
                            className="form-control"
                            type="text"
                            {...register("name", {
                                required: "Fill in the field",
                                pattern: {
                                    value: /[a-zA-Z0-9-]/,
                                    message: "Fill in the letters",
                                },
                            })}
                        />
                        {errors.name && (
                            <p className="text-danger">{errors.name.message}</p>
                        )}
                    </div>

                    <button className="btn btn-primary btnN">
                        Change Name
                    </button>
                </form>
                <ChangeModuleName id={params.id} />
            </div>
            <div className="seeGroupItems">
                <h4>{group.name}</h4>
                {group.moduleGroups?.map((elm: any) => {
                    return (
                        <div className="seeGrpIt" key={elm.id}>
                            <h4>{elm.teacher?.user?.name}</h4>
                            <h5>{elm.module.name} </h5>
                            <p>{elm.module?.course?.name}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default SeeGroupById;
