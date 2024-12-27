import { useEffect, useState } from "react";
import { Input, notification, Modal, InputNumber, Select, Button } from "antd";
import { updateUserAPI } from "../../services/api.service";

const UpdateBookModal = (props) => {
    console.log('>>>>>>>>>>>>>> run again after close Modal');
    // const [test, setTest] = useState("test value");

    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [thumbnail, setThumbnail] = useState("");

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const options = [
        { value: 'Arts', label: 'Arts-label' },
        { value: 'Business', label: 'Business' },
        { value: 'Comics', label: 'Comics' },
        { value: 'Cooking', label: 'Cooking' },
        { value: 'Entertainment', label: 'Entertainment' },
        { value: 'History', label: 'History' },
        { value: 'Music', label: 'Music' },
        { value: 'Sports', label: 'Sports' },
        { value: 'Teen', label: 'Teen' },
        { value: 'Travel', label: 'Travel' },
    ];

    const { isModalUpdateOpen, setIsModalUpdateOpen, dataBookUpdate, loadUser } = props;
    // next dataUpdate != prev dataUpdate -----> run useEffect() function 
    useEffect(() => {
        // alert('>>>>>>>>> dataUPdate value changed!');
        console.log("*********check dataUpdate in useEffect in UpdateBookModal*********:", dataBookUpdate);
        if (dataBookUpdate) {
            setMainText(dataBookUpdate.mainText);
            setAuthor(dataBookUpdate.author);
            setPrice(dataBookUpdate.price);
            setQuantity(dataBookUpdate.quantity);
            setCategory(dataBookUpdate.category);
            setThumbnail(dataBookUpdate.thumbnail);
        }
    }, [dataBookUpdate])

    const handleChangeCategory = (value) => {
        setCategory(value);
    }

    const handleOnchangeFile = (event) => {
        console.log('>>>>>>> check event:', event.target.files[0]);
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

        console.log('>>>>>>>> check selected file:', selectedFile);

    }

    const handleUploadAvatar = async () => {
        const resUpload = await handleUploadFile(selectedFile, "book");
        if (resUpload.data && resUpload.data.fileUploaded) {
            setThumbnail(resUpload.data.fileUploaded);
            notification.success({
                message: "Upload avatar ",
                description: "Upload avatar thanh cong"
            })
        } else {
            notification.error({
                message: "Error upload avatar",
                description: "Upload avatar that bai"
            });
        }

    }

    const handleSubmitBtn = async () => {

        // const res = await updateUserAPI(id, fullName, phone);

        console.log('>>>>>>>>>>>> check state in update book modal:', this.state);

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
        setPreview(null);
        setDataUpdate(null);
    }

    console.log('>>>>>>>>>> %%%%%%%%%%% check dataUpdate in props:', dataBookUpdate);
    return (

        <Modal
            title="Update Book"
            open={isModalUpdateOpen}
            onOk={() => handleSubmitBtn()}
            onCancel={() => {
                resetAndCloseModal();
                setIsModalUpdateOpen(false);
            }
            }
            maskClosable={false}
            okText={"Update"}
        >
            {
                dataBookUpdate ?
                    <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                        <div>
                            <span>Tiêu đề</span>
                            <Input
                                value={mainText}
                                onChange={(event) => { setMainText(event.target.value) }}
                            />
                        </div>
                        <div>
                            <span>Tác giả</span>
                            <Input
                                value={author}
                                onChange={(event) => { setAuthor(event.target.value) }}
                            />
                        </div>
                        <div>
                            <span>Giá tiền</span>
                            <br />
                            <InputNumber value={price}
                                onChange={(price) => setPrice(price)}
                            />
                        </div>

                        <div>
                            <span>Số lượng</span>
                            <br />
                            <InputNumber value={quantity}
                                onChange={(quantity) => {
                                    setQuantity(quantity);
                                }} />
                        </div>

                        <div>
                            <span>Thể loại</span>
                            <br />
                            <Select
                                //placeholder="Select a category"
                                //defaultValue="Arts"
                                value={category}
                                style={{ width: 120 }}
                                onChange={handleChangeCategory}
                                options={options}
                            />
                        </div>

                        <p>Avatar:</p>
                        <div style={{
                            marginTop: "5px",
                            height: "100px",
                            width: "150px",
                            border: "1px solid #ccc"
                        }}>
                            <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${thumbnail}`} />
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
                                <Button type="primary"
                                    onClick={() => handleUploadAvatar()}
                                >Save</Button>
                            </div>
                        }

                    </div>
                    :
                    <div>
                        khong co du lieu
                    </div>
            }

        </Modal>

    )
}

export default UpdateBookModal;