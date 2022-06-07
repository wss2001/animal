<template>
    <div>
        <el-radio-group v-model="labelPosition" size="small">
        <el-radio-button label="left">左对齐</el-radio-button>
        <el-radio-button label="right">右对齐</el-radio-button>
        <el-radio-button label="top">顶部对齐</el-radio-button>
        </el-radio-group>
        <div style="margin: 20px;"></div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"
        label-width="100px" class="demo-ruleForm" :label-position="labelPosition">
    <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="年龄" prop="age">
        <el-input v-model.number="ruleForm.age"></el-input>
    </el-form-item>
    <el-form-item label="手机号" prop="phoneNumber">
        <el-input v-model.number="ruleForm.phoneNumber"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
</el-form>

        <!-- 提示注册成功与否模态框 -->
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        >
            <p>该{{ruleForm.phoneNumber}}已经注册过该系统了，是否查看是否输入错手机号</p>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="FindPass">确定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
import { reqUserRegister } from "@/api/index.js";
export default {
    name:'UserRegister',
    data() {
        var checkAge = (rule, value, callback) => {
            if (!value) {
            return callback(new Error('年龄不能为空'));
            }
            setTimeout(() => {
            if (!Number.isInteger(value)) {
                callback(new Error('请输入数字值'));
            } else {
                if (value < 18) {
                callback(new Error('必须年满18岁'));
                } else {
                callback();
                }
            }
            }, 1000);
        };

        var checkUsername = (rule, value, callback) => {
            if (!value) {
            return callback(new Error('用户名不能为空'));
            }
            else {
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
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pass) {
            callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        };
        return {
            ruleForm: {
                pass: '',
                checkPass: '',
                age: '',
                username:'',
                phoneNumber:''
            },
            rules: {
            pass: [
                { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
                { validator: validatePass2, trigger: 'blur' }
            ],
            age: [
                { validator: checkAge, trigger: 'blur' }
            ],
            username: [
                { validator: checkUsername, trigger: 'blur' }
            ],
            phoneNumber: [
                { validator: checkPhoneNumber, trigger: 'blur' }
            ]
            },
            labelPosition: 'right',
            dialogVisible:false
        };
        },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
            if (valid) {
                // console.log(this.ruleForm);
                let result = await reqUserRegister(this.ruleForm)
                // console.log(result.insertedIds['0']);
                if(result){
                    this.$router.push({name:'user',query:{_id:result.insertedIds['0']}})
                }
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