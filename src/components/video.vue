<template>
  <div id="id">
    <div class="kong">
      <div class="sou-suo-kuang" ref="kuang">
        <el-input
          placeholder=""
          v-model="content"
          clearable
          @keydown.enter.native.prevent="getvode"
          class="input-cs"
          @focus="vshow"
          @input="inann"
        >
        </el-input>
        <br />
        <el-button
          class="input-cs"
          :type="ann"
          @click="getvode"
          :loading="loading"
          >查找</el-button
        >
      </div>
    </div>
    <transition name="el-fade-in-linear">
      <el-row :gutter="20" class="vodes-box" v-show="loadingCar">
        <el-col
          :span="8"
          v-for="(value, index) in vode"
          :key="index"
          class="col-cs"
        >
          <el-card class="card-cs">
            <el-row :gutter="20">
              <el-col :span="10">
                <el-image
                  fit="scale-down"
                  :src="value.cover"
                  lazy
                  style="height: 175px"
                ></el-image
              ></el-col>
              <el-col :span="14">
                <h3>{{ value.title }}</h3>
                <span>{{ value.region }}&emsp;{{ value.videoType }}</span
                ><br />
                <span>{{ value.releaseTime }}</span
                ><br />
                <el-popover
                  placement="top-start"
                  title="很抱歉"
                  width="200"
                  trigger="hover"
                  content="暂不提供在线观看功能"
                >
                  <el-button type="success" plain slot="reference">
                    <!-- <a :href="value.videoId" target="_blank"> -->
                    播放</el-button
                  > </el-popover
                ><br />
                <el-button type="success" plain @click="tovode(value.videoId)"
                  >跳转第三方播放器页面</el-button
                >
              </el-col>
              <el-col :span="24">
                <span>{{ value.descs }}</span>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </transition>

    <el-dialog
      title="点击链接打开第三方在线播放器网址，并粘贴以下视频链接"
      :visible.sync="dialogVisible"
      width="60%"
      top="20vh"
      :close-on-click-modal="false"
    >
      <a href="http://tool.liumingye.cn/m3u8/" target="_blank"
        ><h4>播放网址</h4></a
      >
      <div v-loading="neijia">
        <h3 v-for="(i, index) in lian" :key="index">
          {{ index + 1 }}&emsp;{{ i.chapterPath }}
        </h3>
      </div>
      <p></p>
    </el-dialog>

    <el-card v-if="false">
      <span></span>
      <video
        src="https://vip.lz-cdn1.com/20220402/740_e6bc74ff/index.m3u8"
      ></video>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "",
      ann: "warning",
      loading: false,
      loadingCar: false,
      vode: [],
      lian: [],
      dialogVisible: false,
      neijia: true,
    };
  },
  methods: {
    vshow() {
      this.$refs.kuang.style.top = "300px";
      this.loadingCar = false;
      this.loading = false;
    },
    async getvode() {
      this.$refs.kuang.style.top = "110px";
      this.loading = true;
      const { data: v } = await this.$http.get(
        "/xiao/video/search/title/" + this.content + "/1/12"
      );
      this.vode = v.data;
      this.loading = false;
      this.loadingCar = true;
      this.$refs.kuang.style.top = "110px";
    },
    async tovode(id) {
      this.dialogVisible = true;
      this.neijia = true;
      const { data: vo } = await this.$http.get(
        "/xiao/videoChapter/search/" + id
      );
      this.neijia = false;
      this.lian = vo.data.chapterList;
      //   [0].chapterPath;
      //   console.log(vo);
    },
    inann(value) {
      this.ann = value ? "primary" : "warning";
    },
  },
};
</script>

<style scoped>
a {
  color: rgb(0, 64, 255); /* 设置文字颜色为黑色 */
  /* text-decoration: line-through; 添加删除线 */
  text-decoration: none; /* 取消下划线 */
}
.kong {
  position: relative;
  height: 175px;
  height: 200px;
}
.sou-suo-kuang {
  position: absolute;
  top: 300px;
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.6s;
}
.el-button {
  transition: all 0.3s;
}
.input-cs {
  width: 500px;
}

.col-cs {
  margin-top: 20px;
}
.card-cs {
  min-width: 200px;
  height: 400px;
  border-radius: 15px;
}
</style>
