import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import {
    changeModuleCourse,
    getModule,
} from "../../features/Modules/modulesAPI";

export function ChangeCourse({ id }: any) {
    const { arrCourse } = useAppSelector((st: RootState) => st.course);
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const changeCourse = (data: any) => {
        dispatch(changeModuleCourse({ value: data, id }))
            .unwrap()
            .then(() => dispatch(getModule()));
        reset();
    };

    return (
        <div>
            <form onSubmit={handleSubmit(changeCourse)}>
                <select
                    className="form-control"
                    style={{ width: "200px" }}
                    {...register("courseId")}
                >
                    <option hidden value={""}>
                        Select Course
                    </option>
                    {arrCourse?.map((elm: any) => {
                        return (
                            <option key={elm.id} value={elm.id}>
                                {elm.name}
                            </option>
                        );
                    })}
                </select>
                <button
                    className="btn btn-outline-success"
                    style={{ width: "200px" }}
                >
                    Change Course
                </button>
            </form>
        </div>
    );
}
