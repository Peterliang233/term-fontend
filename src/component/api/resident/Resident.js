// 登录接口
import Service from '../../axios/request';

export const GetResidentList = (query) => {
    return Service({
        url: 'resident/all',
        method: 'get',
        params: query,
    });
}

export const UpdateResident = (query) => {
    return Service({
        url: 'resident/renew',
        method: 'put',
        data: query,
    });
}
export const AddResident = (query) => {
    return Service({
        url: 'resident/add',
        method: 'post',
        data: query,
    });
}

export const DelResident = (query) => {
    return Service({
        url: 'resident/delete',
        method: 'delete',
        params: query,
    });
}