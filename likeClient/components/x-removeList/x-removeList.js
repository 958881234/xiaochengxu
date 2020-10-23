const db = wx.cloud.database()
const app = getApp()
const _ = db.command //云开发的计算？
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    messageId:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    userMessage:{}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 添加好友,点击同意添加好友，数据库双方数据库好友列表都添加，并更新列表
    handleAddFriend(e){
      wx.showModal({
        title:'提示信息',
        content:'申请好友',
        confirmText:'同意',
        success:(res)=>{
          if(res.confirm){
            // 更新自己的
            db.collection('users').doc(app.userInfo._id).update({
              data:{
                friendList:_.unshift(this.data.messageId)
              }
            }).then((res)=>{})
              // 调用云函数 ，更新其他人的
              wx.cloud.callFunction({
                name:'updata',
                data:{
                  collection:'users',
                 doc:this.data.messageId,
                  data:`{friendList:_.unshift('${app.userInfo._id}')}`
                }
              }).then((res)=>{console.log(res) })
              this.removeMessage()
          }else if(res.cancel){
            console.log('点击取消')
          }
        }
      })
    },
    // 删除消息
    handeDelMessage(e){
      wx.showModal({
        title:'提示信息',
        content:'删除信息',
        confirmText:'删除',
        success:(res)=>{
          if(res.confirm){
            console.log('点击确认')
            this.removeMessage()
          }else if(res.cancel){
            console.log('点击取消')
          }
        }
      })
    },
    // 提取 方法
    removeMessage(){
      // 微信小程序，先查询，再删除
      db.collection('message').where({
        userId:app.userInfo._id
      }).get().then((res)=>{
        let list = res.data[0].list;
        console.log(list)
        // 过滤不相等的,就是拿出不是这个对象的，在存到数据库
        list = list.filter((val,i)=>{
          return val != this.data.messageId
        });
        console.log(list)
        // 调用云函数，保存更新
        wx.cloud.callFunction({
          name:'updata',
          data:{
            collection:'message',
            where:{userId:app.userInfo._id},
            data:{list}
          }
        }).then((res)=>{
          console.log(res)
          this.triggerEvent('myevent',list);
        })
      });
    }
  },
  // **** 组件初始化生命周期
  lifetimes:{
    attached:function(){
      db.collection('users').doc(this.data.messageId).field({
        userPhoto:true,
        nickName:true
      }).get().then((res)=>{
        console.log(res.data)
        this.setData({
          userMessage:res.data
        })
      })
    }
  }


})
