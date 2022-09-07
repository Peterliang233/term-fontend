import {message} from 'antd';

export const SuccessMessage = (msg) => {
    message.success(msg);
}

export const WarnMessage = (msg) =>{
    message.warning(msg);

}

export const ErrorMessage = (error) => {
    if (error.response.data === undefined || error.response.data === null) {
        message.error("系统错误")
    }else{
        message.error(error.response.data.message);
    }
}

export const TransResidentData = (data) => {
    let newData = []
    data.forEach(function (val, _) {
        newData.push({
            key: val.id,
            name: val.name,
            phone: val.phone,
            address: val.address,
            enterTime: val.enterTime
        })
    })

    return newData
}

export const TransComplaintData = (data) => {
    let newData = []

    data.forEach(function (val, _) {
        newData.push({
            key: val.id,
            name: val.name,
            phone: val.phone,
            detail: val.detail,
            status: val.status,
        })
    })

    return newData
}