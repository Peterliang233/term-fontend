// 登录接口
import Service from '../../axios/request';

export const GetParking = (query) => {
    return Service({
        url: 'parking/all',
        method: 'get',
        params: query,
    });
}

export const UpdateParking = (query) => {
    return Service({
        url: 'parking/renew',
        method: 'put',
        data: query,
    });
}
export const AddParking = (query) => {
    return Service({
        url: 'parking/add',
        method: 'post',
        data: query,
    });
}

export const DelParking = (query) => {
    return Service({
        url: 'parking/delete',
        method: 'delete',
        params: query,
    });
}