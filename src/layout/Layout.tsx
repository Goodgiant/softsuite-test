import { Outlet } from "react-router-dom";
import "./Layout.scss";
import { Breadcrumb, Layout as LayoutComponenet, Menu, MenuProps, theme } from 'antd';
import { AppstoreFilled, LaptopOutlined, NotificationOutlined, SettingFilled, SettingOutlined, UserOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import Sider from "antd/es/layout/Sider";
import companyLogo from "../assets/company-logo.svg";
import switcherIcon from "../assets/table_switch-icon.svg";
import houseIcon from "../assets/house-icon.svg";
import notifIcon from "../assets/notif-icon.svg";
import profilePhoto from "../assets/profile-photo.png";
import { ModuleSwitcher } from "../components/Sidebar/ModuleSwitcher";
import SearchBar from "../components/SearchBar/SearchBar";


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
                <div className="logo-div">
                    <img src={companyLogo} />
                </div>
                <section>
                    <ModuleSwitcher 
                        title="Change Organization"
                        value="PaperSoft Limited"
                        icon={<img src={houseIcon} alt="house icon" />}
                        alt
                    />
                    
                    <div className="header-content">
                        <SearchBar alt onSubmit={()=> {}} placeholder="Search for anything..."/>
                        
                        <div className="header-content-info">
                            <img className="notif-icon" src={notifIcon} alt="notification icon" />
                            
                            <div className="profile-info">
                                <div className="profile-photo-container">
                                    <img src={profilePhoto} alt="" />
                                </div>
                                <div className="profile-info-container">
                                    <h4>Victor Izu-Akiti</h4>
                                    <p>Payroll Manager</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </header>
            <section className="center">
                <aside className="left">
                <LayoutComponenet>
                    <Sider style={{ background: "transparent" }} width={"100%"}>
                        <ModuleSwitcher 
                            title="Switch Module"
                            value="Payroll Management"
                            icon={<img src={switcherIcon} alt="switcher icon" />}
                        />
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