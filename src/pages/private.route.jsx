import { useContext } from "react"
import { AuthContext } from "../components/context/auth.context"
import { Link, Navigate } from "react-router-dom";
import { Button, Result } from "antd";

const PrivateRoute = (props) => {
    const { user } = useContext(AuthContext);

    if (user && user.id) {
        return (
            <>
                {props.children}
            </>
        )
    }

    // return (
    //     <Navigate to="/login" replace />
    // )
    return (
        <Result
            status="404"
            title="Unauthorized!"
            subTitle={"Ban can dang nhap de truy cap nguon tai nguyen nay."}
            extra={
                <Button type="primary">
                    <Link to="/">
                        <span>Back to homepage</span>
                    </Link>
                </Button>
            }
        >

        </Result>
    )
}

export default PrivateRoute;
