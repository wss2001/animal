<template>
    <div class="banxin">
        <div>
        <div class="gg" v-show="this.show">
            <div>我是广告猫粮狗粮，宠物医生，我是广告猫粮狗粮，宠物医生，我是广告猫粮狗粮，宠物医生我是广告猫粮狗粮，宠物医生我是广告猫粮狗粮，宠物医生</div>
            <div @click="guanbi" class="guanbi">X</div>
        </div>
        <!-- <div class="demo-image__lazy">
        <el-image v-for="url in urls" :key="url" :src="url" lazy></el-image>
        </div> -->
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

        <el-dialog
        title="提示"
        :visible.sync="dialogSy"
        width="30%"
        >
            支付二维码
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogSy = false">取 消</el-button>
            <el-button type="primary" @click="sureSy(cwInfo._id)">确 定</el-button>
        </span>
        </el-dialog>

        <el-dialog
        title="提示"
        :visible.sync="dialogTz"
        width="30%"
        >
            <span>您还未登录,请跳转到登录页面</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogTz = false">取 消</el-button>
            <el-button type="primary" @click="TzLogin">跳转到登录页面</el-button>
        </span>
        </el-dialog>
        </div>
            <CC></CC>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
import { reqAdopt } from "@/api/index";
import CC from './CC.vue'
export default {
    name:'CwInfo',
    components:{CC},
    data() {
        return {
            urls: [
          'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
          'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
          'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
          'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
          'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
          'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
          'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
        ],
            srcList: [],
            formLabelWidth: '120px',
            show:true,
            dialogVisible: false,
            dialogFormVisible:false,
            dialogSy:false,
            dialogTz:false,
            user:'',
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
            this.srcList.push(this.cwInfo.img)
            let arr = this.cwInfo.imgList ||[]
            for(let i=0;i<arr.length;i++){
                this.srcList.push(arr[i])
            }
            console.log(this.srcList);
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
            axios.post('http://localhost:8080/api/addFood',{
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
            console.log(id);
            // console.log(document.cookie);
            if(document.cookie.includes('userToken')){
                let myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)userToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                this.user = myCookie
                this.dialogSy = true
                // console.log('用户登录');
            }else{
                this.dialogTz = true
            }
        },
        sureSy(cwId){
            reqAdopt(cwId,this.user).then(value=>{
                console.log(value);
            }).catch(reason=>{
                console.log(reason);
            })
            
            this.dialogSy = false
        },
        TzLogin(){
            this.$router.push({name:'userLogin'})
        }
    },
}
</script>

<style scoped>
.demo-image__lazy{
    overflow: auto;
    height: 300px;
    width: 300px;
}
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
    /* el-image{
        width: 100%;
        height: 250px;
    } */
    .left{
        height: 300px;
    }
    .right p{
        font-size: 16px;
    }
</style>