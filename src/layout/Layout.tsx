import { Outlet } from "react-router-dom";
import "./Layout.scss";
import { Breadcrumb, Layout as LayoutComponenet, Menu, MenuProps, theme } from 'antd';
import { AppstoreFilled, LaptopOutlined, NotificationOutlined, SettingFilled, SettingOutlined, UserOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import Sider from "antd/es/layout/Sider";
import companyLogo from "../assets/company-logo.svg";
import switcherIcon from "../assets/table_switch-icon.svg";
import { ModuleSwitcher } from "../components/Sidebar/ModuleSwitcher";


type MenuItem = Required<MenuProps>['items'][number];
function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Dashboard', 'sub2', <AppstoreFilled />),
    getItem('Settings', 'sub4', <SettingFilled />, [
      getItem('Elements', '9'),
    ]),
];// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];


const Layout = () => {
    const [openKeys, setOpenKeys] = useState(['sub4']);

    // const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    //     const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    //     if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
    //     setOpenKeys(keys);
    //     } else {
    //     setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    //     }
    // };

    return (
        <div id="layout-container">
            <header className="top">
                <img src={companyLogo} />
            </header>
            <section className="center">
                <aside className="left">
                <LayoutComponenet>
                    <Sider style={{ background: "transparent" }} width={"100%"}>
                        <ModuleSwitcher />
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['sub4']}
                            defaultOpenKeys={openKeys}
                            style={{ height: '100%' }}
                            items={items}
                            openKeys={openKeys}
                            onOpenChange={(key)=> setOpenKeys([...key])}
                        />
                    </Sider>
                </LayoutComponenet>
                </aside>
                <div className="right">
                    <Outlet />
                </div>
            </section>
            <footer className="bottom">
                <p>© 2022 SoftSuite. All rights reserved.</p>
                <p>support@softsuite.com</p>
            </footer>
        </div>
    )
}

export default Layout;