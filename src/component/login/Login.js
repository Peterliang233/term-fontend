import { Button, Form, Input } from 'antd';
import React from 'react';
import {LoginReq} from "../api/user/User";
import "./Login.css";
import {ErrorMessage, SuccessMessage, WarnMessage} from "../common/common";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            title: '小区物业管理系统登录'
        }
    }


    loginSubmit = (values) => {
        // 登录请求后台
        var data = {
            username: values.username,
            password: values.password,
        }
        LoginReq(data).then((res)=>{
            if (res.status===0){
                localStorage.setItem("Authorization", res.data.token);
                this.props.history.push("/");
                SuccessMessage(res.message);
            }else{
                WarnMessage(res.message);
            }
        }).catch(error => {
            ErrorMessage(error);
        })
    }


    render(){
        return (
            <div className="total">
                <div style={{
                    height: "40%",
                }}>
                    <div style={{
                        height: "85%"
                    }}>
                    </div>
                    <div className="headDiv">
                        <div>
                            <svg t="1661352555591" className="icon" viewBox="0 0 1024 1024" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg" p-id="4688" width="48" height="48">
                                <path
                                    d="M1001.632 793.792c-7.84-13.856-26.016-37.536-93.12-83.2a1096.224 1096.224 0 0 0-125.152-74.144c-30.592-82.784-89.824-190.112-176.256-319.36-93.056-139.168-201.12-197.792-321.888-174.56a756.608 756.608 0 0 0-40.928-37.696C213.824 78.688 139.2 56.48 96.32 60.736c-19.424 1.952-34.016 9.056-43.36 21.088-21.664 27.904-14.432 68.064 85.504 198.912 19.008 55.616 23.072 84.672 23.072 99.296 0 30.912 15.968 66.368 49.984 110.752l-32 109.504c-28.544 97.792 23.328 224.288 71.616 268.384 25.76 23.552 47.456 20.032 58.176 15.84 21.504-8.448 38.848-29.472 50.048-89.504 5.728 14.112 11.808 29.312 18.208 45.6 34.56 87.744 68.352 136.288 106.336 152.736a32.032 32.032 0 0 0 25.44-58.688c-9.408-4.096-35.328-23.712-72.288-117.504-31.168-79.136-53.856-132.064-69.376-161.856a32.224 32.224 0 0 0-35.328-16.48 32.032 32.032 0 0 0-25.024 29.92c-3.872 91.04-13.056 130.4-19.2 147.008-26.496-30.464-68.128-125.984-47.232-197.536 20.768-71.232 32.992-112.928 36.64-125.248a31.936 31.936 0 0 0-5.888-29.28c-41.664-51.168-46.176-75.584-46.176-83.712 0-29.472-9.248-70.4-28.288-125.152a31.104 31.104 0 0 0-4.768-8.896c-53.824-70.112-73.6-105.216-80.832-121.888 25.632 1.216 74.336 15.04 91.008 29.376a660.8 660.8 0 0 1 49.024 46.304c8 8.448 19.968 11.872 31.232 8.928 100.192-25.92 188.928 21.152 271.072 144 87.808 131.328 146.144 238.048 173.408 317.216a32 32 0 0 0 16.384 18.432 1004.544 1004.544 0 0 1 128.8 75.264c7.392 5.024 14.048 9.696 20.064 14.016h-98.848a32.032 32.032 0 0 0-24.352 52.736 3098.752 3098.752 0 0 0 97.856 110.464 32 32 0 1 0 46.56-43.872 2237.6 2237.6 0 0 1-50.08-55.328h110.08a32.032 32.032 0 0 0 27.84-47.776z"
                                    p-id="4689"></path>
                                <path
                                    d="M320 289.472c12.672 21.76 22.464 37.344 29.344 46.784 8.288 16.256 21.184 29.248 29.44 45.536l2.016-1.984c14.528-9.952 25.92-49.504 2.752-75.488-12.032-18.176-51.04-17.664-63.552-14.848z"
                                    p-id="4690"></path>
                            </svg>
                        </div>
                        <div>
                            <h1>
                                {this.state.title}
                            </h1>
                        </div>
                    </div>
                    <div style={{
                        height: "5%"
                    }}></div>
                </div>
                <div style={{
                    height: "60%",
                }}>
                    <Form
                        className="center"
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
                        onFinish={this.loginSubmit}
                    >
                        <Form.Item
                            label="用户名"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: '账号不能为空',
                                },
                            ]}
                        ><Input />
                        </Form.Item>
                        <Form.Item
                            label="用户密码"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '密码不能为空',
                                },
                            ]}
                        ><Input.Password />
                        </Form.Item>

                        <div style={{
                            display: "flex",
                        }}>
                            <Form.Item
                                className="login"
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            ><Button type="primary" htmlType="submit">
                                登录
                            </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </div>
        );
  }
}

export default App;