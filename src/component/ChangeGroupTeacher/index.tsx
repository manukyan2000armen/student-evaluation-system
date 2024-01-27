import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { updateGroupTeacher } from "../../features/Group/groupAPI";
import { getModule } from "../../features/Modules/modulesAPI";
import { getUserThunk } from "../../features/user/userAPI";

export function ChangeGroupTeacher({ id }: any) {
    const { arrUser } = useAppSelector((st: RootState) => st.user);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUserThunk());
    }, []);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const changeGroupTeacher = (data: any) => {
        dispatch(updateGroupTeacher({ value: data, id }))
            .unwrap()
            .then(() => dispatch(getModule()));
        reset();
    };

    return (
        <div>
            <form onSubmit={handleSubmit(changeGroupTeacher)}>
                <select
                    className="form-control"
                    style={{ width: "400px" }}
                    {...register("teacherId")}
                >
                    <option hidden value={""}>
                        Select Teacher
                    </option>
                    {arrUser?.map((elm: any) => {
                        return (
                            <option key={elm.id} value={elm.id}>
                                {elm.name} {elm.surname}
                            </option>
                        );
                    })}
                </select>
                <button className="btn btn-primary" style={{ width: "400px" }}>
                    Change Teacher
                </button>
            </form>
        </div>
    );
}