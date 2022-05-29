import Vue from 'vue'
import Vuex from 'vuex'
import cwBase from './cwBase'
import cw from './cw'
Vue.use(Vuex)
export default new Vuex.Store({
    modules:{
        cwBase,
        cw
    }
})