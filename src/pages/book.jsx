import { Popconfirm, Table } from "antd";
import { useEffect, useState } from "react";
import { getBookAPI } from "../services/api.service";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import BookTable from "../components/user/book.table";

const BookPage = () => {

    const [dataBook, setDataBook] = useState([
        // {
        //     id: '1',
        //     title: 'Thép đã tôi thế đấy',
        //     price: 32.000,
        //     quantity: 100,
        //     author: 'Ostrovsky Nikolay Alekseevich',
        //     action: <span>
        //         <button>Edit</button>
        //         <button>Delete</button>
        //     </span>
        // },
    ]);

    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(3);
    const [total, setTotal] = useState(0);


    useEffect(() => {
        console.log(">>>>>>>>>> run useEffect 111 IN USER PAGE");
        loadBooks();
        console.log('>>>>>end run userEffect after loadUser()<<<<<<<<<<');
    }, [current, pageSize]);

    const loadBooks = async () => {
        const res = await getBookAPI(current, pageSize);
        console.log('>>>>>>>>>>>> check res in loadBooks function:', current, pageSize, res);
        if (res.data && res.data.result) {
            setDataBook(res.data.result);
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total);
        }
        console.log('>>>>>>>>>>>> check current , page after setState:', current, pageSize);
    }




    return (
        <>
            <div>Book Page</div>
            <BookTable
                dataBook={dataBook}
                current={current}
                setCurrent={setCurrent}
                pageSize={pageSize}
                setPageSize={setPageSize}
                total={total}
                setTotal={setTotal}
                loadBooks={loadBooks}
            />
        </>


    )
}

export default BookPage;