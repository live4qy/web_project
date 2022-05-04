<template>
    <div>
        <div class="total">
            <NavBar2/>
            <!-- 左边的会话列表 -->
            <el-card class="FriendListBox">
                <div class="FriendListBoxHeader">会话列表</div>
                <!-- for循环遍历FriendList -->
                <div class="FriendList" >
                    <div v-for="item in FriendList" :key="item.Username">
                        <div class="FriendListBoxItem" @click="SelectFriend(item.Username)">
                            <div class="flex-row">
                                <img class="FaceImage" src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi-1.lanrentuku.com%2F2020%2F11%2F5%2Fdef6ed04-6d34-402e-99c8-366266f627dd.png%3FimageView2%2F2%2Fw%2F500&refer=http%3A%2F%2Fi-1.lanrentuku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652774425&t=2ab19460418498be743139f81dd10b94'>
                                <div>
                                    <div class="id">{{item.Username}}</div>
                                    <div class="msg">LastMsg</div>
                                </div>
                            </div>
                            <div>
                                <div class="time">lastTime</div>
                                <div class="time">小红点</div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </el-card>

            <!-- 右边的聊天窗口 -->
            <div class="ChatBox">
        
                <div class="ChatBoxHeader">{{ FriendUsername }}</div>

                <!-- 聊天记录 -->
                <!-- 这里改成遍历聊天记录渲染 -->
                <!-- 但是html的优点是什么组件都能加 -->
                <!-- <div class="ChatBoxRecord" v-html="content"></div> -->
                
                <div class="ChatBoxRecord">
                    <div  v-for="item in ChatRecordList" :key="item.Time">
                        <!-- 左记录 -->
                        <div class="el-row" v-if="item.Username===FriendUsername">
                            <!-- 头像部分 -->
                            <div class="el-col el-col-2" style="text-align: right">
                                <span class="el-avatar el-avatar--circle" style="height: 40px; width: 40px; line-height: 40px;">
                                    <img :src="item.FaceImage" style="object-fit: cover;">
                                </span>
                            </div>
                            <!-- 文字部分 -->
                            <div class="el-col el-col-22" style="text-align: left; padding-left: 10px">
                                <div class="tip right">{{item.Text}}</div>
                            </div>
                        </div>

                        <!-- 右记录 -->
                        <div class="el-row" v-if="item.Username===UserInfo.Username">
                            <!-- 文字部分 -->
                            <div class="el-col el-col-22" style="text-align: right; padding-right: 10px">
                                <div class="tip left">{{item.Text}}</div>
                            </div>
                            <!-- 头像部分 -->
                            <div class="el-col el-col-2" style="text-align: left">
                                <span class="el-avatar el-avatar--circle" style="height: 40px; width: 40px; line-height: 40px;">
                                    <img :src="item.FaceImage" style="object-fit: cover;">
                                </span>
                            </div>
                        </div>

                    </div>
                </div>

                <!-- 表情等 -->
                <!-- 输入窗口 -->
                <div class="ChatBoxInput">
                    <textarea class="InputBox" v-model="text"></textarea>

                    <div class="InputButton">
                        <el-button type="primary" size="mini" @click="ChatWith">发送</el-button>
                        <el-button type="primary" size="mini" @click="CreateContent(1,0,'test111')">测试1</el-button>
                        <el-button type="primary" size="mini" @click="CreateContent(0,1,'test111')">测试1</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

import NavBar2 from '../../views/layout/NavBar2.vue'
export default {
  components:{NavBar2},
  name: "page_chat2",
  data() {
    //初始数据
    return {
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      UserInfo:{},
      FriendList: [], //会话列表信息
      FriendUsername: '-',  //当前聊天对象的名称
      text: "", //输入框的内容
      content: '',  //聊天记录
      ChatRecordList:[]
    }
  },
  created() {
    this.App1.$router=this.$router
    //this.a[1].name
    //Vue.set(this.a[1],'name','111')
    this.UserInfo=this.App1.UserInfo    //绑定个人信息
    this.FriendList=this.App1.FriendList    //绑定全局对象
    this.CheckLogin()
  },
  mounted(){
      //TODO 自动选择第一个用户
      //
  },
  methods: {
    CheckLogin(){
        console.log('CheckLogin')
        if(!this.UserInfo.Username){
            console.log('未登录,跳转到login页面')
            this.$router.push({
                name: 'login',
            })
        }else{
            console.log('已登录 UserInfo:',this.UserInfo)
        }
    },
    CreateContent(remoteUser, nowUser, text) {  // 这个方法是用来将 json的聊天消息数据转换成 html的。
      let html
      // 当前用户消息
      if (nowUser) { // nowUser 表示是否显示当前用户发送的聊天消息，绿色气泡
        html = "<div class=\"el-row\" style=\"padding: 5px 0\">\n" +
            "  <div class=\"el-col el-col-22\" style=\"text-align: right; padding-right: 10px\">\n" +
            "    <div class=\"tip left\">" + text + "</div>\n" +
            "  </div>\n" +
            "  <div class=\"el-col el-col-2\">\n" +
            "  <span class=\"el-avatar el-avatar--circle\" style=\"height: 40px; width: 40px; line-height: 40px;\">\n" +
            "    <img src=\"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png\" style=\"object-fit: cover;\">\n" +
            "  </span>\n" +
            "  </div>\n" +
            "</div>";
      } else if (remoteUser) {   // remoteUser表示远程用户聊天消息，蓝色的气泡
        html = "<div class=\"el-row\" style=\"padding: 5px 0\">\n" +
            "  <div class=\"el-col el-col-2\" style=\"text-align: right\">\n" +
            "  <span class=\"el-avatar el-avatar--circle\" style=\"height: 40px; width: 40px; line-height: 40px;\">\n" +
            "    <img src=\"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png\" style=\"object-fit: cover;\">\n" +
            "  </span>\n" +
            "  </div>\n" +
            "  <div class=\"el-col el-col-22\" style=\"text-align: left; padding-left: 10px\">\n" +
            "    <div class=\"tip right\">" + text + "</div>\n" +
            "  </div>\n" +
            "</div>";
      }
      console.log(html)
      this.content += html;
    },
    SelectFriend(FriendUsername){   //点击用户头像时触发
        console.log('now will ChatWith:',FriendUsername)
        if(FriendUsername==this.FriendUsername){    //一样时不需要重新渲染
            console.log('选择的用户和当前用户一致')
            return 
        }
        this.FriendUsername=FriendUsername
        //TODO 更新聊天记录
        if(!this.App1.TotChatRecord.get(FriendUsername)){
            this.App1.TotChatRecord.set(FriendUsername,[{
                Username:this.UserInfo.Username,
                FaceImage:this.UserInfo.FaceImage,
                FriendUsername:'qwe',
                Time:'time1',
                Text:'test1',
                Position:'web',
            }])
            this.App1.TotChatRecord.get(FriendUsername).push({
                Username:'qwe',
                FaceImage:this.UserInfo.FaceImage,
                FriendUsername:this.UserInfo.Username,
                Time:'time2',
                Text:'test2',
                Position:'web',
            })
            this.App1.TotChatRecord.get(FriendUsername).push({
                Username:'qwe',
                FaceImage:this.UserInfo.FaceImage,
                FriendUsername:this.UserInfo.Username,
                Time:'time3',
                Text:'test3',
                Position:'web',
            })
            this.App1.TotChatRecord.get(FriendUsername).push({
                Username:'qwe',
                FaceImage:this.UserInfo.FaceImage,
                FriendUsername:this.UserInfo.Username,
                Time:'time4',
                Text:'test4',
                Position:'web',
            })
        }
        this.ChatRecordList=this.App1.TotChatRecord.get(FriendUsername)
        console.log('now ChatRecordList:',this.ChatRecordList)
    },
    ChatWith(){  //发送消息
        //TODO 判断是否选择了聊天对象
        if(this.FriendUsername=='-'){
            console.log('未选择聊天对象')
            return 
        }
        let req = {}
        req.RequestType=this.App1.ReqType.ChatWithReq
        req.Username=this.UserInfo.Username  //发送方的Username
        req.FaceImage=this.UserInfo.FaceImage  //发送方的FaceImage
        req.FriendUsername=this.FriendUsername //接收方的Username
        req.Time=this.App1.GetNowTime()  //发送的时间
        req.Text=this.text //文本
        req.Position=this.App1.Position
        console.log("[SendMessage]req:",req)
        //发送
        let js = JSON.stringify(req)
        this.App1.SendData(js)
        console.log('now will send message:',this.text)
        //发送成功时清空输入框
        this.text=''
    },
  }
}
</script>

<style>
.total{
    display: flex;
    padding: 10px;
}

.ChatBox{
    /* display: flex; */
    flex:1;
    /* min-width: 800px; */
    margin: 0 auto;
    background-color: white;
    border-radius: 5px;
    /* border: 5px; */
    box-shadow: 0 0 10px #ccc
}
.ChatBoxHeader{
    text-align: center;
    line-height: 50px;
}
.ChatBoxInput{
    height: 200px;
}

.InputButton{
    text-align: right;
    padding-right: 10px
}

.flex-row{
  margin: 5px;
  display: flex;
  flex-direction: row;
}
.id{
  margin-top:3px;
  text-align: left;
  margin-left: 10px;
}
.msg{
  color:#c7c7c7;
  font-size: 15px;
  margin-top: 5px;
  text-align: left;
  margin-left: 10px;
}
.time{
  font-size: 15px;
  color: #a0a0a0;
  margin-top: 8px;
  margin-right: 10px;
}

.FriendListBox{
    width: 300px;
    height:calc(100vh - 30px);
    /* height: 650px; */
    overflow:auto;
    color: #333;
    border-radius:5px;
    margin-right: 5px;
}

.FriendList{
    /* width: 300px; */
    height: 525px;
    overflow:auto;
}

.FriendListBoxHeader{
    text-align: left;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
}
.FriendListBoxItem{
    border: solid 1px #7F7F7F;
    border-top: 1px;
    display:flex;
    flex-direction:row;
    /* margin:30rpx 20rpx 0rpx rpx; */
    justify-content: space-between;
    /* padding: 20px 0; */
    border-radius: 12px;
}
.FriendListBoxItem:hover{
    background-color: #7F7F7F;
}
.FaceImage{
  width:45px;
  height:45px;
  border-radius:50%;
  /* margin-right:10px; */
}

.ChatBoxRecord{
    height: 350px;
    overflow:auto;
    border-top: 1px solid #ccc;
}

.InputBox{
    height: 160px;
    width: 95%;
    padding: 20px;
    border: none;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    outline: none
}

/* 下面的是对话气泡的样式 */
.tip {
  color: white;
  text-align: center;
  border-radius: 10px;
  font-family: sans-serif;
  padding: 10px;
  width:auto;
  display:inline-block !important;
  display:inline;
}
.right {
  background-color: deepskyblue;
}
.left {
  background-color: forestgreen;
}

</style>
