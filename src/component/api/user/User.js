import Service from "../../axios/request";

export const RegistryReq = query => {
    return Service({
        url: '/user/registry',
        method: 'post',
        params: query,
    });
}

export const LoginReq = (query) => {
    return Service({
        url: 'user/login',
        method: 'post',
        data: query
    });
}