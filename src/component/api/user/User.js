import Service from "../../axios/request";

export const RegistryReq = query => {
    return Service({
        url: '/user/register',
        method: 'post',
        data: query,
    });
}

export const LoginReq = (query) => {
    return Service({
        url: 'user/login',
        method: 'post',
        data: query
    });
}

export const GetUserList = (query) => {
    return Service({
        url: '/user/all',
        method: 'get',
        params: query,
    })
}

export const UpdateUser = (query) => {
    return Service({
        url: '/user/renew',
        method: 'put',
        data: query,
    })
}

export const DelUser = (query) => {
    return Service({
        url: '/user/delete',
        method: 'delete',
        params: query,
    })
}