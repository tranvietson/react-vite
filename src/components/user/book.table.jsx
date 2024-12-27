import { Popconfirm, Table } from "antd";
import { getBookAPI } from "../../services/api.service";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import ViewBookDetail from "./view.book.detail";
import BookForm from "./book.form";
import UpdateBookModal from "./update.book.modal";

const BookTable = (props) => {
    const { dataBook, current, setCurrent, pageSize, setPageSize, total, loadBooks } = props;
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [dataBookDetail, setDataBookDetail] = useState(null);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataBookUpdate, setDataBookUpdate] = useState(null);

    const columns = [
        {
            title: 'STT',
            dataIndex: '_id',
            render: (_, record, index) => (
                <a
                >{(index + 1) + (current - 1) * pageSize}</a>
            ),
        },
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => (

                <a
                    href='#'
                    onClick={() => {
                        //console.log('>>>>>>>>>>> check record after clicking id:', record);
                        setIsOpenDrawer(true);
                        setDataBookDetail(record);
                        // alert(`##### check record #####, ${record._id}`);
                    }}
                >{record._id}</a>
            ),
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'mainText',
            key: 'mainText',
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            render: (text, record, index, action) => {
                if (text)
                    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(text);
            }
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => (
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined
                        style={{ cursor: "pointer", color: "orange" }}
                        onClick={() => {
                            console.log(">>>>>>> check each record after click it:", record);
                            setDataBookUpdate(record);
                            setIsModalUpdateOpen(true)
                        }}
                    />
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => { handleDeleteUser(record._id) }}
                        // onCancel={cancel}
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



    const onChange = (pagination, filters, sorter, extra) => {
        console.log('>>>>>>>>> check pagination after running onChange:', pagination);
        // setCurrent, setPageSize for user component if
        // change current
        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(+pagination.current)
            }
        }
        // if change pageSize
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize)
            }
        }
    };

    return (
        <>
            <div>Book Page</div>
            <BookForm loadBooks={loadBooks} />
            <Table

                dataSource={dataBook}
                columns={columns}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }}
                onChange={onChange}
            />

            <UpdateBookModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataBookUpdate={dataBookUpdate}
            />

            <ViewBookDetail
                isOpenDrawer={isOpenDrawer}
                setIsOpenDrawer={setIsOpenDrawer}
                dataBookDetail={dataBookDetail}
            // setDataBookDetail={setDataBookDetail}
            // loadUser={loadUser}
            />
        </>
    )
}

export default BookTable;