import { Button, Drawer, notification } from "antd";
import { useState } from "react";
import { createBookAPI, handleUploadFile, updateUserAvatarAPI } from "../../services/api.service";

const ViewBookDetail = (props) => {

    const {
        isOpenDrawer,
        setIsOpenDrawer,
        dataBookDetail,
        setDataBookDetail,
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

    const handleUpdateBook = async () => {
        // step 1: upload file
        // console.log('>>>>>>>>> check file: ', selectedFile);
        const resUpload = await handleUploadFile(selectedFile, "book");
        console.log('>>>>>> Check resUpload:', resUpload);
        // step 2: update user
        // if (resUpload.data) {
        //     // success
        //     const newAvatar = resUpload.data.fileUploaded;
        //     const resUpdateAvatar = await createBookAPI(
        //         thumbnail, mainText, author, price, quantity, category
        //     );
        //     if (resUpdateAvatar.data) {
        //         setIsOpenDrawer(false);
        //         setSelectedFile(null);
        //         setPreview(null);
        //         loadUser();
        //         notification.success({
        //             message: "Update user avatar",
        //             description: " Cập nhật avatar thành công"
        //         })
        //     } else {
        //         notification.error({
        //             message: "Error update file",
        //             description: JSON.stringify(resUpdateAvatar.data)
        //         })
        //     }
        // } else {
        //     // failed
        //     notification.error({
        //         message: "Error upload file",
        //         description: JSON.stringify(resUpload.message)
        //     })
        // }
    }

    return (
        <>
            <Drawer
                width={"30vw"}
                title="Chi tiết sách"
                onClose={() => {
                    setIsOpenDrawer(false);
                    setDataUserDetail(null)
                }
                }
                open={isOpenDrawer}
            >
                {dataBookDetail ?
                    <>
                        <p>Id: {dataBookDetail._id}</p>
                        <br />
                        <p>Tiêu đề: {dataBookDetail.mainText}</p>
                        <br />
                        <p>Tác giả: {dataBookDetail.author}</p>
                        <br />
                        <p>Thể loại: {dataBookDetail.category}</p>
                        <br />
                        <p>Giá tiền: {
                            new Intl.NumberFormat('vi-VN',
                                { style: 'currency', currency: 'VND' }).format(dataBookDetail.price)
                        }</p>
                        <br />
                        <p>Avatar:</p>
                        <div style={{
                            marginTop: "10px",
                            height: "100px",
                            width: "150px",
                            border: "1px solid #ccc"
                        }}>
                            <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataBookDetail.thumbnail}`} />
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
                            onClick={() => handleUpdateBook()}
                        >Save</Button>
                    </>
                    :
                    <div>have not data</div>
                }
            </Drawer>
        </>

    )
}

export default ViewBookDetail;