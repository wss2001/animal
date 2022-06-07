<template>
<div>
    <el-row>
        <el-col
        v-show="!show"
        :span="5"
        v-for="(item, index) in cwInfo"
        :key="item._id"
        :offset="index > 0 ? 3 : 0"
        
        >
        <el-card :body-style="{ padding: '0px' }" >
            <img :src="item.img" class="image" @click="gocw(item._id)" />
            <div style="padding: 14px">
            <span>{{ item.name }}</span>
            <div class="bottom clearfix">
                <p>它来自{{item.cwBase}}</p>
                <time class="time">{{ currentDate }}</time>
                <!-- <el-button type="text" class="button">操作按钮</el-button> -->
            </div>
            </div>
        </el-card>
        </el-col>
        <el-col v-show="show">
          你还没有收养宠物哦
        </el-col>
    </el-row>
    </div>
</template>
<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
    name:'MyPet',
    computed: {
      ...mapState({
        cw:state=>state.cwBase.userInfo[0].cw
      })
    },
    mounted() {
      let cwInfo = []
      let cw = this.cw
      // console.log(this.cw);
      if(this.cw.length==0){
        this.show=true
      }else{
        this.show = false
      for(let i =0;i<this.cw.length;i++){
        console.log(cw[i]);
        axios.post('http://localhost:8080/api/getCwInfo',{id:cw[i]}).then(value=>{
          cwInfo.push(value.data[0])
          console.log(cwInfo);
          
        }).catch(reason=>{
          console.log(reason);
        })
      }
      this.cwInfo = cwInfo
      }
    },
    data() {
        return {
        currentDate: new Date(),
        show:false,
        cwInfo:[],
        };
    },
    methods: {
      gocw(id){
        console.log(11);
        this.$router.push({name:'cwInfo',query:{id:id}})
      }
    },
};
</script>
<style scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  line-height: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>

