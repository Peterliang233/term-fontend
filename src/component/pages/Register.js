import React, {useEffect, useState} from "react";
import {Button, Form, Input, Modal, Popconfirm, Table} from "antd";
import {AddParking, DelParking, GetParking, UpdateParking} from "../api/parking/Parking";
import {ErrorMessage, TransParkingData, TransUserData} from "../common/common";
import { DelUser, GetUserList, RegistryReq, UpdateUser } from "../api/user/User";
import { useNavigate } from "react-router";

function Register(){
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [uuid, setUuid] = useState('');
    const [type, setType] = useState('');
    const [visible,setVisible] = useState(false);
    const [key,setKey] = useState(0);
    const [data,setData] = useState([]);
    const [disabled,setDisabled] = useState(false);
    const columns = [
        {
            title: '用户名',
            dataIndex: 'username',
            sorter: {
                compare: (a, b) => a.username - b.number,
                multiple: 3,
            },
        },
            {
                title: '用户密码',
                dataIndex: 'password',
                sorter: {
                    compare: (a, b) => a.password- b.password,
                    multiple: 4,
                },
            },
        {
            title: '用户uuid',
            dataIndex: 'uuid',
            sorter: {
                compare: (a, b) => a.uuid - b.uuid,
                multiple: 2,
            },
        },
        {
            title: '用户类型',
            dataIndex: 'type',
            sorter: {
                compare: (a, b) => a.type - b.type,
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
                        setUsername(record.username)
                        setPassword(record.password)
                        setType(record.type)
                        setUuid(record.uuid)
                        setDisabled(true)
                        setKey(record.key)
                    }}>修改信息</Button>
                </div>
                <div style={{width: "5%"}}/>
                <div>
                    <Button type="primary" danger><Popconfirm
                        title="确定删除该用户吗？"
                        onConfirm={()=>delUser(record.key)}
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

    useEffect(()=>{
        GetUserList().then((res)=>{
            if(res.status === 0){
                setData(TransUserData(res.data.data))
            }
        }).catch((error)=>{
            ErrorMessage(error)
        })
    },[])
    const delUser = (item) => {
        let reqData = {
            'id': item,
        }

        DelUser(reqData).then((res)=>{
            if(res.status === 0) {
                setData(TransUserData(res.data.data))
            }
        }).catch((error)=>{
            ErrorMessage(error)
        })
    }

    const updateTable = ()=> {
        if(key===-1){
            let reqData= {
                'uuid': uuid,
                'username': username,
                'password': password,
                'type': type,
            }

            RegistryReq(reqData).then((res)=>{
                if (res.status === 0){
                    setData(TransUserData(res.data.data))
                }
            }).catch((error)=>{
                ErrorMessage(error)
            })
        }else{
            let reqData= {
                'id': key,
                'uuid': uuid,
                'username': username,
                'password': password,
                'type': type,
            }

            UpdateUser(reqData).then((res)=>{
                if(res.status===0){
                    setData(TransUserData(res.data.data))
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
                    setPassword('')
                    setUsername('')
                    setType('')
                    setUuid('')
                    setDisabled(false)
                    setKey(-1)
                }}>新增系统用户</Button></div>
                <Table dataSource={data} columns={columns}></Table>
                <Modal
                    title="新增系统用户"
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
                            label="用户名"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名',
                                },
                            ]}
                        >
                            <Input onChange={(e)=>setUsername(e.target.value)} value={username} placeholder={username} disabled={disabled}/>
                        </Form.Item>
                        <Form.Item
                            label="用户密码"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户密码',
                                },
                            ]}
                        >
                            <Input onChange={(e)=>setPassword(e.target.value)} value={password} placeholder={password}/>
                        </Form.Item>

                        <Form.Item
                            label="用户uuid"
                            name="uuid"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户的uuid,用来唯一标识用户',
                                },
                            ]}
                        >
                            <Input onChange={(e)=>setUuid(e.target.value)} value={uuid} placeholder={uuid}/>
                        </Form.Item>

                        <Form.Item
                            label="用户类型"
                            name="type"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户类型',
                                },
                            ]}
                        >
                            <Input onChange={(e)=>setType(e.target.value)} value={type} placeholder={type}/>
                        </Form.Item>

                    </Form>
                </Modal>
            </div>
        )
}

export default Register;