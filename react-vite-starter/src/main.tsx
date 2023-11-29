import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import UsersPage from './screens/users.page.tsx';

import { UserOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import './App.scss'


const items: MenuProps['items'] = [
  {
    label: <Link to={'/'}> Home</Link>,
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: <Link to='/users'> Manage Users</Link>,
    key: 'users',
    icon: <UserOutlined />,

  },

];


const Header = () => {
  const [current, setCurrent] = useState('home');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};


const LayoutAdmin = () => {

  useEffect(() => { localStorage.setItem("access_token", "hoidanit") }, [])
  return (<div>
    <Header />
    {/* layout admin */}
    <Outlet />
  </div>)
}


const router = createBrowserRouter([
  {
    path: "/",
    // element: <App />,
    element: <LayoutAdmin />,
    children: [
      { index: true, element: <App /> },
      {
        path: "users",
        element: <UsersPage />,
      },
    ]
  },

  {
    path: "/tracks",
    element: <div>manage users</div>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
