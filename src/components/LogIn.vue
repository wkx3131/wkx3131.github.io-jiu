
<template>
<!-- ref, -->

    <div class="login_container">
        <div class='login_box'>
<!-- 头像 -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>

<!-- ref和refs配合用于控制 -->
<!-- el指向当前实例 -->
<!-- 表单  格式检查 rules编写条例 -->
    <el-form :model="loginForm" :rules='loginFromRules'
    ref='loginFromRef'
    label-width="0px" class="login_form">

<!-- 账号 -->
  <el-form-item prop="username">
      <el-input
    placeholder="账号"
    prefix-icon="iconfont icon-yonghu"
    v-model="loginForm.username">
  </el-input>
  </el-form-item>

<!-- 密码 -->
  <el-form-item prop="password">
      <el-input
    placeholder="密码"
    prefix-icon="iconfont icon-mima"
    v-model="loginForm.password" type="password">
  </el-input>
  </el-form-item>

<!-- 按钮 -->
  <el-form-item  class="btns">
    <el-button type="primary" @click="logins">登录</el-button>
    <el-button type="info" @click="loginFromRef">重置</el-button>
  </el-form-item>
            </el-form>


        </div>
    </div>
</template>

<script>
import { login } from "../json/json-server/test2db.json";
// console.log(login);
export default {
    data(){
        return {
            //数据对象
            loginForm:{
                username: '123',
                password: '123'
            },
            loginFromRules:{
                username:[
            { required: true, message: '请输入登录名称', trigger: 'blur' }, //格式检查
            { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{ //事件
        loginFromRef(){
            this.$refs.loginFromRef.resetFields();//重置
        },
        logins(){
                this.$refs.loginFromRef.validate(async valid=>{
                    if (!valid) return;
                    // const {data : res}= await this.$http.get('login')
                    const res= await login
                    // console.log(res);
                    // console.log(res.data);
                    // console.log(res.username,this.loginForm.username,res.password,this.loginForm.password);
                    if ((res.data.status ==200)&(res.username==this.loginForm.username&res.password==this.loginForm.password))
                     { this.$message.success('登录成功');res.data.token=this.loginForm.password;
                    sessionStorage.setItem("tokey",res.data.token);this.$router.push('/home')}
                    else{
                     this.$message.error('登录失败')
                    }
                    
                    
                    
                    
                });
            },
    }
}

</script>

<style scoped>
/* scoped，自动生成data-v,为不同组件的样式相互区分防止冲突 */
.login_container{
    background-color: #2b4d6d;
    height: 100%;
}
.login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.avatar_box{
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    background-color: #ddd;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: relative;
    left: 50%;
    transform: translate(-50%,-40%);
}

.avatar_box img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
}
.login_form{
    position: absolute;
    width: 100%;
    padding: 0 20px;
    /* 使宽度等于外边距加边框，好用 */
    box-sizing: border-box;
    bottom:0px;

}
.btns{ 
display: flex;
justify-content: flex-end;
}
</style>