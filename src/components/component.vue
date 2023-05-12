<template>
  <div id="app">
    <!-- <child message="hello!"></child> -->

    <el-tooltip
      class="item"
      effect="dark"
      content="点击刷新小知识"
      placement="bottom"
    >
      <p @click="axi()">生活小知识：{{ na }}</p></el-tooltip
    >
    <!-- 条件 -->
    <el-form :inline="true">
      <el-form-item>
        <el-input placeholder="查询作者id" v-model="author" clearable>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-input
          placeholder="查询内容或作者名"
          v-model="label"
          clearable
          ref="intxt"
        >
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">查找</el-button>
      </el-form-item>
      <el-switch v-model="swi" active-text="特殊" inactive-text="常规">
      </el-switch>
    </el-form>

    <!-- 卡片 -->
    <transition-group name="el-fade-in-linear">
      <el-card
        class="box-card"
        v-for="value in data"
        :key="value.pid"
        v-show="imgshow"
      >
        <div slot="header">
          <span>{{ value.title }}</span>
        </div>
        <table>
          <tr>
            <td class="informa">
              <b>
                作者：{{ value.author }}<br />作者id：{{ value.author_uid
                }}<br />作品id：{{ value.pid }}</b
              >
            </td>
            <td rowspan="2" class="imginde">
              <!-- <img src="../json/合理.png"> -->
              <!-- <img
                  v-lazy="value.url"
                  height="300px"
                  onerror="../json/合理.png"
                /> -->
              <el-image
                :src="value.url"
                :preview-src-list="[value.url]"
                lazy
                :fit="scale - down"
              >
                <!-- <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div> -->
              </el-image>
            </td>
          </tr>
          <tr>
            <td class="tags">
              <el-tag
                v-for="i in value.tags"
                :key="i.tag"
                @click="txtcopy(i)"
                >{{ i }}</el-tag
              >
            </td>
          </tr>
        </table>
      </el-card>
      <el-tooltip
        effect="dark"
        content="回到顶部"
        placement="right"
        v-show="imgshow"
        key="primary"
      >
        <el-button
          type="primary"
          icon="el-icon-caret-top"
          circle
          @click="totop()"
        ></el-button>
      </el-tooltip>
    </transition-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      na: "",
      data: [],
      suffix: "/v2/?num=10",
      author: "",
      label: "",
      swi: false,
      imgshow: false,
    };
  },
  created() {
    this.axi();
    this.v2(this.suffix);
  },
  methods: {
    async axi() {
      const { data: shuju } = await this.$http.get("/api/dm-qiaomen");
      //    console.log(shuju);
      this.na = shuju.data.content;
    },
    async v2(b) {
      const { data: arr } = await this.$http.get(b);
      this.imgshow = true;
      //    console.log(arr.data);
      this.data = arr.data;
    },
    onSubmit() {
      if (isNaN(this.author)) {
        this.suffix += "&author_uuid=" + this.author;
      }
      if (this.label !== "") {
        this.suffix += "&keyword=" + this.label;
      }
      if (this.swi) {
        this.suffix += "&r18=true";
      }
      this.imgshow = false;
      this.v2(this.suffix);
      this.suffix = "/v2/?num=10"; //恢复初始
    },
    txtcopy(i) {
      this.$refs.intxt.value = i;
    },
    totop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style scoped>
#app {
  height: auto;
}
.informa {
  width: 600px;
  height: 50px;
}
.tags {
  width: 600px;
  margin: 0;
  padding: 0;
}

.imginde {
  width: 60%;
  text-align: center;
  /* margin-left: 100px;
  transform: scaleX(-50%); */
}
.el-image {
  height: 250px;
}
.box-card {
  margin-bottom: 16px;
  border-radius: 12px;
}
.el-tag {
  margin-right: 8px;
  margin-top: 6px;
}

.el-fade-in-linear-leave-active {
  transition: all 0.8s;
}
.el-fade-in-linear-enter-active {
  transition: all 0.4s;
}
</style>
