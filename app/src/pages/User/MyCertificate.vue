<template>
<div>
  <el-row>
    <el-col
      :span="5"
      v-for="(item, index) in cwInfo"
      :key="item._id"
      :offset="index > 0 ? 3 : 0"
    >
      <el-card :body-style="{ padding: '0px' }">
        <img src="../../../public/images/证书.png" class="image" />
        <div style="padding: 10px">
          <span>爱心证书</span>
          <div class="bottom clearfix">
            <div class="time">{{ currentDate }}</div>
            <div>该证书来自<button class="btn">{{item.cwBase}}</button> ,感谢您的救助</div>
            <div>{{username}}</div>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      currentDate: new Date(),
      cwInfo:[]
    }
  },
  computed: {
      ...mapState({
        cw:state=>state.cwBase.userInfo[0].cw,
        username:state=>state.cwBase.userInfo[0].username
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
};
</script>
<style scoped>
.btn{
  background-color: rgba(238, 181, 120, 0.5);
  color: rgb(20, 20, 20);
  width: 75px;
  height: 25px;
  padding: 2px;
  border-radius: 5px;
}
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

