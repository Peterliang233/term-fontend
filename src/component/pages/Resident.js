import React from "react";
import {Button, Table} from 'antd';
import "./Resident.css";


export default class Resident extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            tableTitle: '小区居民信息等级表',
            data: [
                {
                    key: '1',
                    name: 'John Brown',
                    chinese: 98,
                    math: 60,
                    english: 70,
                },
                {
                    key: '2',
                    name: 'Jim Green',
                    chinese: 98,
                    math: 66,
                    english: 89,
                },
                {
                    key: '3',
                    name: 'Joe Black',
                    chinese: 98,
                    math: 90,
                    english: 70,
                },
                {
                    key: '4',
                    name: 'Jim Red',
                    chinese: 88,
                    math: 99,
                    english: 89,
                },
            ],
            columns: [
                {
                    title: '姓名',
                    dataIndex: 'name',
                },
                {
                    title: '电话号码',
                    dataIndex: 'chinese',
                    sorter: {
                        compare: (a, b) => a.chinese - b.chinese,
                        multiple: 3,
                    },
                },
                {
                    title: '居住单元',
                    dataIndex: 'math',
                    sorter: {
                        compare: (a, b) => a.math - b.math,
                        multiple: 2,
                    },
                },
                {
                    title: 'English Score',
                    dataIndex: 'english',
                    sorter: {
                        compare: (a, b) => a.english - b.english,
                        multiple: 1,
                    },
                },
                {
                    title: '操作',
                    dataIndex: 'operator',
                    render: () => <div className="operator">
                        <div>
                            <Button type="primary">修改信息</Button>
                        </div>
                        <div style={{width: "5%"}}/>
                        <div>
                            <Button type="primary" danger>删除</Button>
                        </div>
                    </div>
                }
            ]
        }
    }


    render(){
        return (
            <div>
                <div><Button>新增住户</Button></div>
                <Table dataSource={this.state.data} columns={this.state.columns}></Table>
            </div>
        )
    }
}