import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'
// 引入vuex
import store from '@/store'
// 引入element组件
import {  Table,TableColumn,Tag,DescriptionsItem,Descriptions,Result,Divider,Card,Upload,Checkbox,CheckboxGroup,Aside,Main,Container,Tooltip,Switch,Slider,Col,DropdownItem,DropdownMenu,Dropdown,MenuItemGroup,MenuItem,Submenu,Menu,Row,Button, Dialog,Input,FormItem ,Form,Popover,Image,PageHeader,Tabs,TabPane,Icon,Radio,RadioGroup,RadioButton} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Aside)
Vue.use(Tag)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Result)
Vue.use(DescriptionsItem)
Vue.use(Descriptions)
Vue.use(Divider)
Vue.use(Card)
Vue.use(Upload)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Main)
Vue.use(Container)
Vue.use(Tooltip)
Vue.use(Slider)
Vue.use(Switch)
Vue.use(Row)
Vue.use(Col)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Popover)
Vue.use(Image)
Vue.use(PageHeader)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Icon)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate(){
    // 全局事件总线
  Vue.prototype.$bus = this
  },
  router,
  store
}).$mount('#app')
