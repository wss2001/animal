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
export const reqSubmitComment=(id,form)=>{
    return requests({url:`/submitComment`,method:'POST',data:{form:form,id:id}})
}
// 获取评论接口getComment
export const reqGetComment=()=>{
    return requests({url:'/getComment',method:'GET'})
}
// 收养adopt
export const reqAdopt=(cwId,userId)=>{
    return requests({url:`/adopt`,method:'POST',data:{cwId,userId}})
}
// reqGetCwBaseUserInfo
export const reqGetCwBaseUserInfo=(id)=>{
    return requests({url:'/getCwBaseUserInfo',method:'POST',data:{id}})
}
// 新增宠物
export const reqAddPet=(name,intro,img,base)=>{
    return requests({url:'/addpet',method:'POST',data:{name,intro,img,base}})
}
// getmoney
export const reqGetMoney=(id)=>{
    return requests({url:'/getmoney',method:'POST',data:{id}})
}
