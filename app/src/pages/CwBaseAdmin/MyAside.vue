<template>
<div>
    <el-row class="tac">
        <el-col>
        <h1>管理员系统</h1>
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
            name: "LoginMessage",
            label: "个人信息",
            url: "message/LoginMessage",
            icon: "user",
            },
            {
            path: "/count",
            name: "PetCount",
            label: "基地宠物数量",
            url: "count/PetCount.vue",
            icon: "chicken",
            },
            {
            path: "/add",
            name: "AddPet",
            label: "新增基地宠物",
            url: "add/addPet.vue",
            icon: "tickets",
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