import axios from 'axios'


const BASE_URL = "http://localhost:8888"

const instance = axios.create({
    timeout: 1000*20,
    baseURL: BASE_URL,
})

instance.defaults.headers.post['Content-Type'] = 'application/json';

// 添加请求拦截器
instance.interceptors.request.use(config=>{
    if (config.url === '/login') {
        console.log("登录请求");
        return config;
    }

    const token=localStorage.getItem('Authorization') // 获取token
    if (token) {
        // 如果有token，将token放入到请求头里面
        config.headers.Authorization = `Bearer ` + token;
    }

    return config;
}, error => {
    return Promise.reject(error)
})


// 添加响应拦截器
instance.interceptors.response.use(response=>{
    return Promise.resolve(response.data);
}, error => {
    if (error.response) {
        if (error.response.status === 401) {
            this.props.history.push('/login');
        }
        return Promise.reject(error);
    }else{
        return Promise.reject('请求超时，请重试');
    }
})


export default instance;

