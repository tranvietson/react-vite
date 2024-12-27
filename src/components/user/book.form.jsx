import { useState } from "react";
import { Input, notification, Modal, Button, InputNumber, Select } from "antd";
import { createBookAPI, createUserAPI, handleUploadFile } from "../../services/api.service";

const BookForm = (props) => {

    const { loadBooks } = props;
    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [thumbnail, setThumbnail] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState("");

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
        if (thumbnail) {
            const resCreateBook = await createBookAPI(
                thumbnail, mainText, author, price, quantity, category
            );

            if (resCreateBook.data) {
                notification.success({
                    message: "Create New Book",
                    description: "Tạo new book thành công"
                })
                resetAndCloseModal();
                setIsModalOpen(false);
                loadBooks();

            } else {
                notification.error({
                    message: "Error create book",
                    description: JSON.stringify(resCreateBook.message)
                });

            }
            console.log('>>>>>>>>>>> check response value after create:', resCreateBook);
        } else {
            notification.error({
                message: "Error upload Avatar",
                description: "Pls upload Avatar before creating books"
            });
        }



        //  const res = await createUserAPI(fullName, email, password, phone);
        // debugger
        // console.log('***********check res of createUserAPI data in user.form ********:', res.data);
        // if (res.data && res.data) {
        //     notification.success({
        //         message: "create user",
        //         description: "Tạo user thành công"
        //     })
        //     resetAndCloseModal();
        // } else {
        //     notification.error({
        //         message: "Error create user",
        //         description: JSON.stringify(res.message)
        //     })
        // }

    }


    const resetAndCloseModal = () => {
        setMainText("");
        setAuthor("");
        setPrice("");
        setQuantity("");
        setCategory("");
        setThumbnail("");
        setPreview("");

        // loadUser();
    }

    return (

        <div className="book-form" style={{ margin: "10px 0" }}>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Books Table</h3>
                <Button
                    onClick={() => setIsModalOpen(true)}
                    type="primary">Create Book</Button>
            </div>
            <Modal
                title="Create Book"
                open={isModalOpen}
                onOk={() => handleSubmitBtn()}
                onCancel={() => {
                    resetAndCloseModal();
                    setIsModalOpen(false);

                }
                }
                maskClosable={false}
                okText={"CREATE"}
            >
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
                        <InputNumber value={quantity} onChange={(quantity) => {
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
            </Modal>
        </div>
    )
}

export default BookForm;