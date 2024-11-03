
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Space, Table, Tag, notification } from 'antd';
import UpdateUserModal from './update.user.modal';
import { useState } from 'react';
import ViewUserDetail from './view.user.detail';
import DeleteUser from './delete.user';
import { Button, message, Popconfirm } from 'antd';
import { deleteUserAPI } from '../../services/api.service';


const handleDeleteUser = (userId) => {
    console.log('bat event e:', e);
    message.success('Click on Yes', e.onClick());

};
const cancel = (e) => {
    console.log(e);
    message.error('Click on No');
};

const UserTable = (props) => {
    const { dataUsers, loadUser } = props;
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [dataUserDetail, setDataUserDetail] = useState(null)

    const handleDeleteUser = async (userId) => {
        // console.log('>>>>>>>>> click user id delete:', userId);
        const res = await deleteUserAPI(userId);
        if (res.data) {
            // console.log('>>>>>>>>>>> check res', res);
            notification.success({
                message: "Delete user",
                description: "Xoa user thanh cong"
            })
            await loadUser();
        } else {
            notification.error({
                message: "Error delete user",
                description: JSON.stringify(res.message)
            })
        }


    }



    const columns = [
        {
            title: 'id',
            dataIndex: '_id',
            render: (_, record) => (
                <a
                    href='#'
                    onClick={() => {
                        setIsOpenDrawer(true);
                        setDataUserDetail(record);
                    }}
                >{record._id}</a>
            ),
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',

        },
        {
            title: 'Email',
            dataIndex: 'email',

        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined
                        style={{ cursor: "pointer", color: "orange" }}
                        onClick={() => {
                            // console.log(">>>>>>> check each record after click it:", record);
                            setDataUpdate(record);
                            setIsModalUpdateOpen(true)
                        }}
                    />
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => { handleDeleteUser(record._id) }}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined
                            style={{ cursor: "pointer", color: "red" }}

                        />
                    </Popconfirm>

                </div>
            ),
        },
    ];




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
    // console.log(">>>>>>>> run render 222 in user.table", dataUsers);

    // console.log('>>>>>>>>>> check dataUPdate 222 value:', dataUpdate);
    return (
        <>
            <Table
                columns={columns}
                dataSource={dataUsers}
                rowKey={"_id"}
            />
            <UpdateUserModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser}
            />
            <ViewUserDetail
                isOpenDrawer={isOpenDrawer}
                setIsOpenDrawer={setIsOpenDrawer}
                dataUserDetail={dataUserDetail}
                setDataUserDetail={setDataUserDetail}
            />
        </>

    )

}

export default UserTable;