import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { getUserByThokenThunk } from "../../features/user/userAPI";

function Home() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getUserByThokenThunk())
            .unwrap()
            .catch((e: any) => {
                navigate("/");
            });
    }, []);
    return (
        <div>
            <Outlet />
        </div>
    );
}

export default Home;
