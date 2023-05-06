import { UserOutlined, BookOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../../assets/css/fonts.scss";
import Image from "../../assets/img/image";

const MenuItems = ({ companyData }) => {
    const [openKeys, setOpenKeys] = useState([]);

    const onOpenChange = (openKeysList) => {
        setOpenKeys(openKeysList);
    };

    return (
        <Menu openKeys={openKeys} mode="inline" theme="dark" onOpenChange={onOpenChange} className="menu">
            <img src={Image.mainLogo} className="main-logo"/>
            <Menu.Item key="1" icon={<BookOutlined />} className="menu-li">
                <Link className="text-decoration-none " to={`/tasks`}>
                    <span>Tasks</span>
                </Link>
            </Menu.Item>
            {companyData?.role?.admin && (
                <Menu.Item key="2" icon={<UsergroupAddOutlined />} className="menu-li">
                    <Link className="text-decoration-none " to={`/users`}>
                        <span>Users</span>
                    </Link>
                </Menu.Item>
            )}
            <Menu.Item key="3" icon={<UserOutlined />} className="menu-li">
                <Link className="text-decoration-none " to={`/usersettings`}>
                    <span>User Settings</span>
                </Link>
            </Menu.Item>
        </Menu>
    );
};

const mapStateToProps = (state) => ({ companyData: state.user.companyData });

export default connect(mapStateToProps)(MenuItems);
