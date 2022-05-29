import {reqGetCwBase,reqGetUserInfo} from '@/api'
const state = {
    cwBase:[],
    userInfo:[]
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
    }
}
const mutations = {
    GETCWBASE(state,value){
        state.cwBase = value
    },
    GETUSERINFO(state,value){
        state.userInfo = value
    }
}
export default{
    state,
    getters,
    actions,
    mutations
}