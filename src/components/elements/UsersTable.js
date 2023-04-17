import { Space, Table } from "antd";

const { Column } = Table;

const UsersTable = (props) => (
    <Table dataSource={props.data}>
        <Column title="Name" dataIndex="name" key="firstName" />
        <Column title="Surname" dataIndex="surname" key="surName" />
        <Column title="Username" dataIndex="username" key="lastName" />

        <Column
            title="Action"
            key="action"
            render={(_, record) => (
                <Space size="middle">
                    <a>Invite {record.lastName}</a>
                    <a>Delete</a>
                </Space>
            )}
        />
    </Table>
);
export default UsersTable;
