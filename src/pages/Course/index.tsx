import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import {
    createCourse,
    deleteCourse,
    getCourse,
} from "../../features/Course/courseAPI";
import { Courses } from "../../features/type";
import Swal from "sweetalert2";
import "./style.scss";

function Course() {
    const { arrCourse } = useAppSelector((st: RootState) => st.course);
    // console.log(arrCourse, "arrCourse => ");

    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Courses>();

    const addCourse = (data: Courses) => {
        dispatch(createCourse(data))
            .unwrap()
            .then(() => dispatch(getCourse()));

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
        });
        reset();
    };

    useEffect(() => {
        dispatch(getCourse());
    }, []);
    return (
        <div className="courseDiv">
            <div className="addCourse">
                <form onSubmit={handleSubmit(addCourse)}>
                    <div>
                        <input
                            placeholder="Course name:"
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
                    <div>
                        <button>Save</button>
                    </div>
                </form>
            </div>
            <div className="forCourses">
                {arrCourse?.map((elm: any) => {
                    return (
                        <>
                            <div key={elm.id} className="courseItems">
                                <h4>{elm.name}</h4>
                                <div className="forDeleteDiv" key={elm.id}>
                                    <button
                                        onClick={() =>
                                            dispatch(deleteCourse(elm.id))
                                                .unwrap()
                                                .then(() =>
                                                    dispatch(getCourse())
                                                )
                                        }
                                    >
                                        ✖
                                    </button>
                                </div>
                            </div>
                        </>
                    );
                })}
            </div>
        </div>
    );
}

export default Course;
