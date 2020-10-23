// pages/06-databaseT/06-databaseT.js
Page({
  //-**** 上传头像，测试云存储
  _handlerChoose(){
    // 1、点击弹出用户选择图片的对话框（到时候需要验证图片大小
    wx.chooseImage({
      success:(res)=>{
        console.log(res) 
        let path = res.tempFilePaths[0]
        // 云存储操作方法-上传文件方法
        wx.cloud.uploadFile({
          cloudPath:"sz.png",//云存储路径
          filePath:path, //要上传的资源路径
          success:(res)=>{
            console.log('上传成功',res)
            this.setData({
              imageSrc:res.fileID
            })
          },
          fail:(err)=>{
            console.log('上传失败',err)
          }
        })
      }
    })
  },

//-**** 注册 登录，测试云数据库 
  _handlerSubmit:function(evt){
         // 1 获取到账号和密码数据
         let account = evt.detail.value.account
         let pwd = evt.detail.value.pwd
         // 2 存储到云数据库
         // 2.1 先获取数据库的引用
         const db = wx.cloud.database()
         // 2.2 获取集合的引用
         const accountCollection = db.collection("t_account")

    // 通过id区分点 登录还是注册  （考虑 已有账号情况
    if(evt.detail.target.id === 'login'){
      console.log('登录')
      accountCollection.where({ //查询数据
        account:account,
        pwd:pwd
      }).get().then(res=>{
        console.log('查询成功',res)
      }).catch(err=>{
        console.log('查询失败',err)
      })
    }else{
    // 2.3 通过集合，往集合内部 添加数据
    accountCollection.add({
      data:{
        account:account,
        pwd:pwd
      }
    })
    }

  
  },
  /**
   * 页面的初始数据
   */
  data: {
    imageSrc:"cloud://x-tj-dm.782d-x-tj-dm-1303964587/avatar.png",
    comments:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 调用云函数
    wx.cloud.callFunction({
      name:'getComments',
      data:{
        course_id:375599
      },
      success:(res)=>{
        console.log('调用云函数成功',res)
        this.setData({
          comments:res.result.result.items
        })
      },fail:(err)=>{
        console.log('调用云函数失败',err)
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