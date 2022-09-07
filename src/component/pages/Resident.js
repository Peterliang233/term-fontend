import React, {useEffect, useState} from "react";
import {Button, Table, Modal, Form, Input, Popconfirm} from 'antd';
import "./Resident.css";
import "../api/resident/Resident";
import {AddResident, DelResident, GetResidentList, UpdateResident} from "../api/resident/Resident";
import {ErrorMessage, TransResidentData} from "../common/common";

function Resident() {
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [enterTime,setEnterTime] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [key, setKey] = useState();



    const [data, setData] = useState([]);

    // 刷新的时候调用这个接口获取数据
    useEffect(()=>{
        GetResidentList().then((res)=>{
            if (res.status === 0) {
                setData(TransResidentData(res.data.data))
            }
        }).catch((error)=>{
            console.log(error)
            ErrorMessage(error);
        })
    },[]);
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
            dataIndex: 'enterTime',
            sorter: {
                compare: (a, b) => a.enterTime - b.enterTime,
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
                        setEnterTime(record.enterTime)
                        setName(record.name)
                        setKey(record.key)
                        setAddress(record.address)
                        setPhone(record.phone)
                        setDisabled(true)
                    }}>修改信息</Button>
                </div>
                <div style={{width: "5%"}}/>
                <div>
                    <Button type="primary" danger><Popconfirm
                        title="确定删除该业主的信息吗？"
                        onConfirm={()=>delResident(record.key)}
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
        // 调用后端接口执行删除操作
        let reqData = {
            'id': item
        }
        DelResident(reqData).then((res)=>{
            if (res.status === 0) {
                setData(TransResidentData(res.data.data))
            }
        }).catch((error)=>{
            ErrorMessage(error)
        })
    }

    const updateTable = ()=>{
        if (key === -1) {
            // 执行添加操作
            let reqData = {
                'name': name,
                'phone': phone,
                'address': address,
                'enterTime': enterTime,
            }
            // 向后端请求数据，然后替换data
            AddResident(reqData).then((res)=>{
                if (res.status === 0) {
                    // 获取所有的数据
                    setData(TransResidentData(res.data.data))
                }
            }).catch((error)=>{
                ErrorMessage(error);
            })
            
        }else{
            // 执行更新操作
            console.log("update");
            let reqData = {
                'id': key,
                'name': name,
                'phone': phone,
                'address': address,
                'enterTime': enterTime,
            }

            // 更新数据，然后向后端请求数据，最后更新data
            UpdateResident(reqData).then((res)=>{
                if (res.status === 0) {
                    // 请求最新数据
                    setData(TransResidentData(res.data.data))
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
                setEnterTime('')
            }}>新增住户</Button></div>
            <Table 
            dataSource={[...data]} 
            columns={columns}
            ></Table>
            <Modal
                title="业主信息"
                centered
                visible={visible}
                onOk={()=>{
                    updateTable()
                    setVisible(false)
                }}
                onCancel={()=>setVisible(false)}
                destroyOnClose={true}
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
                        label="居住单元"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: '请输入您的居住单元',
                            },
                        ]}
                    >
                        <Input onChange={(e)=>setAddress(e.target.value)} value={address} placeholder={address}/>
                    </Form.Item>

                    <Form.Item
                        label="入住时间"
                        name="enterTime"
                
                        rules={[
                            {
                                required: true,
                                message: '请输入您的入住时间',
                            },
                        ]}
                    >
                        <Input  disabled={disabled} value={enterTime} placeholder={enterTime} onChange={(e)=>setEnterTime(e.target.value)} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Resident;