import { fetchAllUserAPI } from '../../services/api.service';
import { Space, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';

const UserTable = () => {

    const [dataUsers, setDataUsers] = useState([
        // { _id: "eric", fullName: 25, email: "hn" },
        // { _id: "hoidanit", fullName: 25, email: "hcm" },
    ])

    useEffect(() => {
        console.log(">>>>>>>>>> run useEffect 111");
        loadUser();
    }, []);

    const columns = [
        {
            title: 'id',
            dataIndex: '_id',
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',

        },
        {
            title: 'Email',
            dataIndex: 'email',

        }
    ];

    const loadUser = async () => {
        const res = await fetchAllUserAPI();
        setDataUsers(res.data);
    }

    // const data = [
    //     {
    //         key: '1',
    //         name: 'John Brown',
    //         age: 32,
    //         address: 'New York No. 1 Lake Park',
    //         tags: ['nice', 'developer'],
    //     },
    //     {
    //         key: '2',
    //         name: 'Jim Green',
    //         age: 42,
    //         address: 'London No. 1 Lake Park',
    //         tags: ['loser'],
    //     },
    //     {
    //         key: '3',
    //         name: 'Joe Black',
    //         age: 32,
    //         address: 'Sydney No. 1 Lake Park',
    //         tags: ['cool', 'teacher'],
    //     },
    // ];
    console.log(">>>>>>>> run render 000 ");
    return (
        <Table
            columns={columns}
            dataSource={dataUsers}
            rowKey={"_id"}
        />
    )

}

export default UserTable;