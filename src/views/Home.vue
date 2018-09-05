<template>
  <div class="home">
    <el-row type="flex" justify="space-between" :gutter="20">
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="keyword">
          <el-button type="primary" slot="append" icon="el-icon-search" @click="searchList"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" icon="el-icon-plus" @click="onAddValue">添加</el-button>
      </el-col>
    </el-row>
    <el-row class="home__table-row">
      <el-table
        :data="list"
        @row-click="rowClick"
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="content"
          label="复制文本">
          <template slot-scope="scope">
            <div class="cell" v-if="scope.row.edit">
              <el-input
                :ref="'bindInputEditRef' + scope.$index"
                type="text"
                v-model="scope.row.content"
                @keyup.enter.native="handleModify(scope.row)"
                @blur="handleModify(scope.row)"
                placeholder="请输入内容"></el-input>
            </div>
            <div
              v-else
              class="cell home__input-text--normal" @click="cellClick(scope)">
              {{scope.row.content}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="tag"
          width="150"
          label="类型"
          :filters="tags"
          :filter-method="filterTag"
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <div>默认</div>
          </template>
        </el-table-column>
        <el-table-column
          width="150"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="home__pagination-container">
      <el-pagination
        class="home__pagination"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </el-row>
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
      <p class="dialog__tag-label">请您添加标签</p>
      <ul class="dialog__tag-list">
        <li
          class="dialog__tag-item"
          :key="tag.text"
          @click="selectTag(tag)"
          v-for="tag in tags">
          <el-tag :type="selectedTagText === tag.text ? 'success' : 'primary'">{{ tag.text }}</el-tag>
        </li>
        <li class="dialog__add-container">
          <el-input
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
            class="dialog__edit-button"
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
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import {
  getContentList,
  insertContent,
  updateContent,
  deleteContent
} from '../api'

export default {
  name: 'home',
  data () {
    return {
      list: [],
      tags: [
        { text: '家', value: '家' },
        { text: '公司', value: '公司' }
      ],
      centerDialogVisible: false,
      inputValue: '',
      selectedTagText: '',
      newVisible: false,
      newTag: '',
      keyword: '',
      pageSize: 10,
      currentPage: 1,
      total: 0
    }
  },
  async mounted () {
    this.getList()
  },
  methods: {
    async getList () {
      const res = await getContentList({
        userid: 'admin',
        page: this.currentPage,
        keyword: this.keyword
      })
      this.list = res.data.data
      this.total = res.data.total
    },
    filterTag (value, row) {
      return row.tag === value
    },
    rowClick (row) {
      // alert(row.content)
    },
    cellClick (scope) {
      const index = scope.$index
      this.list[index].edit = true
      this.list = [...this.list]
      this.$nextTick(_ => {
        this.$refs['bindInputEditRef' + index].$refs.input.focus()
      })
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
    async onConfirmed () {
      this.centerDialogVisible = false
      if (!this.inputValue) {
        this.$message.error('请您输入要复制的文本')
        return
      }
      await insertContent({ userid: 'admin', content: this.inputValue })
      await this.getList()
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
    },
    handleCurrentChange (page) {
      this.currentPage = page
      this.$nextTick(_ => {
        this.getList()
      })
    },
    searchList () {
      this.getList()
    },
    handleSelectionChange (selection) {
      // console.log(selection)
    },
    async handleModify (row) {
      if (!row.content) {
        this.$message.error('请您修改要复制的文本')
        return
      }
      row.edit = false
      this.list = [...this.list]
      const res = await updateContent({
        userid: 'admin',
        content: row.content,
        uuid: row.uuid
      })
      if (res.success === 1) {
        this.$message({ type: 'success', message: '修改成功!' })
      }
    },
    handleDelete (row) {
      this.$confirm('您要删除这条记录么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await deleteContent({ userid: 'admin', uuid: row.uuid })
        if (res.success === 1) {
          this.$message({ type: 'success', message: '删除成功!' })
          this.getList()
        }
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除' })
      })
    }
  }
}
</script>

<style scoped>
.home {
  padding: 25px;
}
.home__table-row {
  margin-top: 20px;
}
.dialog__tag-list {
  margin-top: 10px;
  margin-left: 10px;
}
.dialog__tag-item {
  margin: 0 10px 10px 0;
  cursor: pointer;
  display: inline-block;
}
.dialog__add-container {
  display: inline-block;
  width: 70px;
  height: 32px;
}
.dialog__edit-button {
  padding: 8px 20px!important;
}
.dialog__tag-label {
  font-size: 12px;
}
.home__pagination-container {
  padding: 10px 0;
  text-align: right;
}
.home__pagination {
  display: inline-block;
}
.home__cell--edit {
  line-height: 40px;
  padding: 0 5px;
}
.home__input-text--normal {
  padding-left: 25px!important;
}
</style>
