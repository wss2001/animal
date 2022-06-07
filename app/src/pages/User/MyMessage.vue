<template>
<div>
            <div class="r-content">
            <el-dropdown trigger="click" szie="mini">
                <span>
                    <img :src="tx">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item><el-button type="danger" @click="fail" plain>退出</el-button></el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <span>生成头像</span>
        <el-upload
            class="avatar-uploader"
            action="http://localhost:8080/api/addjpg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
        >
            <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

    

    <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    >
        <el-form ref="form" :model="form" label-width="80px" v-if="form.delivery">
        <el-form-item label="用户昵称">
        <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="电话号">
        <el-input v-model.number="form.number"></el-input>
        </el-form-item>
        <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
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
    </el-dialog>
    
        <el-button type="text" @click="dialogVisible = true">点击修改基本信息</el-button>
        
        <el-descriptions title="用户信息">
    <el-descriptions-item label="用户名">{{people.username}}</el-descriptions-item>
    <el-descriptions-item label="手机号">{{people.phoneNumber}}</el-descriptions-item>
    <el-descriptions-item label="性别">
        <el-tag size="small">{{people.sex}}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="个人简介">{{people.desc}}</el-descriptions-item>
</el-descriptions>

    </div>
</template>
<script>
import axios from 'axios'
import { mapState } from "vuex";
export default {
  data() {
    return {
        tx:'',
        form: {
            name: "",
            delivery: true,
            sex: '',
            desc: "",
            imageUrl: "",
            },
            dialogVisible:false,
            dialogVisible2:false
        };
    },
    computed: {
        ...mapState({
        peopleId:state=>state.cwBase.userInfo[0]._id,
        peopleInfo:state=>state.cwBase.userInfo[0].info ,
        people:state=>state.cwBase.userInfo[0]
        })
    },
    mounted() {
        
    },
    methods: {
        onSubmit() {
            axios.post('http://localhost:8080/api/userwan',{id:this.peopleId,form:this.form}).then(value=>{
            console.log(value);
            if(value.data == 'ok'){
                this.dialogVisible2 = true
            }
            this.dialogVisible = false
        }).catch(reason=>{
            console.log(reason);
        })
        },
        handleAvatarSuccess(res, file) {
            this.form.imageUrl = res.data.url;
            this.tx = res.data.url
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
        // 退出登录
        fail(){
            var date = new Date(); 
            date.setTime(date.getTime() - 10000); 
            document.cookie = 'userToken' + "=a; expires=" + date.toGMTString();
            this.$router.push({name:'userLogin'})
            console.log(document.cookie);
        }
    },
};
</script>
<style  scoped>
.r-content{
    float: right;
    margin-right: 50px;
}
.r-content img{
    width: 50px;
    height: 50px ;
    border-radius: 50%;
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