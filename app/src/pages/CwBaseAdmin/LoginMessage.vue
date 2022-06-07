<template>
  <div>
    <div class="nav">目前收入总数为{{ money }}</div>
    <el-button type="text" @click="dialogVisible = true">点击修改基地基本信息</el-button>
   


    <el-descriptions title="基地管理员信息">
    <el-descriptions-item label="用户名">{{user.username}}</el-descriptions-item>
    <el-descriptions-item label="手机号">{{user.phoneNumber}}</el-descriptions-item>
    <el-descriptions-item label="居住地">{{user.address}}</el-descriptions-item>
    <el-descriptions-item label="备注">
      <el-tag size="small">基地</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="联系地址">{{user.address}}</el-descriptions-item>
    <el-descriptions-item label="基地名称">{{user.base}}</el-descriptions-item>
</el-descriptions>
      <el-table
      :data="cwInfo"
      height="250"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="宠物名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="lovePeople"
        label="领养者"
        width="180">
      </el-table-column>
      <el-table-column
        prop="alsoFood"
        label="剩余口粮">
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
    </el-table>


    <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">

  <el-form ref="form" :model="form" label-width="80px" v-show="display">
      <el-form-item label="基地名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="电话号">
        <el-input type="number" v-model.number="form.number"></el-input>
      </el-form-item>
      <el-form-item label="管理员姓名">
        <el-input v-model="form.loginName"> </el-input>
      </el-form-item>
      <el-form-item label="基地地址">
        <el-input  v-model="form.address"></el-input>
      </el-form-item>
    </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="change">确 定</el-button>
  </span>
</el-dialog>


  </div>
</template>
<script>
import { mapState } from "vuex";
import axios from 'axios'
export default {
  name: "LoginMessage",
  computed: {
    ...mapState({
      money:state=>state.cwBase.money,
      user:state=>state.cwBase.cwBaseUserInfo[0],
      cw:state=>state.cwBase.cwBaseUserInfo[0].cwArr
    })
  },
  data() {
    return {
      count: 0,
      cwInfo:[],
      display: true,
      dialogVisible: false,
      form: {
        name: "",
        address: "",
        loginName: "",
        number: "",
      },
    };
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
  methods: {
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    cancleSubmit() {
      this.form = "";
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    change(){
      let {name,address,loginName,number} = this.form
      // console.log(111);
      axios.post('http://localhost:8080/api/changeCwAdmin',
      {name,address,loginName,number,id:this.user._id,yphone:this.user.phoneNumber}).then(value=>{
        console.log(value);
      }).catch(reason=>{
        console.log(reason);
      })
      this.dialogVisible = false
    }
  },
};
</script>
<style  scoped>
.nav {
  margin: 10px 5px;
}
.pet {
  margin: 15px 5px;
}
.el-form-item .el-input {
  margin: 10px 5px;
  width: 70%;
}
.el-form-item .el-form-item__label .el-form-item__content {
  width: 100px;
  margin-right: 5px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>