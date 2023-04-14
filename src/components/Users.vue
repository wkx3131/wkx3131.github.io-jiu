<template>
  <div>
    <!-- 连接test2db.json -->
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <!-- 一行默认是24格间距可以用:gutter规定 -->
        <el-col :span="7">
            <el-input
              placeholder="请输入内容"
              class="input-with-select"
              v-model="queryInfo.q" clearable @clear="getUserList">
              <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
            </el-input>
        </el-col>
        <el-col :span="4">
            <el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- 表格区 data数据源 -->
        <el-table
      :data="userlist"
      style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        label="状态">
        <!-- scope. row 可以获得当前行的对象参数，固定方法 -->
       <template slot-scope="scope">
        <!--开关按钮 -->{{scope.row}}
        <el-switch
  v-model="scope.row.mg_state" @change="userStateChanged(scope.row)">
</el-switch>
         </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">{{scope.row}}
            <el-button type="primary" icon="el-icon-edit"></el-button>
            <el-button type="danger" icon="el-icon-delete"></el-button>
                <el-tooltip effect="dark" content="文字提示" placement="top" :enterable=false>
                  <!-- enterable 鼠标可否进入提示框 -->
            <el-button type="warning" icon="el-icon-setting"></el-button>
    </el-tooltip>
         </template>
      </el-table-column>
    </el-table>

    <!-- 分页框 当前页码，每页多少条，框架部分-->
        <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange" 
      :current-page="queryInfo._page"
      :page-sizes="[1, 2, 3, 5]"
      :page-size="queryInfo._limit"
      layout="sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 添加用户对话框 visible决定是否隐藏 ref引用名字用于控制整个表单-->
    <el-dialog
  title="添加用户"
  :visible.sync="addDialogVisible"
  width="50%" @close="addDialogClosed()">
  <!--ref引用: this.$refs.addFromRules -->
  <el-form :model="addFrom" :rules="addFromRules" ref="addFormRef" label-width="70px">
  <el-form-item label="用户名" prop="username"><!-- 父addFromRules子username 规则格式-->
    <el-input v-model="addFrom.name"></el-input>
  </el-form-item>
  </el-form>
  <!-- 底部 -->
  <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="queding()">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
    export default {
      data() {
        return {
            // 获取用户列表的参数
            queryInfo:{
              
                q:'',//查询参数
                _page:1,//当前页码
                _limit:2//每条显示数量
            }, //这部分我遵循了自己jsonserver的关键字才能够正确使用
            userlist:[
            ],
            total:3,
            addDialogVisible:false,
            addFrom:{name:''},//新用户数据
            addFromRules:{
              username:[
            { required: true, message: '请输入名称', trigger: 'blur' }, //格式检查
            { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            }//验证规则
        }
        },
        created(){
            this.getUserList()
        },
        methods:{
          // 调用数据
            async getUserList(){ //await用在返回值是promise的实例的语句中，语句的方法要加async,是对原本代码的简化
            const {data:res} =await this.$http.get('/users',{params:this.queryInfo})//固定格式
            this.userlist = res
            console.log(res);
        },
        // 改变json数据
        async userStateChanged(userinfo){
          try {
            await this.$http.put(`/users/${userinfo.id}`,userinfo)//因为路径限制,json结构要符合
          } catch (error) {
            userinfo.mg_state =!userinfo.mg_state 
            return this.$message.error('状态更新失败')
          }
        },
        handleSizeChange(a){ //显示条目被改变
          console.log(a);
          this.queryInfo._limit = a
          this.getUserList()
        },
        handleCurrentChange(b){//当前页面数被改变
          console.log(b);
          this.queryInfo._page = b
          this.getUserList()
        },
        // 重置表单
        addDialogClosed(){
          this.$refs.addFormRef.resetFields()
        },
        queding(){
          this.$http.post('users',this.addFrom)
          addDialogVisible = false
          this.getUserList()
        }
      }
    }
</script>
<style scoped>
</style>