<template>
    <div class="banxin">
        <ul class="cwBaseLi">
            <li v-for="item in cwBase" :key="item._id" >
                <div class="img" @click="goCwBase(item._id)">
                    <img :src="item.img" alt="">
                    </div>
                    <div class="intro">
                        <p>宠物救助者基地：<span>{{item.baseName}}</span></p>
                        <!-- <p>基地领养者：{{item.PeopleName}}</p>
                        <p>基地联系方式:{{item.phoneNumber}}</p>
                        <p>基地地址：{{item.address}}</p> -->
                        <p>剩余<el-button type="danger " size="small" round>{{item.notUse}}</el-button>只待收养</p>
                    </div>
            </li>
        </ul>
        <Foots></Foots>
        <Foot></Foot>
    </div>
    
</template>

<script>
import {mapState} from 'vuex'
import Foot from '@/components/Foot.vue'
import Foots from '@/components/Foots.vue'
export default {
    name:'Home',
    components:{Foot,Foots},
    computed: {
        ...mapState({
            cwBase:state=>state.cwBase.cwBase
        })
    },
    methods: {
        goCwBase(id){
            console.log(id);
            this.$router.push({name:'cwBaseInfo',query:{_id:id}})
        }
    },
}
</script>

<style scoped>
    .cwBaseLi{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
    li{
        margin-bottom: 15px;
        position: relative;
    }
    .img{
        width: 250px;
        height: 250px;
    }
    img{
        cursor: pointer;
        width: 250px;
        height: 250px;
    }
    .intro{
        width: 250px;
        position: absolute;
        background-color: rgba(255, 255, 255, 0.3);
        bottom: 0;
    }
    .intro p {
        font-size: 18px;
        margin-top: 5px;
    }
    .intro p span{
        color: brown;
    }
    el-button{
        opacity: 0.5;
    }
</style>