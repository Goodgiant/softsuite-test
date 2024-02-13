import { Outlet } from "react-router-dom";
import "./Layout.scss";
import { Breadcrumb, Layout as LayoutComponenet, Menu, MenuProps, theme } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import Sider from "antd/es/layout/Sider";
import companyLogo from "../assets/company-logo.svg";

const Layout = () => {

    const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
        (icon, index) => {
          const key = String(index + 1);
      
          return {
            key: `sub${key}`,
            icon: React.createElement(icon),
            label: `subnav ${key}`,
      
            children: new Array(4).fill(null).map((_, j) => {
              const subKey = index * 4 + j + 1;
              return {
                key: subKey,
                label: `option${subKey}`,
              };
            }),
          };
        },
      );

    return (
        <div id="layout-container">
            <header className="top">
                <img src={companyLogo} />
            </header>
            <section className="center">
                <aside className="left">
                <LayoutComponenet>
                    <Sider style={{ background: "transparent" }} width={"100%"}>
                        <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%' }}
                        items={items2}
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