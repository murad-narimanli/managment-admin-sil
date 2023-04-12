import { UploadOutlined,FundOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from 'react'; 
import { Link } from "react-router-dom";
const { SubMenu } = Menu


const MenuItems = () => {

    
    const [openKeys, setOpenKeys] = useState([]);

    const rootSubmenuKeys = ["10", "21", "31", "41", "51", "61"];
  
  
    const onOpenChange = (openKeysList) => {
      const latestOpenKey = openKeysList.find(
        (key) => openKeys.indexOf(key) === -1
      );
      if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        setOpenKeys(openKeysList);
      } else {
        const opens = latestOpenKey ? [latestOpenKey] : [];
        setOpenKeys(opens);
      }
    };

    return (
        <>
            <Menu
                openKeys={openKeys}
                mode="inline"
                theme="dark"
                onOpenChange={onOpenChange}
                className="menu-ul"
                >
                    <SubMenu
                        key="10"
                        title={
                            <span>
                            <UserOutlined />
                            <Link  className='text-decoration-none' to={`/tasks`}>
                            <span>Tasks</span>
                            </Link>
                            
                            </span>
                        }
                    >
                    
                    </SubMenu>
                    <SubMenu
                        key="20"
                        title={
                            <span>
                            <UserOutlined />
                            <Link  className='text-decoration-none' to={`/users`}>
                            <span>Users</span>
                            </Link>
                            </span>
                        }
                    >
                    
                    </SubMenu>
                    <SubMenu
                        key="11"
                        title={
                            <span>
                            <UserOutlined />
                            <Link  className='text-decoration-none' to={`/userssettings`}>
                            <span>User Settings</span>
                            </Link>
                            </span>
                        }
                    >
                    
                    </SubMenu>

            </Menu>
        </>
    );
};

export default MenuItems;
