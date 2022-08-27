import React from "react";
import {Button, Form, Input, Modal, Popconfirm, Table} from "antd";

export default class Complaint extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            visible: false,
            name: '',
            phone: '',
            detail: '',
            status: '',
            data: [
                {
                    key: '7',
                    name: 'John Brown',
                    phone: 12331421234,
                    detail: 60,
                    status: 70,
                },
                {
                    key: '2',
                    name: 'John Brown',
                    phone: 1234134123,
                    detail: 60,
                    status: 70,
                },
                {
                    key: '3',
                    name: 'John Brown',
                    phone: 2353513134,
                    detail: 60,
                    status: 70,
                },
                {
                    key: '4',
                    name: 'John Brown',
                    phone: 1234531,
                    detail: 60,
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
                    title: '投诉详情',
                    dataIndex: 'detail',
                    sorter: {
                        compare: (a, b) => a.detail - b.detail,
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
                                title="确定删除该投诉的信息吗？"
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
                <div><Button onClick={()=>this.setState({visible:true})}>新增投诉</Button></div>
                <Table dataSource={this.state.data} columns={this.state.columns}></Table>
                <Modal
                    title="新增业主信息"
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
                            label="投诉详情"
                            name="detail"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入您的投诉详情',
                                },
                            ]}
                        >
                            <Input onChange={(e)=>this.setState({detail:e.target.value})}/>
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