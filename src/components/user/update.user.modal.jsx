import { useEffect, useState } from "react";
import { Input, notification, Modal } from "antd";
import { updateUserAPI } from "../../services/api.service";

const UpdateUserModal = (props) => {
    console.log('>>>>>>>>>>>>>> run again after close Modal');
    const [test, setTest] = useState("test value");

    const [id, setId] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");

    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadUser } = props;
    // next dataUpdate != prev dataUpdate -----> run useEffect() function 
    useEffect(() => {
        // alert('>>>>>>>>> dataUPdate value changed!');
        console.log("*********check dataUpdate in useEffect in UpdateUserModal*********:", dataUpdate);
        if (dataUpdate) {
            setId(dataUpdate._id);
            setFullName(dataUpdate.fullName);
            setPhone(dataUpdate.phone);
        }
    }, [dataUpdate])
    const handleSubmitBtn = async () => {

        const res = await updateUserAPI(id, fullName, phone);
        // debugger
        console.log('>>>>>>>>> check res data:', res.data);
        if (res.data && res.data) {
            notification.success({
                message: "Update user",
                description: "Cập nhật user thành công"
            })
            resetAndCloseModal();
            await loadUser();
        } else {
            notification.error({
                message: "Error create user",
                description: JSON.stringify(res.message)
            })
        }

    }

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false);
        setFullName("");
        setPhone("");
        setId("");
        setDataUpdate(null);
    }
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>> check test value:', test);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>> check test id:', id);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>> check fulname:', fullName);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>> check phone:', phone);
    console.log('>>>>>>>>>> %%%%%%%%%%% check dataUpdate in props:', dataUpdate);
    console.log('######### check initial state in UpdateUserModal:', id, fullName, phone);
    return (
        <Modal
            title="Update User"
            open={isModalUpdateOpen}
            onOk={() => handleSubmitBtn()}
            onCancel={() => setIsModalUpdateOpen(false)}
            maskClosable={false}
            okText={"SAVE"}
        >
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <div>
                    <span>Id</span>
                    <Input
                        value={id}
                        disabled
                    //  onChange={(event) => { setEmail(event.target.value) }}
                    />
                </div>

                <div>
                    <span>Full Name</span>
                    <Input
                        value={fullName}
                        onChange={(event) => { setFullName(event.target.value) }}
                    />
                </div>

                <div>
                    <span>Phone number</span>
                    <Input
                        value={phone}
                        onChange={(event) => { setPhone(event.target.value) }}
                    />
                </div>
            </div>
        </Modal>

    )
}

export default UpdateUserModal;