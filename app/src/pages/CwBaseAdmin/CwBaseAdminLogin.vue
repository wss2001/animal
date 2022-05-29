<template>
    <div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="手机号" prop="phoneNumber">
            <el-input v-model.number="ruleForm.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
    
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        >
            <p>账号密码输入错误请重新输入</p>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="FindPass">找回密码</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'CwBaseAdminLogin',
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入密码'));
            } else {
            if (this.ruleForm.checkPass !== '') {
                this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
            }
        };
        var regExp = new RegExp("^1[35678]\\d{9}$")
        var checkPhoneNumber = (rule, value, callback) => {
            if (!value) {
            return callback(new Error('用户手机号不能为空不能为空'));
            }else if(!regExp.test(value)){
                return callback(new Error('用户手机号格式不对'));
            }
            else {
                callback();
                }
        };
        return {
            ruleForm: {
            pass: '',
            phoneNumber:''
            },
            rules: {
            pass: [
                { validator: validatePass, trigger: 'blur' }
            ],
            phoneNumber: [
                { validator: checkPhoneNumber, trigger: 'blur' }
            ]
            },
            dialogVisible:false
        };
        },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                console.log(this.ruleForm);
                let phoneNumber = this.ruleForm.phoneNumber
                let password = this.ruleForm.pass
                axios.post('http://localhost:8081/api/cwBaseAdminLogin',{
                    phoneNumber,
                    password
                }).then(value=>{
                    console.log(value);
                    if(value.status==200){
                        this.$router.push({name:'cwUser',query:{id:value.data._id}})
                    }
                }).catch(reason=>{
                    this.dialogVisible = true
                    console.log(reason);
                })
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        FindPass(){
            this.dialogVisible = false
        }
    }
}
</script>

<style>

</style>