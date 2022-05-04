<template>
  <div>
    <div class="line"></div>
    <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item index="1">处理中心</el-menu-item>
    <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
        <template slot="title">选项4</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
        <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
    </el-submenu>
    <el-menu-item index="3" disabled>消息中心</el-menu-item>
    <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
    <el-menu-item index="5" @click="goto_login">登录</el-menu-item>
    <el-menu-item index="6" @click="goto_register">注册</el-menu-item>
    <el-menu-item index="7" @click="goto_info">个人信息</el-menu-item>
    <el-menu-item index="8" @click="goto_chat">聊天</el-menu-item>
    <el-menu-item index="9" @click="goto_chat2">聊天2</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'nav_bar',
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
    goto_login () {
      this.$router.push({
          // path: 'yourPath', 
          name: 'login',
          // params: { 
          //     name: 'name', 
          //     dataObj: this.msg
          // }
          /*query: {
              name: 'name', 
              dataObj: this.msg
          }*/
      })
    },
    goto_register () {
      this.$router.push({
          // path: 'yourPath', 
          name: 'register',
          // params: { 
          //     name: 'name', 
          //     dataObj: this.msg
          // }
          /*query: {
              name: 'name', 
              dataObj: this.msg
          }*/
      })
    },
    goto_info(){
      this.$router.push({
          // path: 'yourPath', 
          name: 'info',
          // params: { 
          //     name: 'name', 
          //     dataObj: this.msg
          // }
          /*query: {
              name: 'name', 
              dataObj: this.msg
          }*/
      })
    },
    goto_chat(){
      this.$router.push({
          // path: 'yourPath', 
          name: 'chat',
          // params: { 
          //     name: 'name', 
          //     dataObj: this.msg
          // }
          /*query: {
              name: 'name', 
              dataObj: this.msg
          }*/
      })
    },
    goto_chat2(){
      this.$router.push({
          // path: 'yourPath', 
          name: 'chat2',
          // params: { 
          //     name: 'name', 
          //     dataObj: this.msg
          // }
          /*query: {
              name: 'name', 
              dataObj: this.msg
          }*/
      })
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  computed: {

  },
  mounted () {

  }

}
</script>

<style>

</style>