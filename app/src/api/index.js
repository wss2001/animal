// 引入axios封装文件
import requests from './request'
// 查询宠物基地请求
export const reqGetCwBase=()=>{
    return requests({url:'/getCwBase',method:'GET'})
}
export const reqGetCw=(_id)=>{
    return requests({url:`/getCwBaseInfo?_id=${_id}`,method:'GET',})
}
export const reqGetCwInfo=(id)=>{
    return requests({url:`/getCwInfo?id=${id}`,method:'GET'})
}
export const reqGetUserInfo=(id)=>{
    return requests({url:`/getUserInfo?id=${id}`,method:'GET'})
}
// 用户注册接口
export const reqUserRegister=(form)=>{
    return requests({url:`/userRegister`,method:'POST',data:{form:form}})
}
// 提交评论接口
export const reqSubmitComment=(id)=>{
    return requests({url:`/getUserInfo?id=${id}`,method:'POST'})
}
// 获取评论接口getComment
export const reqGetComment=()=>{
    return requests({url:`/getComment`,method:'POST'})
}
