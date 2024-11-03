import { Drawer } from "antd";

const ViewUserDetail = (props) => {

    const { isOpenDrawer, setIsOpenDrawer, dataUserDetail, setDataUserDetail } = props;
    console.log('>>>>>>>>>>>>> check data user detail', dataUserDetail);
    return (
        <>
            <Drawer
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
                    </>
                    :
                    <div>have not data</div>
                }
            </Drawer>
        </>

    )
}

export default ViewUserDetail;