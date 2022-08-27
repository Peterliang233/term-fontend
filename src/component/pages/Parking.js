import React from "react";
import {Button, Form, Input, Modal, Popconfirm, Table} from "antd";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            visible: false,
            number: '',
            status: '',
            tenant: '',
            data: [
                {
                    key: '7',
                    number: "12331421234",
                    status: 70,
                },
                {
                    key: '2',
                    number: "1234134123",
                    status: 70,
                },
                {
                    key: '3',
                    number: "2353513134",
                    status: 70,
                },
                {
                    key: '4',
                    number: "1234531",
                    status: 70,
                },
            ],
            columns: [
                {
                    title: '停车位编号',
                    dataIndex: 'number',
                    sorter: {
                        compare: (a, b) => a.number - b.number,
                        multiple: 3,
                    },
                },
                {
                    title: '租用状态',
                    dataIndex: 'status',
                    sorter: {
                        compare: (a, b) => a.status - b.status,
                        multiple: 2,
                    },
                },
                {
                    title: '租户名',
                    dataIndex: 'tenant',
                    sorter: {
                        compare: (a, b) => a.tenant - b.tenant,
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
                                title="确定删除该停车位信息吗？"
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
                <div><Button onClick={()=>this.setState({visible:true})}>新增停车位信息</Button></div>
                <Table dataSource={this.state.data} columns={this.state.columns}></Table>
                <Modal
                    title="新增停车位信息"
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
                            label="车位编号"
                            name="number"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入车位编号',
                                },
                            ]}
                        >
                            <Input onChange={(e)=>this.setState({number:e.target.value})}/>
                        </Form.Item>

                        <Form.Item
                            label="停车位状态"
                            name="status"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入停车位状态',
                                },
                            ]}
                        >
                            <Input onChange={(e)=>this.setState({status:e.target.value})}/>
                        </Form.Item>

                        <Form.Item
                            label="租户"
                            name="tenant"
                        >
                            <Input onChange={(e)=>this.setState({tenant:e.target.value})}/>
                        </Form.Item>

                    </Form>
                </Modal>
            </div>
        )
    }
}