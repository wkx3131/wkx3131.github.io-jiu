import Vue from 'vue'
// import { Button, Tag } from 'element-ui'
// import { Form,FormItem } from 'element-ui'
// import { Input} from 'element-ui'
// import { Message} from 'element-ui'
// // 布局，都要来一遍
// import { Container,Header,Aside,Main} from 'element-ui'
// // 下拉菜单
// import { Menu,Submenu,MenuItem} from 'element-ui'
// // 面包屑,卡片，分栏间隔布局，表格，开关，提示文本
// import { Breadcrumb,BreadcrumbItem} from 'element-ui'
// import { Card,Row,Col} from 'element-ui'
// import { Table,TableColumn} from 'element-ui'
// import { Switch} from 'element-ui'
// import { Tooltip} from 'element-ui'
// //分页栏，对话框
// import { Pagination} from 'element-ui'
// import { Dialog} from 'element-ui'
// // 弹窗
// import { MessageBox ,Radio,Image} from 'element-ui'
// import { Loading ,Slider,InputNumber} from 'element-ui';

// Vue.use(Button) //使之可以全局使用
// Vue.use(Form)
// Vue.use(FormItem)
// Vue.use(Input)
// Vue.use(Container)
// Vue.use(Header)
// Vue.use(Aside)
// Vue.use(Main)
// Vue.use(Menu)
// Vue.use(Submenu)
// Vue.use(MenuItem)
// Vue.use(Breadcrumb)
// Vue.use(BreadcrumbItem)
// Vue.use(Card)
// Vue.use(Row)
// Vue.use(Col)
// Vue.use(Table)
// Vue.use(TableColumn)
// Vue.use(Switch)
// Vue.use(Tooltip)
// Vue.use(Pagination)
// Vue.use(Dialog)
// Vue.use(Tag)
// Vue.use(Radio)
// Vue.use(Image)
// Vue.use(Slider)
// Vue.use(InputNumber)
// Vue.prototype.$loading = Loading.service;

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)


// 挂载到vue，成为vue this的一部分
// Vue.prototype.$message = Message//消息提示，不是组件
// Vue.prototype.$confirm = MessageBox.confirm