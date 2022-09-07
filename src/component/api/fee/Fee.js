// 登录接口
import Service from '../../axios/request';

export const GetFeeList = (query) => {
    return Service({
        url: 'fee/all',
        method: 'get',
        params: query,
    });
}

export const UpdateFee = (query) => {
    return Service({
        url: 'fee/renew',
        method: 'put',
        data: query,
    });
}
export const AddFee = (query) => {
    return Service({
        url: 'fee/add',
        method: 'post',
        data: query,
    });
}

export const DelFee = (query) => {
    return Service({
        url: 'fee/delete',
        method: 'delete',
        params: query,
    });
}