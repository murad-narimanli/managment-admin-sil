import { UploadOutlined,FundOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from 'react'; 

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
            <div className="logo">Domain Finder</div>
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
                            <span>Admin</span>
                            </span>
                        }
                    >
                    
                    </SubMenu>

            </Menu>
        </>
    );
};

export default MenuItems;
