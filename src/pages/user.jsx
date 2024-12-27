import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { useEffect, useState } from 'react';
import { fetchAllUserAPI } from '../services/api.service';

const UserPage = () => {

    const [dataUsers, setDataUsers] = useState([
        // { _id: "eric", fullName: 25, email: "hn" },
        // { _id: "hoidanit", fullName: 25, email: "hcm" },
    ]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    // empty array => run once
    useEffect(() => {
        console.log(">>>>>>>>>> run useEffect 111 IN USER PAGE");
        loadUser();
        console.log('>>>>>end run userEffect after loadUser()<<<<<<<<<<');
    }, [current, pageSize]);


    const loadUser = async () => {
        const res = await fetchAllUserAPI(current, pageSize);
        // console.log('>>>>>>>>> running loadUser in useEffect return data afterthat setState:', res);
        if (res.data) {
            setDataUsers(res.data.result);
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total);
        }
        console.log('>>>>>>>>>>>> after setDataUser state')
    }

    console.log(">>>>>>>>>> run before rendering 000 IN USER PAGE");
    return (
        <div style={{ padding: "20px" }}>
            <UserForm loadUser={loadUser} />
            <UserTable
                dataUsers={dataUsers}
                loadUser={loadUser}
                current={current}
                pageSize={pageSize}
                total={total}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
            />
        </div>
    )
}

export default UserPage;