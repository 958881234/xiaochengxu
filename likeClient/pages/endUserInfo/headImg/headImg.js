const db = wx.cloud.database()
const app = getApp()
Page({
  // 点击图片预览上传的图片
  _handleUploadImage(){
    // 微信API 从本地相册选择图片或使用相机拍照。
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res)=> {
        const tempFilePaths = res.tempFilePaths[0] //临时预览图片路径
        this.setData({
          userPhoto:tempFilePaths
        })
      }
    })
  },
  // 上传头像
  _bandleBtn(){
    let cloudPath = "userPhoto/"+app.userInfo._openid+Date.now()+".jpg";//上传路径和名称(唯一标识和时间戳)
    wx.cloud.uploadFile({
      cloudPath:cloudPath,//云存储路径
      filePath:this.data.userPhoto, //要上传的资源路径(是上面的临时路径)
    }).then((res)=>{
      console.log(res)
      let fileID = res.fileID;
      if(fileID){
        db.collection("users").doc(app.userInfo._id).update({ //更新数据库
          data:{userPhoto:fileID}
        }).then((res)=>{
          app.userInfo.userPhoto = fileID;
        })
      }
    })
  },
  // 使用微信头像,获取到了 更新数据库
  _bindGetUserInfo(e){
    let userInfo = e.detail.userInfo;
    console.log(userInfo)
    if(userInfo){
      this.setData({
        userPhoto :userInfo.avatarUrl
      })
      db.collection('users').doc(app.userInfo._id).update({
        data:{
          userPhoto:userInfo.avatarUrl
        }
      }).then((res)=>{
        console.log(res)
        app.userInfo.userPhoto = userInfo.avatarUrl;
      })
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    userPhoto:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      userPhoto:app.userInfo.userPhoto
    })
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