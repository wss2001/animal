<template>
    <div>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="账号">
        <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
        <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="login">立即创建</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'AdminLogin',
    data() {
        return {
            form:{
                name:'',
                password:''
            }
        }
    },
    methods: {
        login(){
            let {name,password} = this.form
            axios.post('http://localhost:8080/api/getadmin',{name,password}).then(value=>{
                console.log(value);
                this.$router.push({name:'admin',query:{id:value.data._id}})
            }).catch(reason=>{
                console.log(reason);
            })
            
            // 
        }
    },
}
</script>

<style>

</style>