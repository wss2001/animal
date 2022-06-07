<template>
<div class="header">
    <el-page-header @back="goBack" :content="content">
    </el-page-header>     
    <el-tabs type="card" @tab-click="handleClick">
    <el-tab-pane label="用户注册" name="first" @click="goUserRegister"></el-tab-pane>
    <!-- <el-tab-pane label="后台管理" name="second" @click="goAdminLogin"></el-tab-pane> -->
    <el-tab-pane label="基地管理登录" name="third" @click="goBaseUser"></el-tab-pane>
    <el-tab-pane label="用户登录" name="fourth" @click="goUserLogin"></el-tab-pane>
    <el-tab-pane label="首页" name="five" @click="goHome"></el-tab-pane>
    </el-tabs>
    <div class="s">
    <el-tooltip :content="`Switch value: ${theme?'白天模式':'黑夜模式'}`" placement="top">
    <el-switch
        style="display: block"
        v-model="theme"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="Light"
        inactive-text="Dark">
    </el-switch>
    </el-tooltip>
    </div>
</div>
</template>

<script>
export default {
    name:'Header',
    data() {
        return {
            theme:true
        }
    },
    methods: {
        goBack() {
            this.$router.back()
        },      
        handleClick(tab, event) {
            if(tab.name=='first'){
                this.goUserRegister()
            }
            if(tab.name=='second'){
                this.goAdminLogin()
            }
            if(tab.name=='third'){
                this.goBaseUser()
            }
            if(tab.name=='fourth'){
                this.goUserLogin()
            }
            if(tab.name=='five'){
                this.goHome()
            }
        },
        goHome(){
            this.$router.push({name:'home'})
        },
        goUserRegister(){
            this.$router.push({name:'userRegister'})
        },
        goAdminLogin(){
            this.$router.push({name:'adminLogin'})
        },
        goBaseUser(){
            this.$router.push({name:'cwBaseAdminLogin'})
        },
        goUserLogin(){
            this.$router.push({name:'userLogin'})
        },
    },
    computed: {
        content(){
            return this.$route.meta.content
        }
    },
    watch: {
        theme:{
            handler(){
                this.$emit('changeTheme',this.theme)
            }
        }
    },
}
</script>

<style scoped>
    .header{
        position: relative;
        margin: 10px;
    }
    .s{
        top: 30px;
        right: 30px;
        position: absolute;
    }
</style>