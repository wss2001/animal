<template>
<div>
  <el-container>
    <el-aside width="150px">
      <my-aside></my-aside>
    </el-aside>
    <el-main>
      <my-home></my-home>
    </el-main>
  </el-container>
  </div>
</template>

<script>
import MyAside from "./MyAside.vue";
import MyHome from "./MyHome.vue";
export default {
    name:'MyMain',
    components: { MyAside, MyHome },
    mounted() {
        this.$store.dispatch('getUserInfo',this.$route.query._id)
    },
};
</script>

<style scoped>
el-aside {
  background-color: #545c64;
}
</style>