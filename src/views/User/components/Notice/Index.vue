<template>
  <div>
    <el-form :model="form" :rules="rules" inline ref="form" size="small">
      <el-form-item label="消息：" prop="content">
        <el-input
          v-model="form.content"
          placeholder="请输入消息"
          @keypress.enter.native="handleAdd"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-plus" @click="handleAdd"
          >添加</el-button
        >
      </el-form-item>
    </el-form>

    <div class="card-list">
      <el-card
        v-for="(item, index) in contentList"
        :key="index"
        shadow="hover"
        :body-style="{ padding: '0px' }"
      >
        <div class="date">
          <div>{{ item.date }}</div>
          <el-button
            size="mini"
            icon="el-icon-delete"
            type="danger"
            class="delete-btn"
            circle
            @click="handleDelete(index)"
          ></el-button>
        </div>
        <div class="content">
          {{ item.content }}
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        content: ""
      },
      rules: {
        content: [
          {
            required: true,
            message: "请输入消息",
            trigger: "blur"
          }
        ]
      },
      contentList: []
    };
  },
  created() {
    let list = JSON.parse(localStorage.getItem("contentList"));
    if (list instanceof Array) {
      this.contentList = list;
    }
  },
  methods: {
    handleAdd() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.contentList.push({
            content: this.form.content,
            date: new Date().Format("yyyy-MM-dd HH:mm:ss")
          });
          this.form.content = "";
        }
      });
    },
    handleDelete(index) {
      let list = [...this.contentList];
      list.splice(index, 1);
      this.contentList = list;
    }
  },
  beforeDestroy() {
    localStorage.setItem("contentList", JSON.stringify(this.contentList));
  }
};
</script>

<style lang="scss" scoped>
.card-list {
  display: flex;
  flex-wrap: wrap;
  .el-card {
    width: 22%;
    margin: 1%;
    .date {
      padding: 12px;
      border-bottom: 1px solid #eee;
      font-size: 14px;
      div {
        display: inline-block;
      }
      .delete-btn {
        float: right;
        position: relative;
        bottom: 5px;
      }
    }
    .content {
      padding: 12px;
      font-size: 14px;
      color: gray;
    }
  }
}
</style>
