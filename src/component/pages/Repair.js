import React, {useEffect, useState} from "react";
import {Button, Form, Input, Modal, Popconfirm, Table} from "antd";
import {AddRepair, DelRepair, GetRepairList, UpdateRepair} from "../api/repair/Repair";
import {ErrorMessage, TransRepairData} from "../common/common";

function Repair() {
    const [visible,setVisible] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [detail, setDetail] = useState('');
    const [status, setStatus] = useState('');
    const [disabled,setDisabled] = useState(false);
    const [key, setKey] = useState(0);
    const [data, setData] = useState([]);

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
            title: '住户单元',
            dataIndex: 'address',
            sorter: {
                compare: (a, b) => a.address - b.address,
                multiple: 3,
            },
        },
        {
            title: '报修详情',
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
                    <Button type="primary" onClick={() => {
                        setVisible(true)
                        setName(record.name)
                        setKey(record.key)
                        setDetail(record.detail)
                        setAddress(record.address)
                        setPhone(record.phone)
                        setStatus(record.status)
                        setDisabled(true)
                    }}>修改信息</Button>
                </div>
                <div style={{width: "5%"}}/>
                <div>
                    <Button type="primary" danger><Popconfirm
                        title="确定删除该报修的信息吗？"
                        onConfirm={()=>delComplaint(record.key)}
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

    useEffect(()=>{
        GetRepairList().then((res)=>{
            if (res.status === 0) {
                setData(TransRepairData(res.data.data))
            }
        }).catch((error)=>{
            ErrorMessage(error)
        })
    })

    const delComplaint = (value)=>{
        let reqData = {
            'id': value,
        }

        DelRepair(reqData).catch((res)=>{
            if (res.status === 0) {
                setData(TransRepairData(res.data.data))
            }
        }).catch((error)=>{
            ErrorMessage(error)
        })
    }

    const updateTable = () => {
        if (key===-1){
            let reqData = {
                'name': name,
                'phone': phone,
                'address': address,
                'detail': detail,
                'status': status,
            }

            AddRepair(reqData).catch((res)=>{
                if (res.status === 0) {
                    setData(TransRepairData(res.data.data));
                }
            }).catch((error)=>{
                ErrorMessage(error)
            })
        }else{
            let reqData = {
                'id': key,
                'name': name,
                'phone': phone,
                'address': address,
                'detail': detail,
                'status': status,
            }

            UpdateRepair(reqData).catch((res)=>{
                if (res.status === 0) {
                    setData(TransRepairData(res.data.data))
                }
            }).catch((error)=>{
                ErrorMessage(error)
            })
        }
    }

        return (
            <div>
                <div><Button onClick={()=>{
                    setVisible(true)
                    setDisabled(false)
                    setName('')
                    setAddress('')
                    setPhone('')
                    setKey(-1)
                    setDetail('')
                    setStatus('')
                }}>新增报修</Button></div>
                <Table dataSource={data} columns={columns}></Table>
                <Modal
                    title="新增报修信息"
                    centered
                    visible={visible}
                    destroyOnClose={true}
                    onOk={()=>{
                        updateTable()
                        setVisible(false)
                    }}
                    onCancel={()=> setVisible(false)}
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
                            <Input onChange={(e)=>setName(e.target.value)} disabled={disabled} value={name} placeholder={name}/>
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
                            <Input onChange={(e)=>setPhone(e.target.value)} value={phone} placeholder={phone}/>
                        </Form.Item>

                        <Form.Item
                            label="住户单元"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入您的住户单元',
                                },
                            ]}
                        >
                            <Input onChange={(e)=>setAddress(e.target.value)} disabled={disabled} value={address} placeholder={address}/>
                        </Form.Item>
                        <Form.Item
                            label="报修详情"
                            name="detail"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入您的投诉详情',
                                },
                            ]}
                        >
                            <Input onChange={(e)=>setDetail(e.target.value)} value={detail} placeholder={detail}/>
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
                            <Input onChange={(e)=>setStatus(e.target.value)} value={status} placeholder={status}/>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
}

export default Repair;