<template>
<div>
  <el-form ref="form" :model="form" label-width="80px" v-show="display">
    <el-form-item>
      <el-upload
        action="http://localhost:8080/api/addjpg"
        list-type="picture-card"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="宠物姓名">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="宠物简介">
      <el-input type="textarea" v-model="form.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addPet">立即创建</el-button>
      <el-button @click="cancleSubmit">取消</el-button>
    </el-form-item>
  </el-form>

  <el-dialog 
        title="提示"
        :visible.sync="dialogTz"
        width="30%">
    <el-result icon="success" title="成功提示" subTitle="请根据提示进行操作">
      <template slot="extra">
        <el-button type="primary" size="medium" @click="dialogTz = false">返回</el-button>
      </template>
    </el-result>
  </el-dialog>

  <el-dialog
      title="提示"
      :visible.sync="dialogVisible2"
      width="30%">
      <span>新增成功</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import { mapState } from "vuex";
import { reqAddPet } from "@/api/index";
export default {
  name: "AddPet",
  data() {
    return {
      count: 0,
      display: true,
      imageUrl: "",
      imgSrc: "",
      dialogImageUrl: "",
      dialogVisible: false,
      dialogVisible2:false,
      dialogTz:false,
      form: {
        name: "",
        desc: "",
      },
    };
  },
  computed: {
    ...mapState({
      cwBaseUser:state=>state.cwBase.cwBaseUserInfo[0]
    })
  },
  methods: {
    cancleSubmit() {
      this.form.name = ''
      this.form.desc = ''
    },
    handleAvatarSuccess(res, file) {
        this.dialogImageUrl = res.data.url;
    },
    beforeAvatarUpload(file) {
        // console.log(file);
    const isJPG = file.type === "image/jpeg";
    const isLt2M = file.size / 1024 / 1024 < 10;
    // if (!isJPG) {
    //     this.$message.error("上传头像图片只能是 JPG 格式!");
    // }
    if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 10MB!");
    }
    return true
    },
    addPet(){
      let name = this.form.name
      let intro = this.form.desc
      let base = this.cwBaseUser.base
      let img = this.dialogImageUrl
      console.log(img);
      reqAddPet(name,intro,img,base).then(value=>{
        console.log(value);
        // if(value.data =='ok'){

        // }
        this.dialogTz = true
        this.form.name = ''
        this.form.desc = ''
      }).catch(reason=>{
        console.log(reason);
      })

    },
  },
};
</script>
