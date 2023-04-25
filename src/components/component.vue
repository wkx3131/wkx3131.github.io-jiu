<template>
<div id="app">
    <!-- <child message="hello!"></child> -->
    <p>生活小知识：{{na}}</p>
<!-- 条件 -->
<el-form :inline="true">
    <el-form-item>
    <el-input
  placeholder="查询作者id"
  v-model="author"
  clearable>
</el-input>
</el-form-item>

<el-form-item>
    <el-input
  placeholder="查询内容"
  v-model="label"
  clearable>
</el-input>
  </el-form-item>

  <el-form-item>
  <el-button type="primary" @click="onSubmit">查找</el-button>
  </el-form-item>
    <el-switch
  v-model="swi"
  active-text="特殊"
  inactive-text="常规">
</el-switch>
</el-form>


<!-- 卡片 -->
<transition-group name="el-fade-in">
<el-card class="box-card" v-for="(value, index) in data" :key="value.pid" v-show="shows" :style="{ 'transition-delay': (cardIndex.indexOf(index) * 0.3) + 's' }">
  <div slot="header">
    <span>{{value.title}}</span>
  </div>
  <div>
   <table>
  <tr>
    <td class="informa">作者:{{value.author}}<br>作者id:{{value.author_uid}}</td>
    <td rowspan="2" class="imginde"><img v-lazy="value.url" height="300px"></td>
  </tr>
  <tr>
    <td class="tags">
        <el-tag size="small" v-for="i in value.tags" :key="i.tag">{{i}}</el-tag>
    </td>
  </tr>
</table>
  </div>
</el-card>
</transition-group>

</div>
</template>
<script>
export default {
    data(){
        return{
            na:"",
            data:[],
            suffix:"/v2/?num=10",
            author:"",
            label:"",
            swi:false,
            shows:false
            
        }
    },
    created(){
        this.axi()
        this.v2(this.suffix)
    },
    computed: {
  cardIndex() {
    return this.data.map((value, index) => index);
  },
},
    methods:{
        async axi(){
           const {data:shuju} = await this.$http.get("/api/dm-qiaomen")
        //    console.log(shuju);
           this.na=shuju.data.content;
        },
        async v2(b){
          let loading = this.$loading({text: '加载中...'
        });
           const {data:arr} = await this.$http.get(b)
        //    console.log(arr.data);
           this.data = arr.data
           loading.close()
           this.shows=true;
        },
        onSubmit () {
                if (isNaN(this.author)){
                    this.suffix +="&author_uuid="+this.author
                }
                if (this.label!==""){
                    this.suffix +="&keyword="+this.label
                }
                if (this.swi){
                    this.suffix +="&r18=true"
                }
                this.v2(this.suffix)
                this.suffix="/v2/?num=10"//恢复初始
            }
            
    }
}
</script>

<style scoped>
#app{
    height: auto;
}
  .el-row {
    margin-bottom: 20px;
  }
td{
    width: 50%;
}
.informa{
height: 50px;
}
.tags{
    margin: 0;
    padding: 0;
}
.imginde{
    text-align: center;
}
.box-card{
    margin-bottom: 16px;
    border-radius: 10px;
}
.el-tag{
    margin-right: 8px;
}
</style>