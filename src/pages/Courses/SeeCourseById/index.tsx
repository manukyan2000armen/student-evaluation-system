import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { isArray } from "util";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import Menu from "../../../component/Menu";
import { seeCourseById } from "../../../features/Course/courseAPI";
import { getModuleById } from "../../../features/Modules/modulesAPI";
import ChangeCourseData from "../ChangeCourseModal";
import "./style.scss";

function SeeCourseById() {
    const { course } = useAppSelector((st: RootState) => st.course);
    const [openModalCourse, setOpenModalCourse] = useState(false);

    const openModal = () => {
        setOpenModalCourse(true);
    };

    const closeModal = () => {
        setOpenModalCourse(false);
    };

    console.log(course, "course=>");

    const dispatch = useAppDispatch();
    const params = useParams();
    useEffect(() => {
        if (params.id) {
            dispatch(seeCourseById(+params.id));
        }
    }, [params.id]);
    return (
        <div className="myCourse">
            <div className="courseItem">
                <div>
                    <button
                        className="btn btn-outline-primary "
                        onClick={openModal}
                    >
                        Change Course Data
                    </button>
                </div>
                <div className="courseItemsModule">
                    <h4>{course.name}</h4>
                    {course.modules?.map((elm: any) => {
                        return (
                            <ul key={elm.id}>
                                <li>{elm.name}</li>
                            </ul>
                        );
                    })}
                </div>
            </div>
            {openModalCourse && (
                <ChangeCourseData id={params.id} onClose={closeModal} />
            )}
        </div>
    );
}

export default SeeCourseById;
