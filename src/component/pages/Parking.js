import React, {useEffect, useState} from "react";
import {Button, Form, Input, Modal, Popconfirm, Table} from "antd";
import {AddParking, DelParking, GetParking, UpdateParking} from "../api/parking/Parking";
import {ErrorMessage, TransParkingData} from "../common/common";

function Parking(){
    const [number, setNumber] = useState('');
    const [status,setStatus] = useState('');
    const [visible,setVisible] = useState(false);
    const [tenant, setTenant] = useState('');
    const [uuid,setUuid] = useState('');
    const [key,setKey] = useState(0);
    const [data,setData] = useState([]);
    const [disabled,setDisabled] = useState(false);
    const columns = [
        {
            title: '停车位编号',
            dataIndex: 'number',
            sorter: {
                compare: (a, b) => a.number - b.number,
                multiple: 3,
            },
        },
            {
                title: '停车位租户uuid',
                dataIndex: 'uuid',
                sorter: {
                    compare: (a, b) => a.uuid- b.uuid,
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
                    <Button type="primary" onClick={() => {
                        setVisible(true)
                        setNumber(record.number)
                        setUuid(record.uuid)
                        setStatus(record.status)
                        setTenant(record.tenant)
                        setDisabled(true)
                        setKey(record.key)
                    }}>修改信息</Button>
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
    ];

    useEffect(()=>{
        GetParking().then((res)=>{
            if(res.status === 0) {
                setData(TransParkingData(res.data.data))
            }
        }).catch((error)=>{
            ErrorMessage(error)
        })
    })
    const delComplaint = (item) => {
        let reqData = {
            'id': item,
        }

        DelParking(reqData).catch((res)=>{
            if(res.status === 0) {
                setData(TransParkingData(res.data.data))
            }
        }).catch((error)=>{
            ErrorMessage(error)
        })
    }

    const updateTable = ()=> {
        if(key===-1){
            let reqData= {
                'number': number,
                'status': status,
                'uuid': uuid,
                'tenant': tenant,
            }

            AddParking(reqData).then((res)=>{
                setData(TransParkingData(res.data.data))
            }).catch((error)=>{
                ErrorMessage(error)
            })
        }else{
            let reqData= {
                'id': key,
                'number': number,
                'status': status,
                'uuid': uuid,
                'tenant': tenant,
            }

            UpdateParking(reqData).then((res)=>{
                if(res.status===0){
                    setData(TransParkingData(res.data.data))
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
                    setNumber('')
                    setUuid('')
                    setTenant('')
                    setStatus('')
                    setDisabled(false)
                    setKey(-1)
                }}>新增停车位信息</Button></div>
                <Table dataSource={data} columns={columns}></Table>
                <Modal
                    title="新增停车位信息"
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
                            label="车位编号"
                            name="number"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入车位编号',
                                },
                            ]}
                        >
                            <Input onChange={(e)=>setNumber(e.target.value)} value={number} placeholder={number} disabled={disabled}/>
                        </Form.Item>

                        <Form.Item
                            label="停车位租户uuid"
                            name="uuid"
                        >
                            <Input onChange={(e)=>setUuid(e.target.value)} value={uuid} placeholder={uuid}/>
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
                            <Input onChange={(e)=>setStatus(e.target.value)} value={status} placeholder={status}/>
                        </Form.Item>

                        <Form.Item
                            label="停车位租户"
                            name="tenant"
                        >
                            <Input onChange={(e)=>setTenant(e.target.value)} value={tenant} placeholder={tenant}/>
                        </Form.Item>

                    </Form>
                </Modal>
            </div>
        )
}

export default Parking;