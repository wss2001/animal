<template>
<div>
  <el-row class="tac">
    <el-col>
      <h1>用户系统</h1>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        text-color="black"
        active-text-color="#ffd04b"
      >
        <el-menu-item
          @click="clickChange(item)"
          v-for="item in menu"
          :key="item.path"
          :index="item.path"
        >
          <i :class="'el-icon-' + item.icon"></i>
          <span slot="title">{{ item.label }}</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
  </div>
</template>

<script>
export default {
  name: "MyAside",
  data() {
    return {
      menu: [
        {
          path: "/message",
          name: "MyMessage",
          label: "个人信息",
          url: "message/MyMessage",
          icon: "user-solid",
        },
        {
          path: "/pet",
          name: "MyPet",
          label: "喂食的宠物",
          url: "pet/MyPet.vue",
          icon: "chicken",
        },
        {
          path: "/certificate",
          name: "MyCertificate",
          label: "获得证书",
          url: "certificate/MyCertificate.vue",
          icon: "s-management",
        },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickChange(item) {
      this.$router.push({
        name: item.name,
      });
    },
  },
};
</script>

<style scoped>
.tac {
  height: 100%;
}
</style>