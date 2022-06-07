<template>

    <div class="banxin">

        <div>
            <ul class="cwBaseLi">
            <li v-for="item in cwArr" :key="item._id" @click="goCwInfo(item._id)">
                <p v-if="item.state" class="lingyangzhe">领养者：{{item.lovePeople}}</p>
                <div class="img">
                    <img :src="item.img" alt="">
                    </div>
                    <div class="intro">
                        <p>宠物名称：<span>{{item.name}}</span></p>
                        <p>{{item.state?'已领养':'未领养'}}</p>
                        <p>剩余口粮<span>{{item.alsoFood}}</span>天</p>
                    </div>
            </li>
        </ul>
        </div>
        <!-- 评价模块 -->
        <div class="comment">
            <!-- 评论展示 -->
            <el-row :gutter="12">
                <el-card shadow="always" v-for="item in comment" :key="item._id">
                <span>评论内容：{{item.content}}</span>
                <el-divider content-position="left">{{item.date}}</el-divider>
                <el-divider content-position="right">留言者：{{item.name}}</el-divider>
                </el-card>
                
            </el-row>
            <!-- 发表评论 -->
        <el-row>
            <el-card :body-style="{ backgroundColor: '#f9ce6a' }" shadow="hover">
                <h2>请输入你对该基地的评论</h2>
        <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="评论内容">
            <el-input v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item label="评论人名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="warning" @click="onSubmit">确认评论</el-button>
            <el-button @click="qx">取消</el-button>
        </el-form-item>
        </el-form>
        </el-card>
        </el-row>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import Ys from './Yonghu.vue'
import { reqGetComment,reqSubmitComment } from "@/api/index";
export default {
    name:'CwBaseInfo',
    data() {
        return {
            comment:[],
            form:{
                content:'',
                name:''
            }
        }
    },
    components:{Ys},
    mounted() {
        reqGetComment().then(value=>{
            this.comment = value
        }).catch(reason=>{
            console.log(reason);
        })
        let _id = this.$route.query._id
        this.$store.dispatch('getCwList',_id)
    },
    computed: {
        ...mapState({
            cwArr:state=>state.cw.cwList
        })
    },
    methods: {
        goCwInfo(id){
            this.$router.push({name:'cwInfo',query:{id:id}})
        },
        onSubmit(){
            let id = this.$route.query._id
            reqSubmitComment(id,this.form).then(value=>{
                if(value == 'ok'){
                    reqGetComment().then(value=>{
                        this.comment = value
                    }).catch(reason=>{
                        console.log(reason);
                    })
                }
            }).catch(reason=>{
                console.log(reason);
            })
            this.qx()
        },
        qx(){
            this.form.content = ''
            this.form.name=''
        }
    },
}
</script>

<style scoped>
.comment span{
    font-size: 16px;
}
.el-row{
    padding-bottom: 10px;
}

.lingyangzhe{
    font-size: 16px;
    position: absolute;
    top: 5px;
}
    .cwBaseLi{
        padding: 10px;
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
</style>