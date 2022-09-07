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

export const TransRepairData = (data) => {
    let newData = []
    data.forEach(function (val, _) {
        newData.push({
            key: val.id,
            name: val.name,
            phone: val.phone,
            detail: val.detail,
            status: val.status,
            address: val.address,
        })
    })

    return newData
}

export const TransFeeData = (data) => {
    let newData = []
    data.forEach(function (val, _) {
        newData.push({
            key: val.id,
            name: val.name,
            phone: val.phone,
            status: val.status,
            feeType: val.feeType,
            uuid: val.uuid,
        })
    })

    return newData
}

export const TransParkingData = (data) => {
    let newData = []
    data.forEach(function (val,_){
        newData.push({
            key: val.id,
            number: val.number,
            status: val.status,
            uuid: val.uuid,
            tenant: val.tenant,
        })
    })

    return newData
}

export const TransUserData = (data)  =>{
    let newData = []

    data.forEach(function(val,_) {
        newData.push({
            key: val.id,
            username: val.username,
            password: val.password,
            uuid: val.uuid,
            type: val.type,
        })
    })

    return newData;
}