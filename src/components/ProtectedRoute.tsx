import {FC} from "react";

import {useAuth} from "../hooks/useAuth";

interface Props {
    children: JSX.Element;
}
const ProtectedRoute:FC<Props> = ({ children }) => {
    const isAuth = useAuth();
    return (
        <>
            {isAuth ? children :
                <div className={"mt-20 flex flex-col items-center justify-center gap-4"}>
                    <h1>Log in to view this page</h1>
                    <a href="/auth">
                        <button className={"bg-blue-600 px-4 py-2 rounded-lg"}>Log in</button>
                    </a>
                </div>}
        </>
    );
};

export default ProtectedRoute;