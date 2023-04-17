import { UploadOutlined, FundOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const { SubMenu } = Menu;

const MenuItems = ({ companyData }) => {
    const [openKeys, setOpenKeys] = useState([]);

    const rootSubmenuKeys = ["10", "21", "31", "41", "51", "61"];

    const onOpenChange = (openKeysList) => {
        const latestOpenKey = openKeysList.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(openKeysList);
        } else {
            const opens = latestOpenKey ? [latestOpenKey] : [];
            setOpenKeys(opens);
        }
    };
    // const shouldUserSee = [].find((id) => id === myId).length > 0;

    return (
        <Menu openKeys={openKeys} mode="inline" theme="dark" onOpenChange={onOpenChange} className="menu-ul">
            {/* {shouldUserSee && ( */}
                <SubMenu
                    key="10"
                    title={
                        <span>
                            <UserOutlined />
                            <Link className="text-decoration-none" to={`/tasks`}>
                                <span>Tasks</span>
                            </Link>
                        </span>
                    }
                />
            {/* )} */}
            {companyData?.role?.admin && (
                <SubMenu
                    key="20"
                    title={
                        <span>
                            <UserOutlined />
                            <Link className="text-decoration-none" to={`/users`}>
                                <span>Users</span>
                            </Link>
                        </span>
                    }
                />
            )}
            <SubMenu
                key="11"
                title={
                    <span>
                        <UserOutlined />
                        <Link className="text-decoration-none" to={`/usersettings`}>
                            <span>User Settings</span>
                        </Link>
                    </span>
                }
            />
        </Menu>
    );
};

const mapStateToProps = (state) => ({ companyData: state.user.companyData });

export default connect(mapStateToProps)(MenuItems);
