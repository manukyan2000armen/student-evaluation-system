import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { updateGroupModule } from "../../features/Group/groupAPI";
import { getModule } from "../../features/Modules/modulesAPI";
import { ChangeGroupTeacher } from "../ChangeGroupTeacher";

export function ChangeModuleName({ id }: any) {
    const { arrModule } = useAppSelector((st: RootState) => st.module);
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const changeGroupModule = (data: any) => {
        dispatch(updateGroupModule({ value: data, id }))
            .unwrap()
            .then(() => dispatch(getModule()));
        reset();
    };

    return (
        <div>
            <form onSubmit={handleSubmit(changeGroupModule)}>
                <select
                    className="form-control"
                    style={{ width: "400px" }}
                    {...register("activeModuleId")}
                >
                    <option hidden value={""}>
                        Select Module
                    </option>
                    {arrModule?.map((elm: any) => {
                        return (
                            <option key={elm.id} value={elm.id}>
                                {elm.name}
                            </option>
                        );
                    })}
                </select>
                <button className="btn btn-primary" style={{ width: "400px" }}>
                    Change Module
                </button>
            </form>
            <ChangeGroupTeacher id={id} />
        </div>
    );
}
