<template>
<div>
    <el-form ref="form" :model="form" label-width="80px" v-show="form.delivery">
        <el-form-item
        ><el-upload
            class="avatar-uploader"
            action="http://localhost:8081/api/addjpg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
        >
            <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </el-form-item>
        <el-form-item label="用户昵称">
        <el-input v-model="form.name"></el-input>
        </el-form-item>
        <!-- <el-form-item label="电话号">
        <el-input v-model="form.number"></el-input>
        </el-form-item> -->
        <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
            <el-radio label="man">男</el-radio>
            <el-radio label="woman">女</el-radio>
        </el-radio-group>
        </el-form-item>
        <el-form-item label="个人简介">
        <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
        <el-button type="primary" @click="onSubmit">完善个人信息</el-button>
        <el-button>取消</el-button>
        </el-form-item>
    </el-form>
    <div v-show="!form.delivery">
        你的用户名为{{}}你的性别为{{}}你的个人进阶为{{}}
    </div>
    </div>
</template>
<script>
import axios from 'axios'
import { mapState } from "vuex";
export default {
  data() {
    return {
        form: {
            name: "",
            delivery: true,
            sex: '',
            desc: "",
            imageUrl: "",
            },
        };
    },
    computed: {
        ...mapState({
        peopleId:state=>state.cwBase.userInfo[0]._id
        })
    },
    methods: {
        onSubmit() {
            // console.log(this.form);
            
            axios.post('http://localhost:8081/api/userwan',{id:this.peopleId,form:this.form}).then(value=>{
            // console.log(value);
            this.form.delivery = false

        }).catch(reason=>{
            console.log(reason);
        })
        },
        handleAvatarSuccess(res, file) {
            // console.log('success');
            console.log(res,file);
            this.imageUrl = URL.createObjectURL(file.raw);
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
    },
};
</script>
<style  scoped>
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
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>