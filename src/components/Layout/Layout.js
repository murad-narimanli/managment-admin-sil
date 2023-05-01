import { Layout, theme } from "antd";
import React, { useState } from "react";
import MenuItems from "../elements/MenuItems";
import HeaderMain from "./Header";
import "../../assets/css/main.scss";
const { Sider, Content } = Layout;

const MainLayout = (props) => {
    const [collapsed, setCollapsed] = useState(false);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout className="main-layout">
            <Sider trigger={null} collapsible collapsed={collapsed} className="menu-wrapper">
                <MenuItems />
            </Sider>
            <Layout className="site-layout">
                <HeaderMain collapsed={collapsed} colorBgContainer={colorBgContainer} setCollapsed={setCollapsed} />

                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: "80vh",
                        background: colorBgContainer,
                    }}
                >
                    {props.children}
                </Content>
            </Layout>
        </Layout>
    );
};
export default MainLayout;
