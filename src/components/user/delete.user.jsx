import React from 'react';
import { Button, message, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
const confirm = (e) => {
    console.log(e);
    message.success('Click on Yes');
};
const cancel = (e) => {
    console.log(e);
    message.error('Click on No');
};
const DeleteUser = (props) => {
    const { record } = props;
    console.log('************ userId is delete *********', record);
    return (
        <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
        >
            <Button danger> <DeleteOutlined
                style={{ cursor: "pointer", color: "red" }}
                onClick={() => (record._id)}
            />Delete</Button>
        </Popconfirm>
    )
}

export default DeleteUser;