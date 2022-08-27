import React from "react";
import {Button, Form, Input, Modal, Popconfirm, Table} from "antd";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            visible: false,
            name: '',
            phone: '',
            fee_type: '',
            status: '',
            data: [
                {
                    key: '7',
                    name: 'John Brown',
                    phone: 12331421234,
                    fee_type: "水电费",
                    status: 70,
                },
                {
                    key: '2',
                    name: 'John Brown',
                    phone: 1234134123,
                    fee_type: "水电费",
                    status: 70,
                },
                {
                    key: '3',
                    name: 'John Brown',
                    phone: 2353513134,
                    fee_type: "水电费",
                    status: 70,
                },
                {
                    key: '4',
                    name: 'John Brown',
                    phone: 1234531,
                    fee_type: "水电费",
                    status: 70,
                },
            ],
            columns: [
                {
                    title: '姓名',
                    dataIndex: 'name',
                },
                {
                    title: '电话号码',
                    dataIndex: 'phone',
                    sorter: {
                        compare: (a, b) => a.phone - b.phone,
                        multiple: 3,
                    },
                },
                {
                    title: '费用类型',
                    dataIndex: 'fee_type',
                    sorter: {
                        compare: (a, b) => a.fee_type - b.fee_type,
                        multiple: 2,
                    },
                },
                {
                    title: '状态',
                    dataIndex: 'status',
                    sorter: {
                        compare: (a, b) => a.status - b.status,
                        multiple: 1,
                    },
                },
                {
                    title: '操作',
                    dataIndex: 'operator',
                    render: (_, record) => <div className="operator">
                        <div>
                            <Button type="primary" onClick={() => this.setState({visible: true})}>修改信息</Button>
                        </div>
                        <div style={{width: "5%"}}/>
                        <div>
                            <Button type="primary" danger><Popconfirm
                                title="确定删除该费用信息吗？"
                                onConfirm={()=>delComplaint(record.key)}
                                //onCancel={cancel}
                                okText="确定"
                                cancelText="再想想"
                            >
                                <label>删除</label>
                            </Popconfirm>
                            </Button>
                        </div>
                    </div>
                }
            ],
        };

        const delComplaint = (value)=>{
            console.log(value);
        }
    }

    render(){
        return (
            <div>
                <div><Button onClick={()=>this.setState({visible:true})}>新增缴费详情</Button></div>
                <Table dataSource={this.state.data} columns={this.state.columns}></Table>
                <Modal
                    title="新增缴费详情"
                    centered
                    visible={this.state.visible}
                    onOk={()=>{
                        //addResident()
                        this.setState({visible:false})
                    }}
                    onCancel={()=> this.setState({visible:false})}
                >
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="姓名"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入您的姓名',
                                },
                            ]}
                        >
                            <Input onChange={(e)=>this.setState({name:e.target.value})}/>
                        </Form.Item>

                        <Form.Item
                            label="电话号码"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入您的电话号码',
                                },
                            ]}
                        >
                            <Input onChange={(e)=>this.setState({phone:e.target.value})}/>
                        </Form.Item>

                        <Form.Item
                            label="费用类型"
                            name="fee_type"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入需要缴纳的费用类型',
                                },
                            ]}
                        >
                            <Input onChange={(e)=>this.setState({fee_type:e.target.value})}/>
                        </Form.Item>

                        <Form.Item
                            label="状态"
                            name="status"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入您的状态',
                                },
                            ]}
                        >
                            <Input onChange={(e)=>this.setState({status:e.target.value})}/>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}