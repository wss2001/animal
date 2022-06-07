import {reqGetCwBase,reqGetUserInfo,reqGetCwBaseUserInfo,reqGetMoney} from '@/api'
const state = {
    cwBase:[],
    userInfo:[],
    cwBaseUserInfo:[],
    money:0
}
const getters = {

}
const actions = {
    async getCwBase(context,value){
        let result = await reqGetCwBase()
        // console.log(result);
        context.commit('GETCWBASE',result)
    },
    async getUserInfo(context,value){
        let result = await reqGetUserInfo(value) || []
        // console.log(result);
        context.commit('GETUSERINFO',result)
    },
    async getCwBaseUserInfo(context,value){
        let result = await reqGetCwBaseUserInfo(value) || []
        // console.log(result);
        context.commit('GETCWBASEUSERINFO',result)
    },
    async getMoney(context,value){
        let result = await reqGetMoney(value) || []
        // console.log(result);
        context.commit('GETMONEY',result)
    }
}
const mutations = {
    GETCWBASE(state,value){
        state.cwBase = value
    },
    GETUSERINFO(state,value){
        state.userInfo = value
    },
    GETCWBASEUSERINFO(state,value){
        state.cwBaseUserInfo = value
    },
    GETMONEY(state,value){
        state.money = value
    },
}
export default{
    state,
    getters,
    actions,
    mutations
}