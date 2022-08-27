// 登录接口
import Service from '../axios/request';

export const LoginReq = query => {
    return Service({
        url: '/login',
        method: 'post',
        params: query,
    });
}