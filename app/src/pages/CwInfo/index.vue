<template>
    <div class="banxin">
        <div class="gg" v-show="this.show">
            <div>我是广告猫粮狗粮，宠物医生，我是广告猫粮狗粮，宠物医生，我是广告猫粮狗粮，宠物医生我是广告猫粮狗粮，宠物医生我是广告猫粮狗粮，宠物医生</div>
            <div @click="guanbi" class="guanbi">X</div>
        </div>
        <div class="info" >
            
            <div class="img left">
                <el-popover
            placement="left"
            :title="cwInfo.name"
            trigger="hover"
            :content="`这是${this.cwInfo.name},${this.cwInfo.state?'已被收养':'还未被人收养，它很可爱是吧，不忍心它挨饿吧'}`">
                <el-image 
                    slot="reference"
                    :src="cwInfo.img" 
                    :preview-src-list="srcList">
                </el-image>
                </el-popover>
            </div>
            <div class="right">
                <p>宠物名称: <el-button type="warning">{{cwInfo.name}}</el-button></p>
                <p>宠物简介: <el-button type="primary">{{cwInfo.intro}}</el-button></p>
                <p>宠物剩余食物: <el-button @click="addFood(cwInfo.state)" type="warning">{{cwInfo.alsoFood}}</el-button><i class="el-icon-chicken"></i></p>
                <el-button v-if="!cwInfo.state" @click="shouyang(cwInfo._id)">收养它</el-button>
            </div>
        </div>
        <el-button type="primary" @click="addFood(cwInfo.state)">是否为他增加粮食</el-button>
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        >
            <p>{{cwInfo.name}}已经被领养了，确定不再看看别的宠物么</p>
        <span slot="footer" class="dialog-footer">
            <el-button @click="closeAdd">换一个别的宠物看看</el-button>
            <el-button type="primary" @click="sureAdd">还是打算给他口粮</el-button>
        </span>
        </el-dialog>
        

        <el-dialog title="为小动物增加食物" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <div class="block">
            <span class="demonstration">奢侈点直接给它拉到100</span>
            <el-slider v-model="form.food"></el-slider>
        </div>
            <el-form-item label="添加多少食物" :label-width="formLabelWidth">
            <el-input v-model="form.food" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addedFood">确 定</el-button>
        </div>
        </el-dialog>
        
    </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
export default {
    name:'CwInfo',
    data() {
        return {
            srcList: [],
            formLabelWidth: '120px',
            show:true,
            dialogVisible: false,
            dialogFormVisible:false,
            form:{
                food:0
            }
        }
    },
    computed: {
        ...mapState({
            cwInfo:state=>state.cw.cw[0] || {}
        })
    },
    created() {
        this.$store.dispatch('getCw',this.$route.query.id)
    },
    mounted() {
        this.$nextTick(()=>{
                    this.srcList.push(this.cwInfo.img)
                    let arr = this.cwInfo.imgList ||[]
                    for(let i=0;i<arr.length;i++){
                        this.srcList.push(arr[i])
                    }
                    console.log(this.srcList);
                })
            
        
    },
    
    methods: {
        guanbi(){
            this.show = false
        },
        addFood(state){
            if(state){
                this.dialogVisible=true
            }else{
                this.dialogFormVisible = true
            }
        },
        closeAdd(){
            this.dialogVisible=false
        },
        sureAdd(){
            this.dialogVisible=false
            this.dialogFormVisible = true
        },
        addedFood(){
            this.dialogFormVisible = false
            let food = this.form.food
            let id = this.cwInfo._id
            console.log(food,id);
            axios.post('http://localhost:8081/api/addFood',{
                id:id,
                food:food
            }).then(value=>{
                if(value.data=='ok'){
                    console.log(value);
                    this.$store.dispatch('getCw',this.$route.query.id)
                }
            }).catch(reason=>{
                console.log(reason);
            })
        },
        shouyang(id){

        }
    },
}
</script>

<style scoped>
    i{
        font-size: 23px;
    }
    button{
        font-size: 14px;
        background-color: rgba(0, 0, rgb(219, 219, 233), 0.1);
    }
    .gg{
        width: 150px;
        height: 350px;
        background-color: aquamarine;
        position: fixed;
        top: 200px;
        right: 0;
    }
    .guanbi{
        cursor: pointer;
        font-size: 30px;
        position: absolute;
        right: 0;
        top: 0;
    }
    .info{
        width: 900px;
        display: grid;
        grid-template-columns: 1.5fr 2fr;
        overflow: hidden;
    }
    el-image{
        width: 100%;
        height: 250px;
    }
    .left{
        height: 300px;
    }
    .right p{
        font-size: 16px;
    }
</style>