import React from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { createHomework } from "../../../features/Homework/homeworkAPI";
import { Homework } from "../../../features/type";
import "./style.scss";

function AddHomework() {
  const { arrHomework } = useAppSelector((st: RootState) => st.homework);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Homework>();

  const addHomework = (data: any) => {
    dispatch(createHomework(data));
  };
  return (
    <div className="addHomeworkDiv">
      <div className="addHomeworkItemDiv">
        <form onSubmit={handleSubmit(addHomework)}>
          <div>
            <input
              placeholder="Title..."
              className="form-control"
              type="text"
              {...register("title", {
                required: "Fill in the field",
                pattern: {
                  value: /[a-zA-Z0-9-]/,
                  message: "Fill in the letters",
                },
              })}
            />
            {errors.title && (
              <p className="text-danger">{errors.title.message}</p>
            )}
          </div>

          <div>
            <input
              placeholder="Description..."
              className="form-control"
              type="text"
              {...register("description", {
                required: "Fill in the field",
                pattern: {
                  value: /[a-zA-Z0-9-]/,
                  message: "Fill in the letters",
                },
              })}
            />
            {errors.description && (
              <p className="text-danger">{errors.description.message}</p>
            )}
          </div>
          <button>Save</button>
        </form>
      </div>
    </div>
  );
}

export default AddHomework;
