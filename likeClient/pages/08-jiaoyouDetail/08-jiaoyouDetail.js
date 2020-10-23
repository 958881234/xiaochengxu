const db = wx.cloud.database()
const app = getApp()
Page({
  // 添加好友
  handleAddFriend(e){
      // 先判断是否已经登录，拿到全局下的信息
      if(app.userInfo._id){
        db.collection('message').where({//查询操作
          userId:this.data.detail._id
        }).get().then((res)=>{
          // 如果登录了--更新
          if(res.data.length){ 
            console.log(res.data)
            // includes 查询字符串是否包含
            if(res.data[0].list.includes(app.userInfo._id)){
              wx.showToast({
                title: '不要重复提交！',
              })
            }else{
              // 使用封装的云函数 --更新
              wx.cloud.callFunction({
                name:'updata',
                data:{
                  collection:'message',
                  where:{
                    userId:this.data.detail._id
                  },
                  data:`{list:_.unshift('${app.userInfo._id}')}`
                }
              }).then((res)=>{
                wx.showToast({title: '申请成功~'})
              });
            }
            // 如果没登录 -- 添加
          }else{  
            db.collection('message').add({
              data:{
                userId:this.data.detail._id,//添加谁
                list:[app.userInfo._id] //谁添加
              }
            }).then((res)=>{
              wx.showToast({title: '申请成功'})
            })
          }
        })
      }else{
        // 没有登录的，先提示，然后2秒后跳转到个人中心
        wx.showToast({
          title: '请先登录',
          duration:2000, //提示信息保持2秒
          icon:'none',
          success:()=>{
            setTimeout(()=>{
              wx.switchTab({ // tab的路径 用这个方法
                url: '/pages/profile/profile',
              })
            },2000)
          }
        })
      }

  },
  /**
   * 页面的初始数据
   */
  data: {
    detail:{},
    isFriend:false, //是否是好友
    isHidden:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let userId = options.userId;
    db.collection("users").doc(userId).get().then((res)=>{
      this.setData({
        detail:res.data
      });
      // 看下好友列表中有没有，有就不显示添加好友按钮
      let friendList = res.data.friendList;
      if(friendList.includes(app.userInfo._id)){
        this.setData({
          isFriend:true
        })
      }else{
        this.setData({
          isFriend:false
        },()=>{
          if(userId == app.userInfo._id){
            this.setData({
              isFriend:true,
              isHidden:true
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})