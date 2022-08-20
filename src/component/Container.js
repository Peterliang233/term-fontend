import {
    CarOutlined, DingdingOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined, MessageOutlined, MoneyCollectOutlined, SettingOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import "./Container.css";
const { Header, Sider, Content } = Layout;

const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout style={{
            height: "100%",
        }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '0',
                            icon: <DingdingOutlined />,
                            label: '小区物业管理系统',
                        },
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: '业主详情',
                        },
                        {
                            key: '2',
                            icon:  <MessageOutlined />,
                            label: '投诉管理',
                        },
                        {
                            key: '3',
                            icon: <SettingOutlined />,
                            label: '报修管理',
                        },
                        {
                            key: '4',
                            icon: <MoneyCollectOutlined />,
                            label: '缴费管理',
                        },
                        {
                            key: '5',
                            icon:<CarOutlined />,
                            label: '停车位管理',
                        },
                    ]}
                />
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                    }}
                >
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    Content
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;