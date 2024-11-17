import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
//import './header.css';

import { BookOutlined, HomeOutlined, UsergroupAddOutlined, SettingOutlined, AliwangwangOutlined, LoginOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { AuthContext } from '../context/auth.context';


const Header = () => {
    const [current, setCurrent] = useState('mail');

    const { user } = useContext(AuthContext);

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
        ...(!user.id ? [
            {
                label: <Link to={"/login"}>Đăng nhập</Link >,
                key: 'login',
                icon: <LoginOutlined />,

            }] : []),

        ...(user.id ? [
            {
                label: `Welcome ${user.fullName}`,
                key: 'setting',
                icon: <AliwangwangOutlined />,
                children: [
                    {
                        label: "Đăng xuất",
                        key: 'logout',
                    }
                ]
            }] : []),
    ];


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