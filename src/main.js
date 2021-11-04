import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import {
  Container, Header, Main, Row, Col, Table, TableColumn, Button, Dialog, Form, FormItem, Input, Select, Option, DatePicker,
  MessageBox, Message
} from 'element-ui'

Vue.use(Container).use(Header).use(Main).use(Row).use(Col).use(Table).use(TableColumn).use(Button).use(Dialog).use(Form)
  .use(FormItem).use(Input).use(Select).use(Option).use(DatePicker)

Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
