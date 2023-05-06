<template>
  <div id="app">
    <!-- 条件 -->
    <el-form :inline="true">
      <el-form-item>
        <el-input
          placeholder=""
          v-model="content"
          clearable
          @keydown.enter.native.prevent="book"
          autocomplete="on"
        >
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="book">查找</el-button>
      </el-form-item>
    </el-form>
    <el-radio v-model="radio" label="title">查找作品</el-radio>
    <el-radio v-model="radio" label="author">查找作者</el-radio>

    <!-- 卡片 -->
    <el-form :inline="true" class="bookform" ref="heheiRef">
      <transition-group name="el-zoom-in-center">
        <el-form-item
          v-for="(value, index) in books"
          :key="value.fictionId"
          v-show="showItems"
          :style="{ transition: 'all 0.2s ' + (index + 1) * 0.3 + 's' }"
        >
          <el-card
            style="
               {
                widht: '200px';
              }
            "
            class="bookform"
          >
            <el-image
              style="width: 160px; height: 200px"
              :src="value.cover"
              lazy
            ></el-image>
            <div class="bottom">
              <span style="width: 160px; display: inline-block"
                ><b>{{ value.title }}</b></span
              >
              <div class="bottom">
                <span class="author">{{ value.author }}</span>
                <el-button
                  type="text"
                  class="button"
                  @click="directory(value.fictionId)"
                  >打开目录</el-button
                >
              </div>
            </div>
          </el-card>
        </el-form-item>
      </transition-group>
    </el-form>

    <div>
      <!-- 目录 -->
      <transition name="el-zoom-in-center">
        <el-card
          v-show="muli"
          class="bookform"
          style="text-align: center"
          key="muli"
        >
          <el-form :inline="true">
            <el-button @click="mul()">返回文本</el-button>
            <p></p>
            <!-- 分页 -->
            <el-pagination
              background
              layout="prev, pager, next"
              :page-size="120"
              :current-page="pages"
              @current-change="packto"
              :total="this.directorys.length"
              :hide-on-single-page="true"
            >
            </el-pagination
            ><br />
            <el-form-item
              v-for="(value, index) in directorys2"
              :key="value.chapterId"
              class="textwi"
            >
              <el-button
                class="textwi"
                type="text"
                @click="text(value.chapterId, index, $event)"
                >{{ value.title }}</el-button
              >
            </el-form-item>
          </el-form>
        </el-card>
      </transition>

      <!-- 文本 -->
      <transition
        name="el-zoom-in-center"
        enter-active-class="fade-enter-active"
        leave-active-class="fade-leave-active">
        <el-card
          v-show="wenb"
          :class="caizhi"
          :style="{ backgroundColor: bgColor, color: fontColor }"
          key="wenb"
          >
          <!-- ref="carRef" 动画用-->
          <el-button @click="mul()">返回目录</el-button><span>&emsp;全文{{ fontlenght }}字</span>
          <!-- 开关 -->
          <el-switch
            class="switchsty"
            v-model="swi"
            active-icon-class="el-icon-moon"
            inactive-icon-class="el-icon-sunny"
            @change="ry()"
          >
          </el-switch>
          <!-- 材质 -->
          <el-select v-model="caizhi" placeholder="关闭材质" @change="yicaizhi()">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              
            >
            </el-option>
          </el-select>
          <div ref="txt" class="txtp">
            <p v-for="value in texts" :key="value.pid">{{ value }}</p>
          </div>
          <!-- <div v-for="t in texts" :key="t.pid" v-html="t"></div> -->
          <el-button @click="mul()">返回目录</el-button>
          <el-button @click="next()">下一页</el-button>
        </el-card>
      </transition>
      <!-- 字号 -->
      <div class="vertical-slider" v-show="wenb">
        <span style="font-size: 14px; padding-left: 4px">字号</span>
        <el-slider
          v-model="fontSize"
          vertical
          :step="2"
          :min="14"
          :max="20"
          show-stops
          @change="updateFontSize"
        >
        </el-slider>
      </div>
    </div>
  </div>
</template>

<script>
// import { gsap } from 'gsap';
export default {
  data() {
    return {
      books: [],//获取的书
      radio: "title",//查找方式
      content: "",//查找内容
      directorys: [],//原始目录
      directorys2: [],//修改后目录
      texts: [],//小说内容
      muli: false, //目录，显示
      wenb: true, //文本，显示
      p: 0,//当前章节序号
      nextid: "",//下一章id
      swi: false, //黑白控制
      bgColor: "#fff",
      fontColor: "#000",
      showItems: false, //书，显示
      fontSize: 18,//字体大小
      pages: 1, //当前页数
      caizhi: "bookform beijing",//当前材质
      options: [
        { value: "bookform beijing", label: "关闭材质" },
        {
          value: "bookform beijingb",
          label: "褶皱白纸",
        },
        {
          value: "bookform beijingh",
          label: "黑色格调",
        },
        {
          value: "bookform beijingg",
          label: "泛黄书页",
        },
      ] //材质选项
    };
  },
  mounted() {
    //加载完成时
    // 绑定监听器
    document.addEventListener("keydown", this.handleKeyDown);
  },
  beforeDestroy() {
    // 移除监听器，防止溢出到其他页面
    document.removeEventListener("keydown", this.handleKeyDown);
  },
  computed: {
    //计算
    // cardIndex() {
    //   return this.books.map((value, index) => index);
    // },
    fontlenght() {//计算字符数
      var chineseCharCount = 0;
      this.texts.forEach(function (ass) {
        chineseCharCount += ass.length;
      });
      return chineseCharCount;
    },
  },
  methods: {
    async book() {
      //获取书
      let loading = this.$loading({
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.8)",
      });
      this.showItems = false;
      this.wenb = false;
      this.muli = false;
      const { data: book } = await this.$http.get(
        "/xiao/fiction/search/" + this.radio + "/" + this.content + "/1/6"
      );
      if (book.msg == "成功") {
        this.books = book.data;
      } else {
        this.$message({
          message: book.msg,
          type: "warning",
        });
      }
      loading.close();
      this.showItems = true;
    },

    async directory(b) {
      //获取目录
      let loading = this.$loading({
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const { data: dir } = await this.$http.get(
        "/xiao/fictionChapter/search/" + b
      );
      this.directorys = dir.data.chapterList; // 当前批次的数据
      //  console.log(this.directorys.length);//章节数
      this.packto(1);
      this.wenb = false;
      this.muli = true;
      loading.close();
      this.totop();
      //  console.log(b);
    },
    async text(b, p, e) {
      //获取文本
      let loading = this.$loading({
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.totop();
      const { data: te } = await this.$http.get(
        "/xiao/fictionContent/search/" + b
      );
      this.texts = te.data;
      e.target.style.color = "#8a2be2";//点击的章节改变颜色
      this.wenb = true;
      this.muli = false;
      loading.close();
      this.p = p + 1;
      this.nextid = this.directorys[this.p + (this.pages - 1) * 119].chapterId;
      console.log(this.p);
      //  console.log(this.nextid);
    },
    async next() {
      //下一页
      // 下一页的翻转动画，第一次点击无效并且丑，取消
      //            this.$refs.carRef.$el.addEventListener('webkitAnimationEnd', function() {
      //   this.classList = "bookform"; // 删除类，以便下次触发动画
      // });
      let loading = this.$loading({
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.8)",
      });
      this.totop();
      const { data: tes } = await this.$http.get(
        "/xiao/fictionContent/search/" + this.nextid
      );
      loading.close();
      this.texts = tes.data;
      //  this.$refs.carRef.$el.classList = "rotate bookform"
      this.p += 1;
      this.nextid = this.directorys[this.p + (this.pages - 1) * 119].chapterId;
      console.log(this.p + (this.pages - 1) * 119);
    },
    mul() {
      //返回目录
      this.wenb = !this.wenb;
      this.muli = !this.muli;
      this.totop();
    },
    ry() {
      //黑白控制
      if (this.swi) {
        this.bgColor = "#000";
        this.fontColor = "#f7f7f7";
      } else {
        this.bgColor = "#f7f7f7";
        this.fontColor = "#000";
      }
    },
    yicaizhi(){
     // 材质辅助控制
      if(this.caizhi =="bookform beijingh"){
        this.swi= true;
      }else{
        this.swi= false;
      }
        this.ry()
    },
    updateFontSize() {//字体大小
      this.$refs.txt.style.fontSize = this.fontSize + "px";
    },
    totop() {//返回上方
      setTimeout(() => {
        window.scrollTo({
          top: Math.ceil(this.$refs.heheiRef.$el.offsetHeight) + 70,
          behavior: "smooth",
        });
      }, 100);
    },
    packto(pacg) {
      //分页数据
      this.pages = pacg;
      this.directorys2 = this.directorys.slice(
        (this.pages - 1) * 120,
        this.pages * 120
      );
    },
    handleKeyDown(event) {
      //右键下一页
      if (this.wenb & (event.code == "ArrowRight")) {
        this.next();
      }
    },
  },
};
</script>

<style scoped>
.author {
  font-size: 13px;
  color: #999;
}

.bottom {
  line-height: 20px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}
.bookform {
  /* 卡片上间距 */
  margin-top: 20px;
  border-radius: 14px;
}
.textwi {
  /* 目录样式 */
  width: 180px;
  margin-right: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  font-family: "Microsoft YaHei", "微软雅黑";
}
.txtp {
  /* 文字样式 */
  font-size: 18px;
  white-space: pre-wrap; /* 自动换行 */
  font-family: "Microsoft YaHei", "微软雅黑";
  font-weight:500;
  margin: 0 0 1em;
  /* 段间距 */
  line-height: 1.6;
  /* 行间距 */
  letter-spacing: 0.05em;
  /* 字符间距 */
}
.el-form-item {
  margin-bottom: 0;
}
.switchsty {
  float: right;
  padding-left: 20px;
}
.el-select {
  float: right;
  width: 140px;
}
.vertical-slider {
  height: 120px;
  position: fixed;
  bottom: 10px;
  right: -6px;
}
.el-slider {
  height: 100px;
}
.beijing {
 background: none;
}
.beijingb {
 background:url(../json/780.jpg) no-repeat  center;
 background-size:100% 100%;
 border: 2px solid #ccc;
}
.beijingh {
 background:url(../json/880.jpg) no-repeat fixed;
 background-size: 100% 120%;
}
.beijingg {
 background:url(../json/980.jpg) center;
 background-size: 100% auto;
 border: 2px solid #aaa;
}

.el-zoom-in-center-leave-active,
.el-zoom-in-center-enter-active {
  transition: all 0.5s;
}
.fade-enter-active {
  transition-delay: 0.5s;
}
.fade-leave-active {
  transition: none;
}

.vertical-slider /deep/ .el-slider__button {
  border: 2px solid #4022ff;
}
.vertical-slider /deep/ .el-slider__runway {
  background-color: rgb(200, 0, 0);
}

/* 动画 */
/* .rotate {
  animation: myfirst 0.5s;
}
  @keyframes myfirst
{
    from {transform: rotateY(0deg);}
    to {transform: rotateY(360deg);}
}
@-webkit-keyframes myfirst // Safari 与 Chrome 
{
    from {transform: rotateY(0deg);}
    to {transform: rotateY(360deg);}
} */
</style>
