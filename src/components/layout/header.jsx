import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
//import './header.css';

import { BookOutlined, HomeOutlined, UsergroupAddOutlined, SettingOutlined, AliwangwangOutlined, LoginOutlined } from '@ant-design/icons';
import { Menu, message } from 'antd';
import { AuthContext } from '../context/auth.context';
import { logoutAPI } from '../../services/api.service';


const Header = () => {
    const [current, setCurrent] = useState('mail');

    const { user, setUser } = useContext(AuthContext);


    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    const handleLogout = async () => {
        // alert('alert me!');
        const res = await logoutAPI();
        if (res.data) {
            localStorage.removeItem("access_token");
            message.success('Logout successful');
            setUser(
                {
                    email: "",
                    phone: "",
                    fullName: "",
                    role: "",
                    avatar: "",
                    id: "",
                }
            )
            // redirec to Homepage
            useNavigate("/");
        }
    }

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
                        label: <span onClick={() => handleLogout()}>Đăng xuất</span>,
                        key: 'logout',
                    }
                ]
            }] : []),
    ];


    console.log(">>>>> check data Authcontext:", user);


    return (
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    )
}

export default Header;