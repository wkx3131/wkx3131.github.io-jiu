<template>
<div id="app">
<!-- 条件 -->
<el-form :inline="true">
    <el-form-item>
    <el-input
  placeholder=""
  v-model="author"
  clearable
 @keydown.enter.native.prevent="book"
 autocomplete="on">
</el-input>
</el-form-item>

  <el-form-item >
  <el-button type="primary" @click="book">查找</el-button>
  </el-form-item>
</el-form>
  <el-radio v-model="radio" label="title">查找作品</el-radio>
  <el-radio v-model="radio" label="author">查找作者</el-radio>

<!-- 卡片 -->
<el-form :inline="true" class="bookform" ref="heheiRef">
<transition-group name="el-zoom-in-center">
  <el-form-item v-for="(value,index) in books" :key="value.fictionId"  v-show="showItems" :style="{'transition':'all 0.2s '+((index+1) * 0.3)+'s'}">
    <el-card style="{widht:'200px'}"  class="bookform">
      <el-image style="width: 160px; height:200px" :src="value.cover" lazy></el-image>
      <div class="bottom">
        <span><b>{{value.title}}</b></span>
        <div class="bottom">
          <span class="author">{{ value.author }}</span>
          <el-button type="text" class="button" @click="directory(value.fictionId)">打开目录</el-button>
        </div>
      </div>
    </el-card>
  </el-form-item>
</transition-group>
</el-form>

<div >
<!-- 目录 -->
<transition name="el-zoom-in-center" >
<el-card v-show="muli" class="bookform" style="text-align: center;" key="muli" >
<el-form :inline="true">
  <el-button @click="mul()">返回文本</el-button><p></p>
  <!-- 分页 -->
  <el-pagination
  background
  layout="prev, pager, next"
  :page-size="120"
   :current-page="pages"
   @current-change="packto"
  :total="this.directorys.length">
</el-pagination><br>
    <el-form-item v-for="(value,index) in directorys2" :key="value.chapterId" class="textwi">
<el-button class="textwi" type="text" @click="text(value.chapterId,index, $event)">{{value.title}}</el-button>
</el-form-item>
</el-form>
</el-card> 
</transition>

<!-- 文本 -->
<transition name="el-zoom-in-center" enter-active-class="fade-enter-active" leave-active-class="fade-leave-active" >
    <el-card v-show="wenb" class="bookform" :style="{ backgroundColor: bgColor, color: fontColor}" key="wenb">
          <el-switch class="switchsty"
  v-model="swi"
    active-icon-class="el-icon-moon"
    inactive-icon-class="el-icon-sunny"
    @change="ry()"
    >
    <!-- 开关 -->
</el-switch>
     <el-button @click="mul()">返回目录</el-button><span>&emsp;全文{{fontlenght}}字</span>
     <div ref="txt" class="txtp">
     <p v-for="value in texts" :key="value.pid">{{value}}</p>
     </div>
     <!-- <div v-for="t in texts" :key="t.pid" v-html="t"></div> -->
     <el-button @click="mul()">返回目录</el-button>
     <el-button @click="next()">下一页</el-button>
    </el-card>
</transition>
<!-- 字号 -->
<div class="vertical-slider" v-show="wenb">
      <span style="font-size:14px;padding-left: 4px;">字号</span>
    <el-slider
      v-model="fontSize" vertical
      :step="2" :min="14" :max="20"
      show-stops @change="updateFontSize">
    </el-slider>
</div>
</div>

  </div>
</template>

<script>
// import { gsap } from 'gsap';
export default {
    data () {
      return {
        books:[],
        radio: 'title',
        author:"",
        directorys:[],
        directorys2:[],
        texts:[],
        muli:false,//目录
        wenb:false,//文本
        p:0,
        nextid:"",
        swi:false,//黑白
        bgColor: "#fff",
        fontColor: "#000",
        showItems:false,//书
        fontSize:18,
        pages:1,//当前页数

      };
    },
    computed: {
  // cardIndex() {
  //   return this.books.map((value, index) => index);
  // },
  fontlenght(){
    var chineseCharCount=0
 this.texts.forEach(function(ass) {
  const currentString = ass;
  if (currentString !== null) {
    chineseCharCount += currentString.length;
  }})
return chineseCharCount
  }
},
    methods:{
    async book(){//获取书
let loading = this.$loading({text: '加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'});
        this.showItems=false;
                 this.wenb=false;
         this.muli=false;
       const {data:book} = await this.$http.get("/xiao/fiction/search/"+this.radio+"/"+this.author+"/1/6")
       if(book.msg=="成功"){
         this.books=book.data;
       }else{
          this.$message({
          message: book.msg,
          type: 'warning'
        });
       };
       loading.close();
       this.showItems=true;
    },

    async directory(b){//获取目录
let loading = this.$loading({text: '加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'});
       const {data:dir} = await this.$http.get("/xiao/fictionChapter/search/"+b)
       this.directorys=dir.data.chapterList; // 当前批次的数据
      //  console.log(this.directorys.length);//章节数
       this.packto(1)
       this.wenb=false;
       this.muli=true;
       loading.close()
        this.totop()
      //  console.log(b);
    },
    async text(b,p,e){//获取文本
let loading = this.$loading({text: '加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'});
       const {data:te} = await this.$http.get("/xiao/fictionContent/search/"+b)
       this.texts=te.data;
       e.target.style.color = '#8a2be2';
       this.wenb=true;
       this.muli=false;
       loading.close()
       this.totop()
       this.p = p+1
       this.nextid = this.directorys[this.p].chapterId; 
       console.log(this.p);
       console.log(this.nextid);
       
    },
    async next(){//下一页
let loading = this.$loading({text: '加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'});
       const {data:tes} = await this.$http.get("/xiao/fictionContent/search/"+this.nextid)
       this.texts=tes.data;
       loading.close()
       this.totop()
       this.p +=1
       this.nextid = this.directorys[this.p].chapterId; 
       console.log(this.p);
    },
    mul(){//返回目录
       this.wenb=!this.wenb;
       this.muli=!this.muli;
       this.totop()
    },
    ry() {
      if (this.swi) {
        this.bgColor = "#000";
        this.fontColor = "#f7f7f7";
      } else {
        this.bgColor = "#f7f7f7";
        this.fontColor = "#000";
      }
    },
    updateFontSize() {
      this.$refs.txt.style.fontSize = this.fontSize  + 'px';
    },
    totop(){
setTimeout(()=>{
      window.scrollTo({
    top: Math.ceil(this.$refs.heheiRef.$el.offsetHeight)+70,
    behavior: 'smooth'})},100);
    },
    packto(pacg){//分页数据
      this.pages=pacg
      this.directorys2 = this.directorys.slice((this.pages - 1) * 120, this.pages * 120);
    }
    }
}
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
  .bookform{/* 卡片上间距 */
    margin-top: 20px;
    border-radius: 10px;
  }
  .textwi{/* 目录样式 */
    width: 180px;
    margin-right: 20px;
      overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  font-family:  "Microsoft YaHei","微软雅黑";
  }
  .txtp{
    font-size: 18px;
    white-space: pre-wrap;/* 自动换行 */
    font-family:  "Microsoft YaHei","微软雅黑", sans-serif;
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
.switchsty{
  float: right;
}

.vertical-slider {
  height: 120px;
  position: fixed;
  bottom: 10px;
  right:-6px;
}
.el-slider{
  height: 100px;
}

.el-zoom-in-center-leave-active,
.el-zoom-in-center-enter-active{
transition:all 0.5s;
}
.fade-enter-active{
  transition-delay: 0.5s;
}
.fade-leave-active {
  transition: none;
}

.vertical-slider /deep/ .el-slider__button{
      border: 2px solid #4022FF;
}
.vertical-slider /deep/ .el-slider__runway{
  background-color: rgb(200, 0, 0);
  }
</style>
