import React, {useEffect, useState} from "react";
import {Button, Table, Modal, Form, Input, Popconfirm} from 'antd';
import "./Resident.css";

function Resident() {
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [enter_time,setEnterTime] = useState('');



    const data = [
        {
            key: '7',
            name: 'John Brown',
            phone: 12331421234,
            address: 60,
            enter_time: 70,
        },
        {
            key: '2',
            name: 'John Brown',
            phone: 1234134123,
            address: 60,
            enter_time: 70,
        },
        {
            key: '3',
            name: 'John Brown',
            phone: 2353513134,
            address: 60,
            enter_time: 70,
        },
        {
            key: '4',
            name: 'John Brown',
            phone: 1234531,
            address: 60,
            enter_time: 70,
        },
    ];

    useEffect(()=>{
        queResident();
    },[data]);
    const columns = [
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
            title: '居住单元',
            dataIndex: 'address',
            sorter: {
                compare: (a, b) => a.address - b.address,
                multiple: 2,
            },
        },
        {
            title: '入住时间',
            dataIndex: 'enter_time',
            sorter: {
                compare: (a, b) => a.enter_time - b.enter_time,
                multiple: 1,
            },
        },
        {
            title: '操作',
            dataIndex: 'operator',
            render: (_, record) => <div className="operator">
                <div>
                    <Button type="primary" onClick={() => setVisible(true)}>修改信息</Button>
                </div>
                <div style={{width: "5%"}}/>
                <div>
                    <Button type="primary" danger><Popconfirm
                        title="确定删除该业主的信息吗？"
                        onConfirm={()=>delResident(record.key)}
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
    ];


    const delResident = (item)=>{
        // 执行删除操作
        console.log(item)
    }

    const renewResident = (e) => {
        // 执行更新操作
        let reqData = {
            'id': e,
            'name': name,
            'phone': phone,
            'address': address,
            'enter_time': enter_time,
        }

        console.log(reqData)
    }

    const addResident = ()=>{
        // 执行添加操作
        let reqData = {
            'name': name,
            'phone': phone,
            'address': address,
            'enter_time': enter_time,
        }
        console.log(reqData)
       // 请求后端接口

        // 重新绑定data
    }

    const queResident = ()=>{
        console.log("拉取数据");
    }

    return (
        <div>
            <div><Button onClick={()=>setVisible(true)}>新增住户</Button></div>
            <Table dataSource={data} columns={columns}></Table>
            <Modal
                title="新增业主信息"
                centered
                visible={visible}
                onOk={()=>{
                    addResident()
                    setVisible(false)
                }}
                onCancel={()=>setVisible(false)}
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
                        <Input onChange={(e)=>setName(e.target.value)}/>
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
                        <Input onChange={(e)=>setPhone(e.target.value)}/>
                    </Form.Item>
                    <Form.Item
                        label="居住单元"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: '请输入您的居住单元',
                            },
                        ]}
                    >
                        <Input onChange={(e)=>setAddress(e.target.value)}/>
                    </Form.Item>

                    <Form.Item
                        label="入住时间"
                        name="enter_time"
                        rules={[
                            {
                                required: true,
                                message: '请输入您的入住时间',
                            },
                        ]}
                    >
                        <Input onChange={(e)=>setEnterTime(e.target.value)}/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Resident;