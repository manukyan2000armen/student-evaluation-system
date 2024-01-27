import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import {
    createCourse,
    deleteCourse,
    getCourse,
} from "../../../features/Course/courseAPI";
import { Courses } from "../../../features/type";
import Swal from "sweetalert2";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Course() {
    const { arrCourse } = useAppSelector((st: RootState) => st.course);
    const { user } = useAppSelector((st: RootState) => st.user);
    // console.log(arrCourse, "arrCourse => ");
    console.log(user);

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
                        <div key={elm.id} className="courseItems">
                            <h4>{elm.name}</h4>
                            <div className="forDeleteDiv">
                                <button
                                    onClick={() =>
                                        dispatch(deleteCourse(elm.id))
                                            .unwrap()
                                            .then(() => dispatch(getCourse()))
                                    }
                                >
                                    ✖
                                </button>
                            </div>
                            <div>
                                <button className="forSeePage">
                                    <Link
                                        to={
                                            user.role == 0
                                                ? "/admin/see-course/" + elm.id
                                                : user.role == 1
                                                ? "/teacher/see-course/" +
                                                  elm.id
                                                : "/student/see-course/" +
                                                  elm.id
                                        }
                                    >
                                        <FontAwesomeIcon icon={faArrowRight} />
                                    </Link>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Course;
