<template>
  <div id="app">
    <!-- <child message="hello!"></child> -->
    <p>生活小知识：{{ na }}</p>
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
    <transition-group name="el-fade-in">
      <el-card class="box-card" v-for="value in data" :key="value.pid">
        <div slot="header">
          <span>{{ value.title }}</span>
        </div>
        <div>
          <table>
            <tr>
              <td class="informa">
               <b> 作者：{{ value.author }}<br />作者id：{{ value.author_uid}}<br />作品id：{{ value.pid }}</b>
              </td>
              <td rowspan="2" class="imginde">
                <!-- <img src="../json/合理.png"> -->
                <img
                  v-lazy="value.url"
                  height="300px"
                  onerror="../json/合理.png"
                />
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
        </div>
      </el-card>
    </transition-group>
    <el-tooltip effect="dark" content="回到顶部" placement="right">
      <el-button
        type="primary"
        icon="el-icon-caret-top"
        circle
        @click="totop()"
      ></el-button>
    </el-tooltip>
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
            
        }
    },
    created(){
        this.axi()
        this.v2(this.suffix)
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
            },
            txtcopy(i){
              this.$refs.intxt.value = i
            },
            totop(){
                window.scrollTo({
                top: 0,
                behavior: 'smooth'
            }) 
            }
}}
</script>

<style scoped>
#app {
  height: auto;
}
.el-row {
  margin-bottom: 20px;
}
td {
  width: 50%;
}
.informa {
  height: 50px;
}
.tags {
  width: 600px;
  margin: 0;
  padding: 0;
}

.imginde {
  text-align: center;
}
.box-card {
  margin-bottom: 16px;
  border-radius: 10px;
}
.el-tag {
  margin-right: 8px;
  margin-top: 6px;
}
</style>
