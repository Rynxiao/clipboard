import Vue from 'vue'
import {
  Container,
  Button,
  Table,
  TableColumn,
  Tag,
  Row,
  Col,
  Scrollbar,
  Dialog,
  Input,
  Pagination,
  Message,
  Loading,
  MessageBox,
  Notification
} from 'element-ui'

Vue.use(Container)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)
Vue.use(Tag)
Vue.use(Row)
Vue.use(Scrollbar)
Vue.use(Dialog)
Vue.use(Input)
Vue.use(Col)
Vue.use(Pagination)

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
