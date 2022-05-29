<template>
  <el-row>
    <el-col
      :span="5"
      v-for="(o, index) in 3"
      :key="o"
      :offset="index > 0 ? 3 : 0"
    >
      <el-card :body-style="{ padding: '0px' }">
        <img src="../../../public/images/cw1.jpg" class="image" />
        <div style="padding: 10px">
          <span>爱心证书</span>
          <div class="bottom clearfix">
            <time class="time">{{ currentDate }}</time>
            <!-- <el-button type="text" class="button" @click="doButton"
              >操作按钮</el-button
            > -->
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date(),
    };
  },
  //   methods: {
  //     doButton() {
  //       alert("你好啊！");
  //     },
  //   },
};
</script>
<style scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>

