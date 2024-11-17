import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
//import './header.css';

import { BookOutlined, HomeOutlined, UsergroupAddOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { AuthContext } from '../context/auth.context';
const items = [
    {
        label: <Link to={"/"}>Home</Link >,
        key: 'home',
        icon: <HomeOutlined />,
    },
    {
        label: <Link to={"/users"} >Users</ Link >,
        key: 'users',
        icon: <UsergroupAddOutlined />,

    },
    {
        label: <Link to={"/books"}>Books</Link >,
        key: 'books',
        icon: <BookOutlined />,

    },
    {
        label: 'Cài đặt',
        key: 'setting',
        icon: <SettingOutlined />,
        children: [
            {
                label: <Link to={"/login"}>Đăng nhập</Link>,
                key: 'Login',
            },
            {
                label: "Đăng xuất",
                key: 'logout',
            }
        ]
    }

];

const Header = () => {
    const [current, setCurrent] = useState('mail');

    const { user } = useContext(AuthContext);
    console.log(">>>>> check data Authcontext:", user);

    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    )
}

export default Header;