import {
    CarOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined, MessageOutlined, MoneyCollectOutlined, QqOutlined, SettingOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React from 'react';
import "./Container.css";
import Resident from "./pages/Resident";
import Complaint from "./pages/Complaint";
import Fee from './pages/Fee';
import Repair from './pages/Repair';
import Home from "./pages/Home";
import Parking from './pages/Parking';
const { Header, Sider, Content } = Layout;

export default class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            selectedKeys: '0',
            render: '',
            items: [
                {
                    key: '0',
                    icon: <QqOutlined />,
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
                    label:'投诉管理',
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
            ]
        }
    }

    setCollapsed = () => {
        this.setState({collapsed: !this.state.collapsed})
    }

    onClick(e) {
        this.setState({
            selectedKeys: e.key,
            render: e.key,
        });
    }


    renderComponent = () =>{
        switch (this.state.render) {
            case '0': return <Home/>
            case '1': return <Resident/>
            case '2': return <Complaint/>
            case '3': return <Repair/>
            case '4': return <Fee/>
            case '5': return <Parking/>
            default:
                return <Home/>
        }
    }

    render() {
        return (
            <Layout style={{
                height: "100%",
            }}>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" />
                    <Menu
                        onClick={this.onClick.bind(this)}
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['0']}
                        items={this.state.items}
                        selectedKeys={[this.state.selectedKeys]}
                    >
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header
                        className="site-layout-background"
                        style={{
                            padding: 0,
                        }}
                    >
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => this.setCollapsed(),
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
                        <div>
                            {this.renderComponent()}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
