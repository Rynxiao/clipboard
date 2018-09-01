<template>
  <div id="app">
    <header class="header">剪切板</header>
    <section class="main">
      <el-row type="flex" justify="end">
        <el-button type="primary" icon="el-icon-plus" @click="onAddValue">添加</el-button>
      </el-row>
      <el-row class="table-row">
        <el-table
          :data="list"
          @row-click="rowClick"
          style="width: 100%">
          <el-table-column
            prop="value"
            label="复制文本">
          </el-table-column>
          <el-table-column
            prop="tag"
            label="标签"
            width="100"
            :filters="tags"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag
                v-if="scope.row.tag"
                :type="scope.row.tag === '家' ? 'primary' : 'success'"
                disable-transitions>{{scope.row.tag}}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </section>
    <el-dialog
      title="填写输入项"
      :visible.sync="centerDialogVisible"
      width="60%"
      center>
      <el-input
        ref="inputTextRef"
        placeholder="请输入要复制的文字"
        v-model="inputValue"
        clearable>
      </el-input>
      <p class="add-tag-label">请您添加标签</p>
      <ul class="tag-list">
        <li
          class="dialog-tag"
          :key="tag.text"
          @click="selectTag(tag)"
          v-for="tag in tags">
          <el-tag :type="selectedTagText === tag.text ? 'success' : 'primary'">{{ tag.text }}</el-tag>
        </li>
        <li class="add-tag">
          <el-input
            class="input-new-tag"
            v-if="newVisible"
            v-model="newTag"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button
            v-else
            class="add-tag-button"
            type="primary"
            icon="el-icon-edit"
            @click="showInput">
          </el-button>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onCancel">取 消</el-button>
        <el-button type="primary" @click="onConfirmed">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  data () {
    return {
      list: [
        {
          value: '上海市普陀区金沙江路 1518 弄',
          tag: '家'
        }, {
          value: '上海市普陀区金沙江路 1517 弄',
          tag: '公司'
        }, {
          value: '上海市普陀区金沙江路 1519 弄',
          tag: '家'
        }, {
          value: '上海市普陀区金沙江路 1516 弄',
          tag: '公司'
        }
      ],
      tags: [
        { text: '家', value: '家' },
        { text: '公司', value: '公司' }
      ],
      centerDialogVisible: false,
      inputValue: '',
      selectedTagText: '',
      newVisible: false,
      newTag: ''
    }
  },
  methods: {
    filterTag (value, row) {
      return row.tag === value
    },
    rowClick (row) {
      alert(row.value)
    },
    onAddValue () {
      this.centerDialogVisible = true
      this.$nextTick(_ => {
        this.$refs.inputTextRef.$refs.input.focus()
      })
    },
    selectTag (tag) {
      this.selectedTagText = tag.text
    },
    onCancel () {
      this.centerDialogVisible = false
    },
    onConfirmed () {
      this.centerDialogVisible = false

      if (!this.inputValue) {
        this.$message.error('请您输入要复制的文本')
        return
      }

      this.list.push({
        value: this.inputValue,
        tag: this.selectedTagText
      })

      this.inputValue = ''
    },
    showInput () {
      this.newVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      let newTag = this.newTag
      if (newTag) {
        this.tags.push({ text: this.newTag, value: this.newTag })
      }
      this.newVisible = false
      this.newTag = ''
    }
  }
}
</script>

<style>
body, ul, li {
  padding: 0;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 0 20px;
}
.header {
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 30px;
  margin-top: 30px;
  padding: 0 25px;
}
.main {
  padding: 25px;
}
.table-row {
  margin-top: 20px;
}
.tag-list {
  margin-top: 10px;
  margin-left: 10px;
}
.dialog-tag {
  margin: 0 10px 10px 0;
  cursor: pointer;
  display: inline-block;
}
.add-tag {
  display: inline-block;
  width: 70px;
  height: 32px;
}
.add-tag-button {
  padding: 8px 20px!important;
}
.add-tag-label {
  font-size: 12px;
}
</style>
