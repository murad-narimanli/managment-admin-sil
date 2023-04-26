import React from "react";
import { Avatar, Popover, Layout, Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, SettingOutlined, LogoutOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { logOut } from "../../redux/actions";
import { Link } from "react-router-dom";

const { Header } = Layout;

const HeaderMain = ({ setCollapsed, colorBgContainer, collapsed,user,logOut}) => {

    const text = <span>{user.companyData.first_name + ' ' + user.companyData.last_name}</span>;

    const content = (
        <div className="d-flex justify-content-between">
            <Link to={'/'}>
                <Button onClick={() => {logOut()}} className="me-2 d-flex align-items-center">
                    <SettingOutlined />
                    Log out
                </Button>
            </Link>
            <Link to={'/usersettings'}>
            <Button className="me-2 d-flex align-items-center">
                <LogoutOutlined />
                Settings
            </Button>
            </Link>
        </div>
    );
    return (
        <>
            <Header
                style={{
                    padding: 0,
                    background: colorBgContainer,
                }}
            >
                <div className="d-flex justify-content-between align-items-center">
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: "trigger",
                        onClick: () => setCollapsed(!collapsed),
                    })}

                    <Popover placement="bottomLeft" title={text} content={content} trigger="click">
                        <Avatar src={user.companyData.avatar} className="me-3 d-flex justify-content-center align-items-center" size={30} icon={<UserOutlined />} />
                    </Popover>
                </div>
            </Header>
        </>
    );
};

const mapStateToProps = ({user}) => ({
    user
});

export default connect(mapStateToProps, { logOut })(HeaderMain);
