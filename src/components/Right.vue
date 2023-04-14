<template>
<div>
  <li v-for="(a,b) in todotiem" :key="b">{{b}}--{{a}}<button @click="remove(b)" >删除</button></li>
  <!-- 传递数组的项数用于splice()的删除 -->
  <h1>计算函数{{her}}</h1>
</div>
</template>

<script>
import Vue from 'vue'
Vue.component("todo",{
  props:['title','index'],
})

export default {
  data() {
    return {
      todotiem:['banana-10','orange-10'],
      message:"",
      tableData: [
        {
          name: 'fruit-1',
          apple: 'apple-10',
          banana: 'banana-10',
          orange: 'orange-10'
        },
        {
          name: 'fruit-2',
          apple: 'apple-20',
          banana: 'banana-20',
          orange: 'orange-20'
        }
      ],
      formThead: ['apple', 'banana']
    }
  },
  //勾子函数created，mounted、updated 和 unmounted。创建安装更新卸载，在组建完成对应渲染时运行
  created(){

  },
  computed:{ //计算函数，会把结果缓存到内存
  her(){
return "qw"
  }
  },
  methods:{
    remove(b){
      this.todotiem.splice(b,1)
    }
  }
}
</script>
