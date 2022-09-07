// 登录接口
import Service from '../../axios/request';

export const GetRepairList = (query) => {
    return Service({
        url: 'repair/all',
        method: 'get',
        params: query,
    });
}

export const UpdateRepair = (query) => {
    return Service({
        url: 'repair/renew',
        method: 'put',
        data: query,
    });
}
export const AddRepair = (query) => {
    return Service({
        url: 'repair/add',
        method: 'post',
        data: query,
    });
}

export const DelRepair = (query) => {
    return Service({
        url: 'repair/delete',
        method: 'delete',
        params: query,
    });
}