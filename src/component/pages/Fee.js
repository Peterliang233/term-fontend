import React, {useEffect, useState} from "react";
import {Button, Form, Input, Modal, Popconfirm, Table} from "antd";
import {AddFee, DelFee, GetFeeList, UpdateFee} from "../api/fee/Fee";
import {ErrorMessage, TransFeeData} from "../common/common";

function Fee(){
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [feeType, setFeeType] = useState('');
    const [status, setStatus] = useState('');
    const [visible,setVisible] = useState(false);
    const [disabled,setDisabled] = useState(false);
    const [uuid, setUuid] = useState('');
    const [key, setKey] = useState(0);
    const [data,setData] = useState([]);
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
            title: '用户uuid',
            dataIndex: 'uuid',
            sorter: {
                compare: (a, b) => a.uuid - b.uuid,
                multiple: 4,
            },
        },
        {
            title: '费用类型',
            dataIndex: 'feeType',
            sorter: {
                compare: (a, b) => a.feeType - b.feeType,
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
                        setPhone(record.phone)
                        setName(record.name)
                        setFeeType(record.feeType)
                        setStatus(record.status)
                        setKey(record.key)
                        setUuid(record.uuid)
                        setDisabled(true)
                    }}>修改信息</Button>
                </div>
                <div style={{width: "5%"}}/>
                <div>
                    <Button type="primary" danger><Popconfirm
                        title="确定删除该费用信息吗？"
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
        GetFeeList().then((res)=>{
            if (res.status === 0) {
                setData(TransFeeData(res.data.data))
            }
        }).catch((error)=>{
            ErrorMessage(error)
        })
    },[])

    const delComplaint = (value)=>{
        let reqData = {
            'id': value,
        }

        DelFee(reqData).then((res)=>{
            if (res.status === 0) {
                setData(TransFeeData(res.data.data));
            }
        }).catch((error)=>{
            ErrorMessage(error)
        })
    }

    const updateTable = () => {
        if (key === -1){
            let reqData = {
                'name': name,
                'phone': phone,
                'feeType': feeType,
                'status': status,
                'uuid': uuid,
            }

            AddFee(reqData).then((res)=>{
                if (res.status === 0) {
                    setData(TransFeeData(res.data.data))
                }
            }).catch((error)=>{
                ErrorMessage(error)
            })
        }else{
            let reqData = {
                'id': key,
                'name': name,
                'phone': phone,
                'feeType': feeType,
                'status': status,
                'uuid': uuid,
            }

            UpdateFee(reqData).then((res)=>{
                if (res.status === 0) {
                    setData(TransFeeData(res.data.data))
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
                    setPhone('')
                    setName('')
                    setFeeType(null)
                    setStatus(null)
                    setKey(-1)
                    setDisabled(false)
                    setUuid('')
                }}>新增缴费详情</Button></div>
                <Table dataSource={data} columns={columns}></Table>
                <Modal
                    title="新增缴费详情"
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
                            <Input onChange={(e)=>setName(e.target.value)} value={name} disabled={disabled} placeholder={name}/>
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
                            label="用户uuid"
                            name="uuid"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入该缴费用户的uuid',
                                },
                            ]}
                        >
                            <Input onChange={(e)=>setUuid(e.target.value)} value={uuid} placeholder={uuid}/>
                        </Form.Item>

                        <Form.Item
                            label="费用类型"
                            name="feeType"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入需要缴纳的费用类型',
                                },
                            ]}
                        >
                            <Input onChange={(e)=>setFeeType(e.target.value)} value={feeType}  placeholder={feeType}/>
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
                            <Input onChange={(e)=>setStatus(e.target.value)}  value={status} placeholder={status}/>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
}
export default Fee;