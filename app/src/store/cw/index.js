import {reqGetCw} from '@/api'
import {reqGetCwInfo} from '@/api'
const state = {
    cwList:[],
    cw:[]
}
const getters = {

}
const actions = {
    async getCwList(context,value){
        let result = await reqGetCw(value) || []
        context.commit('GETCWLIST',result)
    },
    async getCw(context,value){
        let result = await reqGetCwInfo(value) || []
        context.commit('GETCW',result)
    }
}
const mutations = {
    GETCWLIST(state,value){
        state.cwList = value
    },
    GETCW(state,value){
        state.cw = value
    },
}
export default{
    state,
    getters,
    actions,
    mutations
}