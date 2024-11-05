import { Button, Drawer, notification } from "antd";
import { useState } from "react";
import { handleUploadFile, updateUserAvatarAPI } from "../../services/api.service";

const ViewUserDetail = (props) => {

    const {
        isOpenDrawer,
        setIsOpenDrawer,
        dataUserDetail,
        setDataUserDetail,
        loadUser
    } = props;

    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)
    // console.log('>>>>>>>>>>>>> check data user detail', dataUserDetail);
    const handleOnchangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return
        }
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file))
        }

    }

    const handleUpdateUserAvatar = async () => {
        // step 1: upload file
        // console.log('>>>>>>>>> check file: ', selectedFile);
        const resUpload = await handleUploadFile(selectedFile, "avatar");
        // console.log('>>>>>> Check resUpload:', resUpload);
        // step 2: update user
        if (resUpload.data) {
            // success
            const newAvatar = resUpload.data.fileUploaded;
            const resUpdateAvatar = await updateUserAvatarAPI(
                newAvatar, dataUserDetail._id, dataUserDetail.fullName, dataUserDetail.phone
            );
            if (resUpdateAvatar.data) {
                setIsOpenDrawer(false);
                setSelectedFile(null);
                setPreview(null);
                loadUser();
                notification.success({
                    message: "Update user avatar",
                    description: " Cập nhật avatar thành công"
                })
            } else {
                notification.error({
                    message: "Error update file",
                    description: JSON.stringify(resUpdateAvatar.data)
                })
            }
        } else {
            // failed
            notification.error({
                message: "Error upload file",
                description: JSON.stringify(resUpload.message)
            })
        }
    }

    return (
        <>
            <Drawer
                width={"30vw"}
                title="Basic Drawer"
                onClose={() => {
                    setIsOpenDrawer(false);
                    setDataUserDetail(null)
                }
                }
                open={isOpenDrawer}
            >
                {dataUserDetail ?
                    <>
                        <p>{dataUserDetail._id}</p>
                        <br />
                        <p>{dataUserDetail.fullName}</p>
                        <br />
                        <p>{dataUserDetail.email}</p>
                        <br />
                        <p>{dataUserDetail.phone}</p>
                        <br />
                        <p>Avatar:</p>
                        <div style={{
                            marginTop: "10px",
                            height: "100px",
                            width: "150px",
                            border: "1px solid #ccc"
                        }}>
                            <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataUserDetail.avatar}`} />
                        </div>
                        <div>
                            <label htmlFor="btnUpload"
                                style={{
                                    display: "block",
                                    width: "fit-content",
                                    marginTop: "15px",
                                    padding: "5px 10px",
                                    background: "orange",
                                    borderRadius: "5px",
                                    cursor: "pointer"
                                }}
                            >Upload avatar</label>
                            <input
                                type='file' hidden id='btnUpload'
                                // onChange={handleOnChangeFile}
                                onChange={(event) => handleOnchangeFile(event)}
                            />
                        </div>

                        {preview &&
                            <div style={{
                                marginTop: "10px",
                                height: "100px",
                                width: "150px",
                                border: "1px solid #ccc",
                                marginBottom: "15px"
                            }}>
                                <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                    src={preview} />
                            </div>
                        }
                        <Button type="primary"
                            onClick={() => handleUpdateUserAvatar()}
                        >Save</Button>
                    </>
                    :
                    <div>have not data</div>
                }
            </Drawer>
        </>

    )
}

export default ViewUserDetail;