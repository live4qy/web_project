import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import 'normalize.css/normalize.css' // A modern alternative to CSS resets


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false

import '@/styles/index.scss' // global css
import '@/icons' // icon

const url = 'ws://localhost:9090/web'

var App1={
  ReqType:{
    TestReq:'Test',
    LoginReq:'Login',
    LogoutReq:'Logout',
    RegisterReq:'Register',
    RobotReq:'Robot',
    FriendListReq:'FriendList',
    AgreeFriendReq:'AgreeFriend',
    SearchFriendReq:'SearchFriend',
    AddFriendReq:'AddFriend',
    ChatWithReq:'ChatWith',
    ChatRecordReq:'ChatRecord',
  },
  TotChatRecord:new Map(),
  Position:'web',
  UserInfo:{  //用户信息
    
  },
  FriendList:[ //会话列表
    {
      Username:'qwe',
      FaceImage:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi-1.lanrentuku.com%2F2020%2F11%2F5%2Fdef6ed04-6d34-402e-99c8-366266f627dd.png%3FimageView2%2F2%2Fw%2F500&refer=http%3A%2F%2Fi-1.lanrentuku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652774425&t=2ab19460418498be743139f81dd10b94',
    },
    {
      Username:'222',
      FaceImage:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi-1.lanrentuku.com%2F2020%2F11%2F5%2Fdef6ed04-6d34-402e-99c8-366266f627dd.png%3FimageView2%2F2%2Fw%2F500&refer=http%3A%2F%2Fi-1.lanrentuku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652774425&t=2ab19460418498be743139f81dd10b94',
    },
  ],
  WebSocketConnect(){
    let that = this
    this.ws= new WebSocket(url)
    this.ws.onopen = function(){
      console.log('webSocket连接成功')
    }
    this.ws.onclose = function(){
      console.log('webSocket断开连接')
    }
    this.ws.onerror = function(e){
      console.log('webSocket发生错误',e)
    }

    this.ws.onmessage = function(e){
      console.log('onWsMessage:', e)
      const js = JSON.parse(e.data) //反序列化为对象
      console.log('ws.onmessage:',js)
      if(!js.ResponseType){
        return 
      }
      console.log('reqType:',js.ReqType)
      switch(js.ResponseType){
        case that.ReqType.LoginReq: //登录响应
          that.LoginMessage(js)
          break
        case that.ReqType.ChatWithReq:  //聊天响应
          that.ChatWithMessage(js)
          break
      }
    }
  },
  LoginMessage(js){
    console.log("Register js:",js)
    //登录失败
    if(js.Code!=0){
      console.log('登录失败')
      return 
    }
    //登录成功
    console.log('登录成功',this.UserInfo)
    this.UserInfo.Username=js.Data.Username
    this.UserInfo.Password=js.Data.Password
    this.UserInfo.FaceImage=js.Data.FaceImage
    this.UserInfo.UserType=js.Data.UserType
    console.log('UserInfo after login:',this.UserInfo)
    //跳转到chat页面
    console.log(this)
    this.$router.push({
      name: 'chat2',
    })
  },
  ChatWithMessage(js){
    //两种情况，一种是自己的消息发送成功，一种是收到别人的消息
    //可以根据发送方的username来分辨是哪种
    console.log("ChatWithMessage js:",js)
    if(js.Code!=0){
      console.log("js.Code!=0")
      return 
    }
    //发送的消息
    if(js.Data.Username===this.UserInfo.Username){
      if(!this.TotChatRecord.get(js.Data.FriendUsername)){
        this.TotChatRecord.set(js.Data.FriendUsername,[])
      }
      let ChatRecordList = this.TotChatRecord.get(js.Data.FriendUsername)
      ChatRecordList.push({
        Username:js.Data.Username,
        FaceImage:js.Data.FaceImage,
        FriendUsername:js.Data.FriendUsername,
        Time:js.Data.Time,
        Text:js.Data.Text,
        Position:js.Data.Position,
      })
      console.log('now ChatRecordList:',ChatRecordList)
    }else if(js.Data.FriendUsername===this.UserInfo.Username){ //接收的消息
      if(!this.TotChatRecord.get(js.Data.Username)){
        this.TotChatRecord.set(js.Data.Username,[])
      }
      let ChatRecordList = this.TotChatRecord.get(js.Data.Username)
      ChatRecordList.push({
        Username:js.Data.Username,
        FaceImage:js.Data.FaceImage,
        FriendUsername:js.Data.FriendUsername,
        Time:js.Data.Time,
        Text:js.Data.Text,
        Position:js.Data.Position,
      })
      console.log('now ChatRecordList:',ChatRecordList)
    }
  },
  SendData(data){
    this.ws.send(data)
  },
  GetNowTime(){
    let now = new Date()
    let year = now.getFullYear();
    let month = now.getMonth() +1;
    let day = now.getDate();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    let nowTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second
    console.log('GetNowTime() nowTime:',nowTime)
    return nowTime
  },
  init(){
    this.WebSocketConnect()
  },
}
Vue.prototype.App1=App1
App1.init()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



