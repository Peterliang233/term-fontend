import React, {useEffect, useState} from "react";
import {Button, Form, Input, Modal, Popconfirm, Table} from "antd";
import {AddComplaint, DelComplaint, GetComplaintList, UpdateComplaint} from "../api/complaint/Complaint";
import {ErrorMessage, TransComplaintData} from "../common/common";

function Complaint() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [detail, setDetail] = useState('');
    const [status, setStatus] = useState('');
    const [key,setKey] = useState(0);
    const [visible, setVisible] = useState(false);
    const [disabled, setDisabled] = useState(false);
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
                    <Button type="primary" onClick={()=>{
                        setVisible(true)
                        setName(record.name)
                        setPhone(record.phone)
                        setKey(record.key)
                        setDetail(record.detail)
                        setStatus(record.status)
                        setDisabled(true)
                    }
                    }>修改信息</Button>
                </div>
                <div style={{width: "5%"}}/>
                <div>
                    <Button type="primary" danger><Popconfirm
                        title="确定删除该投诉的信息吗？"
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
    ]

    useEffect(()=>{
        console.log("请求一次数据")
        GetComplaintList().then((res)=>{
            setData(TransComplaintData(res.data.data))
        }).catch((error)=>{
            setData([])
            ErrorMessage(error);
        })
    },[]);

    const updateTable= () => {
        if (key === -1) {
            let reqData = {
                'name': name,
                'phone': phone,
                'detail': detail,
                'status': status
            }

            AddComplaint(reqData).then((res)=>{
                if(res.status === 0) {
                    setData(TransComplaintData(res.data.data))
                }
            }).catch((error)=>{
                ErrorMessage(error)
            })
        }else{
            let reqData = {
                'id': key,
                'name': name,
                'phone': phone,
                'detail': detail,
                'status': status,
            }

            UpdateComplaint(reqData).then((res)=>{
                if (res.status === 0) {
                    setData(TransComplaintData(res.data.data))
                }
            }).catch((error)=>{
                ErrorMessage(error)
            })
        }
    }

    const delComplaint = (item) => {
        let reqData = {
            'id': item
        }

        DelComplaint(reqData).then((res)=>{
            if (res.status === 0) {
                setData(TransComplaintData(res.data.data))
            }
        }).catch((error)=>{
            ErrorMessage(error)
        })
    }
        return (
            <div>
                <div><Button onClick={()=>{
                    setVisible(true)
                    setDisabled(false)
                    setName('')
                    setPhone('')
                    setKey(-1)
                    setStatus('')
                    setDetail('')
                }}>新增投诉</Button></div>
                <Table dataSource={data} columns={columns}></Table>
                <Modal
                    title="新增业主信息"
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
                            <Input disabled={disabled} value={name} placeholder={name} onChange={(e)=>setName(e.target.value)} />
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
                            label="投诉详情"
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
export default Complaint;