// 登录接口
import Service from '../../axios/request';

export const GetComplaintList = (query) => {
    return Service({
        url: 'complaint/all',
        method: 'get',
        params: query,
    });
}

export const UpdateComplaint = (query) => {
    return Service({
        url: 'complaint/renew',
        method: 'put',
        data: query,
    });
}
export const AddComplaint = (query) => {
    return Service({
        url: 'complaint/add',
        method: 'post',
        data: query,
    });
}

export const DelComplaint = (query) => {
    return Service({
        url: 'complaint/delete',
        method: 'delete',
        params: query,
    });
}