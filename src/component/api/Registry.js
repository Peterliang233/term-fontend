// 登录接口
import Service from '../axios/request';

export const RegistryReq = query => {
    return Service({
        url: '/registry',
        method: 'post',
        params: query,
    });
}