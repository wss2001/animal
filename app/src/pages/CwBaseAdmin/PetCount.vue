<template>
<div>
    <el-row>
        <el-col
        :span="5"
        v-for="(item, index) in cwInfo"
        :key="item._id"
        :offset="index > 0 ? 3 : 0"
        >
        <el-card :body-style="{ width: '200px' }">
            <img
            :src="item.img"
            class="image"
            style="height: 200px; width: 223px"
            />
            <div style="padding: 14px">
            <span>{{ item.name }}</span><el-button @click="remove(item._id,item.cwBase)"><i class="el-icon-delete"></i>删除</el-button>
            <el-button>{{item.state?'已领养':'为领养'}}</el-button>
            <div class="bottom clearfix">
                <time class="time">{{ item.intro }}</time>
            </div>
            </div>
        </el-card>
        </el-col>
    </el-row>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>删除失败</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible2"
      width="30%"
      :before-close="handleClose">
      <span>删除成功</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
      </span>
    </el-dialog>
</div>
</template>
<script>
import { mapState } from "vuex";
import axios from 'axios'
export default {
  name: "PetCount",
  computed: {
      ...mapState({
        cw:state=>state.cwBase.cwBaseUserInfo[0].cwArr
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
      cwInfo:[],
      dialogVisible:false,
      dialogVisible2:false
    };
  },
  methods: {
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    remove(id,base){
      // console.log(id);
      axios.post('http://localhost:8080/api/removePet',{id,base}).then(value=>{
        console.log(value);
        this.dialogVisible2 = true
      }).catch(reason=>{
        console.log(reason);
        this.dialogVisible = true
      })
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

