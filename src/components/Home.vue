<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header>
      <h2>&emsp;金岂的垃圾堆</h2>
      <!-- <h2>&emsp;管理系统</h2> -->
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>

    <!-- 主体 -->
    <el-container>
      <!-- 侧边栏 根据缩进改变宽-->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="menu-bat" @click="toggleCollapse">|||</div>
        <!--下拉菜单：一级颜色，字体颜色，二级颜色,只展开一项，是否缩进(绑定bing数据)，
缩进动画开关，!!跳转路由开关(跳转:index路径)，高亮选项-->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffff4b"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <!-- 下拉 -->
          <el-submenu
            :index="item.id + ' '"
            v-for="item in menulist"
            :key="item.id"
          >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <!-- 无下拉 -->
            <!-- index就是链接的目标路由 -->
            <el-menu-item
              :index="'/' + item2.path"
              v-for="item2 in item.s1"
              :key="item2.id"
              @click="saveNAvState('/' + item2.path)"
            >
              <i class="el-icon-menu"></i>
              <span>{{ item2.naclss }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主页面 -->
      <el-main ref="mainRef">
        <!-- 路由占位符 -->
        <transition mode="out-in" name="left">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </el-main>
    </el-container>
  </el-container>
  <!-- 这里结构是正确的 -->
</template>

<script>
import { datas } from "../json/json-server/test2db.json";
export default {
  data() {
    //data function(){}的简写，其实是个函数，vue里的data不能是对象，所以用函数html里的实时data:{}
    return {
      //左侧菜单数据
      menulist: [],
      isCollapse: false,
      activePath: "",
    };
  },
  created() {
    // 生命周期函数，页面加载后会调用下面的函数，mounted、 updated 、destroyed创建更新摧毁
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem("activePath");
    // 页面加载时加载，用于刷新后依然高亮
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    // 获取所有菜单
    async getMenuList() {
      // const{data:res}= await this.$http.get('datas')
      // async/await 执行await语句后才执行之后的代码
      // if (res.meta.status !== 200) {
      //   return this.$message.error(res.meta.msg);
      // }
      this.menulist = datas.data;
      // console.log(this.menulist[0].s1);
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
      this.$refs.mainRef.$el.style.paddingLeft = this.isCollapse
        ? "80px"
        : "230px";
    },
    // 保持连接的激活状态
    saveNAvState(activePath) {
      // 把路径保存到浏览器
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
      // 用于点击时改变高亮
    },
  },
};
// import { createApp } from 'vue'
// const app = createApp({})
// app.component('child', {
//   props: ['message'],
//   template: '<span>{{ message }}</span>'
// })
// new Vue({
//   el: '#app'
// })
</script>
<style scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  position: fixed;
  z-index: 99;
  width: 100%;
}
.menu-bat {
  background-color: #422d31;
  color: white;
  text-align: center;
  line-height: 20px;
  padding-top: 60px;
  position: relative;
}
.el-aside {
  background-color: #333744;
  position: fixed;
  height: 100%;
  z-index: 98;
}
.el-menu {
  border-right: 0;
  /* 默认有1px边框，看着突出 */
}
.el-main {
  background-color: #eaedf1;
  overflow: hidden;
  position: relative;
  padding-top: 80px;
  padding-left: 220px;
  padding-right: 25px;
  /* top: 60px; */
}

/* 动画 */
.left-enter {
  transform: translateX(-110%);
  /* 新页面 */
}
.left-leave-to {
  transform: translateX(-110%);
  /* 旧页面 */
}
.left-enter-active,
.left-leave-active {
  transition: 0.5s;
}
</style>
