<template>
    <el-container>
        <el-aside width="300px">
            <div v-for="(value,key) in obj" :key='key'>
                <div class='message_list'>
                    key:{{key}}-----value:{{value}}
                </div>
            </div>
        </el-aside>

        <el-container>
            <!-- <el-header>
                Header
            </el-header> -->

            <el-main class="main">
                <div>chat_win</div>
                <div>input_win</div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
  name: 'page_chat',
  components: { },
  data() {
    return {
        obj:{a:1,b:2,c:3,d:4},
    }
  },
  computed: {
      
  },
  created() {

  },
  methods: {

  }
}
</script>

<style>
.message_list{
    border-top: solid 1px #7F7F7F;
    border-bottom: solid 1px #7F7F7F;
    width: 100%;
    height: 10%;
    /* margin-top: 1px; */
    /* display:flex; */
    /* background-color: #7F7F7F; */
}
.aside{
    height: 100%;
}
.main{
    height: 100%;
}


.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
}

body > .el-container {
    margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px; 
}
</style>