import { Button, Drawer } from "antd";

const ViewUserDetail = (props) => {

    const { isOpenDrawer, setIsOpenDrawer, dataUserDetail, setDataUserDetail } = props;
    console.log('>>>>>>>>>>>>> check data user detail', dataUserDetail);
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
                        <div>
                            <img height={100} width={150}
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
                            <input type='file' hidden id='btnUpload' />
                        </div>
                        <Button type='primary'>Upload Avatar</Button>
                    </>
                    :
                    <div>have not data</div>
                }
            </Drawer>
        </>

    )
}

export default ViewUserDetail;