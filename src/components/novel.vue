<template>
<div id="app">
<!-- 条件 -->
<el-form :inline="true">
    <el-form-item>
    <el-input
  placeholder=""
  v-model="author"
  clearable
 @keydown.enter.native.prevent
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
<transition-group name="el-zoom-in-center" :inline="true">
  <el-form-item v-for="value in books" :key="value.fictionId" v-show="showItems">
    <el-card :style="{width:'200px'}" class="bookform">
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
<transition name="el-zoom-in-center" mode="out-in">
<el-card v-show="muli" class="bookform" style="text-align: center;" key="muli" >
<el-form :inline="true">
  <el-button @click="mul()">返回文本</el-button><p></p>
    <el-form-item v-for="(value,index) in directorys" :key="value.chapterId" class="textwi">
<el-button class="textwi" type="text" @click="text(value.chapterId,index, $event)">{{value.title}}</el-button>
</el-form-item>
</el-form>
</el-card> 
</transition>

<!-- 文本 -->
<transition name="el-zoom-in-center" enter-active-class="fade-enter-active" leave-active-class="fade-leave-active" mode="out-in">
    <el-card v-show="wenb" class="bookform" :style="{ backgroundColor: bgColor, color: fontColor}" key="wenb">
          <el-switch class="switchsty"
  v-model="swi"
    active-icon-class="el-icon-moon"
    inactive-icon-class="el-icon-sunny"
    @change="ry()"
    >
</el-switch>

<div class="vertical-slider">
      <span>字号</span>
    <el-slider
      v-model="fontSize" vertical
      :step="2" :min="14" :max="20"  :bar-background-color="yellow"
      show-stops @input="updateFontSize">
    </el-slider>
</div>

     <el-button @click="mul()">返回目录</el-button>
     <div ref="txt" class="txtp">
     <p v-for="(value,index) in texts" :key="index">{{value}}</p>
     </div>
     <!-- <div v-for="t in texts" :key="t.pid" v-html="t"></div> -->
     <el-button @click="mul()">返回目录</el-button>
     <el-button @click="next()">下一页</el-button>
    </el-card>
</transition>
</div>

  </div>
</template>

<script>
// import { gsap } from 'gsap';
export default {
    data () {
      return {
        books:"",
        radio: 'title',
        author:"",
        directorys:[],
        texts:[],
        muli:false,//目录
        wenb:false,//文本
        totopxp:200,
        p:0,
        nextid:"",
        swi:false,//黑白
        bgColor: "#fff",
        fontColor: "#000",
        showItems:false,//书
        fontSize:18
      };
    },
    methods:{
    async book(){//书
let loading = this.$loading({text: '加载中...',});
       const {data:book} = await this.$http.get("/xiao/fiction/search/"+this.radio+"/"+this.author+"/1/6")
       if(book.msg=="成功"){
         this.books=book.data;
         this.wenb=false;
         this.muli=false;
       }else{
          this.$message({
          message: book.msg,
          type: 'warning'
        });
       };
       loading.close();
       this.showItems=true;
    },
    async directory(b){//目录
        let loading = this.$loading({text: '加载中...',});
       const {data:dir} = await this.$http.get("/xiao/fictionChapter/search/"+b)
       this.directorys=dir.data.chapterList;
       this.muli=true;
       loading.close()
       this.totopxp = Math.ceil(this.$refs.heheiRef.$el.offsetHeight)+50;
    },
    async text(b,p,e){//文本
        let loading = this.$loading({text: '加载中...',});
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
       
    },
    async next(){//下一页
        let loading = this.$loading({text: '加载中...',});
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
        this.fontColor = "#fff";
      } else {
        this.bgColor = "#f7f7f7";
        this.fontColor = "#000";
      }
    },
    updateFontSize() {
      console.log("303");
      this.$refs.txt.style.fontSize = this.fontSize  + 'px';
    },
    totop(){
      window.scrollTo({
    top: this.totopxp,
    behavior: 'smooth'})
    },
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
  right:-8px;
}
.el-slider{
  height: 100px;
}
.el-slider__runway{
background-color: #b50909;
}


.el-zoom-in-center-enter-active{
transition:all 0.5s
}
.fade-enter-active{
  transition-delay: 0.5s;
}
.fade-leave-active {
  position: absolute;
  /* transition: none */
}
</style>>
