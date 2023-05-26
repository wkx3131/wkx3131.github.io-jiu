<template>
  <div id="app">
    <el-tooltip
      class="item"
      effect="dark"
      :enterable="false"
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
          placeholder="查询标题/标签  或作者名"
          v-model="label"
          clearable
        >
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit" icon="el-icon-search"
          >查找</el-button
        >
      </el-form-item>
      <el-switch v-model="swi" active-text="特殊" inactive-text="常规">
      </el-switch
      ><br />
      <el-tooltip
        effect="dark"
        content="如果图片加载失败较多请开启懒加载"
        placement="right"
        :enterable="false"
      >
        <el-checkbox v-model="lazy" border size="mini">懒加载</el-checkbox>
      </el-tooltip>
      <el-checkbox
        v-model="r18"
        true-label="R-18"
        false-label="wkx"
        border
        size="mini"
        >健康模式</el-checkbox
      >
      <!-- <el-checkbox v-model="jinak" @change="rr18" border size="small"
        >健康模式</el-checkbox
      > -->
    </el-form>
    <!--  -->
    <el-button type="text" :icon="icon" @click="xiaz()">高级搜索</el-button
    ><br />
    <transition name="el-zoom-in-top">
      <div v-show="iconb" class="gaojidiv">
        <el-tag
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          class="tag-cs"
          :disable-transitions="true"
          @close="handleClose(tag)"
          @click="danjiClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput"
          >添加搜索关键字</el-button
        >
        <p>
          <el-button
            type="primary"
            @click="xinSubmit"
            icon="el-icon-search"
            class="button-new-tag"
            >高级搜索</el-button
          >&emsp;
          <el-checkbox v-model="yange">严格模式</el-checkbox>
        </p>
      </div>
    </transition>

    <!-- 卡片 -->
    <transition-group name="el-fade-in-linear" v-if="zongz">
      <el-card
        class="box-card"
        v-for="(value, index) in data"
        :key="value.pid"
        v-show="imgshow"
      >
        <div slot="header">
          <span>{{ index }}&emsp;{{ value.title }}</span>
        </div>
        <table v-if="!value.tags.includes(r18)">
          <tr>
            <td class="informa">
              <b @click="author = value.author_uid">
                作者：{{ value.author }}<br />作者id：{{ value.author_uid
                }}<br />作品id：{{ value.pid }}</b
              >
            </td>
            <td rowspan="2" class="imginde">
              <!-- <img src="../json/合理.png" /> -->
              <!-- <img
                  v-lazy="value.url"
                  height="300px"
                  onerror="../json/合理.png"
                /> -->
              <!-- :src="require('@/json/合理.png')" -->
              <el-image
                :src="value.url"
                :preview-src-list="[value.url]"
                :lazy="lazy"
                fit="scale-down"
              >
                <div slot="error" class="image-slot">
                  <p></p>
                  <i
                    class="el-icon-picture-outline"
                    style="font-size: 30px"
                  ></i>
                  <p>
                    图片加载失败,可能是图片不存在或服务器加载负荷,<wbr />你可以尝试手动加载
                  </p>
                  <p>
                    <a :href="value.url" target="_blank">{{ value.url }}</a>
                  </p>
                </div>
              </el-image>
            </td>
          </tr>
          <tr>
            <td class="tags">
              <el-tag
                v-for="i in value.tags"
                :key="i"
                @click="txtcopy(i)"
                class="tag-cs"
                >{{ i }}</el-tag
              >
            </td>
          </tr>
        </table>
        <h2 v-else>内容已屏蔽</h2>
      </el-card>
      <div class="raico" v-show="imgshow" key="primary">
        <el-tooltip
          effect="dark"
          content="回到顶部"
          placement="left"
          :enterable="false"
        >
          <el-button
            type="primary"
            icon="el-icon-caret-top"
            circle
            @click="totop()"
          ></el-button>
        </el-tooltip>

        <el-tooltip
          effect="dark"
          content="刷新当前搜索"
          placement="left"
          :enterable="false"
        >
          <el-button
            class="en-button"
            type="primary"
            icon="el-icon-refresh"
            circle
            @click="v2(dibubianjie)"
          ></el-button>
        </el-tooltip>
        <el-tooltip
          effect="dark"
          content="重新加载当前页面"
          placement="left"
          :enterable="false"
        >
          <el-button
            class="e-button"
            type="primary"
            icon="el-icon-refresh-right"
            circle
            @click="congz()"
          ></el-button>
        </el-tooltip>
      </div>
    </transition-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      na: "",
      lazy: false,
      data: [], //图片数据
      suffix: "/v2/?num=8", //空搜索
      author: "",
      label: "",
      swi: false, //18
      imgshow: false, //卡片显示
      iconb: false, //图标判断
      icon: "el-icon-arrow-up", //高级搜索图标
      dynamicTags: ["原创"], //多关键字
      inputVisible: false, //输入框
      inputValue: "", //新值内容
      yange: false, //严格模式
      dibubianjie: "/v2/?num=10",
      zongz: true, //图片重载
      //jinak: false, //健康判断
      r18: "wkx",
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
      this.imgshow = false;
      try {
        const { data: arr } = await this.$http.get(b);
        this.imgshow = true;
        //    console.log(arr.data);
        if (Array.isArray(arr.data)) {
          this.data = arr.data;
        } else {
          this.data = [];
          this.$notify.info({
            title: "提示",
            message: "该搜索无结果",
            showClose: false,
            offset: 60,
          });
        }
      } catch (err) {
        this.$notify.error({
          title: "错误",
          message: "服务器故障，请检查",
          showClose: false,
          offset: 60,
        });
        console.log("故障代码", err);
      }
    },
    onSubmit() {
      //搜索
      if (this.author !== "") {
        this.suffix += "&author_uuid=" + this.author;
      }
      if (this.label !== "") {
        this.suffix += "&keyword=" + this.label;
      }
      if (this.swi) {
        this.suffix += "&r18=true";
      }
      this.v2(this.suffix);
      this.dibubianjie = this.suffix;
      this.suffix = "/v2/?num=10"; //恢复初始
    },
    xinSubmit() {
      //高级搜索
      let yan = this.yange ? "&tag=" : "&keyword=";
      this.dynamicTags.forEach((element) => {
        this.suffix += yan + element;
      });
      if (this.swi) {
        this.suffix += "&r18=true";
      }
      this.v2(this.suffix);
      this.dibubianjie = this.suffix;
      this.suffix = "/v2/?num=10"; //恢复初始
    },
    txtcopy(i) {
      //快捷复制

      if (this.iconb) {
        if (!this.dynamicTags.includes(i)) {
          this.dynamicTags.push(i);
        } else {
          this.$notify({
            title: "提示",
            message: "该关键字已存在",
            type: "warning",
            showClose: false,
            offset: 60,
          });
        }
      } else {
        this.label = i;
      }
    },
    xiaz() {
      //单击高级
      this.iconb = !this.iconb;
      this.icon = this.iconb ? "el-icon-arrow-down" : "el-icon-arrow-up";
    },
    // rr18() {
    //   //健康模式
    //   this.r18 = this.jinak ? "R-18" : "wkx";
    // },
    congz() {
      //重载图片
      this.zongz = false;
      setTimeout(() => {
        this.zongz = true;
      }, 500);
    },
    totop() {
      //页面滚动
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },

    //高级搜索的三个方法
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1); //关闭标签
      //在dynamicTags中查找tag对应的index，删除一个
    },
    danjiClose(tag) {
      //修改标签
      this.inputValue = tag;
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1); //关闭标签
      this.inputVisible = true;
      this.$nextTick((_) => {
        //等待dom更新完成后执行
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      //在数组中新增
      let inputValue = this.inputValue;
      if (inputValue && !this.dynamicTags.includes(inputValue)) {
        this.dynamicTags.push(inputValue);
      } else if (inputValue) {
        this.$notify({
          title: "提示",
          message: "该关键字已存在",
          type: "warning",
          showClose: false,
          offset: 60,
        });
      }
      this.inputVisible = false;
      this.inputValue = "";
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
.raico {
  width: 100px;
  position: fixed;
  right: 0;
  bottom: 10px;
}
.tag-cs {
  margin-right: 8px;
  margin-top: 6px;
  cursor: alias;
}
.tag-cs:active {
  background-color: #ccc;
}
.gaojidiv {
  margin-bottom: 20px;
}
.en-button {
  position: absolute;
  z-index: 2;
}
.en-button:hover + .e-button {
  top: -40px;
  opacity: 1;
}
.e-button:hover {
  top: -40px;
  opacity: 1;
}
.e-button {
  transition: all 0.3s linear;
  transition-delay: 0.5s;
  position: absolute;
  z-index: 1;
  right: 10px;
  top: 0;
  opacity: 0;
}
/* 高级 */
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 114px;
  height: 32px;
  margin-left: 10px;
  vertical-align: bottom;
}

.el-fade-in-linear-leave-active {
  transition: all 0.6s;
}
.el-fade-in-linear-enter-active {
  transition: all 0.4s;
}
</style>
