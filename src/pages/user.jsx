import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { useEffect, useState } from 'react';
import { fetchAllUserAPI } from '../services/api.service';

const UserPage = () => {


    const [dataUsers, setDataUsers] = useState([
        // { _id: "eric", fullName: 25, email: "hn" },
        // { _id: "hoidanit", fullName: 25, email: "hcm" },
    ])
    // empty array => run once
    useEffect(() => {
        console.log(">>>>>>>>>> run useEffect 111 IN USER PAGE");
        loadUser();
        console.log('>>>>>end run userEffect after loadUser()<<<<<<<<<<');
    }, []);


    const loadUser = async () => {
        const res = await fetchAllUserAPI();
        // console.log('>>>>>>>>> running loadUser in useEffect return data afterthat setState:', res);
        setDataUsers(res.data);
        console.log('>>>>>>>>>>>> after setDataUser state')
    }
    console.log(">>>>>>>>>> run before rendering 000 IN USER PAGE");
    return (
        <div style={{ padding: "20px" }}>
            <UserForm loadUser={loadUser} />
            <UserTable
                dataUsers={dataUsers}
                loadUser={loadUser}
            />
        </div>
    )
}

export default UserPage;