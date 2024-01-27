import React, { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { userVerify } from "./../../features/user/userAPI";

function UserVerify() {
    const [data, setData] = useSearchParams();
    console.log(data.get("email"), data.get("emailToken"));
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(
            userVerify({
                email: data.get("email"),
                emailToken: data.get("emailToken"),
            })
        )
            .unwrap()
            .then((res) => {
                console.log(res);
                navigate("/");
            })
            .catch((e) => {
                console.warn(e);
            });
    }, [data]);

    return (
        <div>
            <p>Email or emailToken invalid</p>
            <Link to={"/"}>Log In</Link>
        </div>
    );
}

export default UserVerify;
