 //初始化云函数
 const db = wx.cloud.database()
// 获取app.js 中的对象
const app = getApp()
Page({
  // 拿到输入的变量
  _handleText(e){
    let value = e.detail.value
    this.setData({
      signature:value
    })
  },
  _handleBtn(){ //点击签名按钮
    this.updateSignature()
  },
  updateSignature(){ // 更新数据库(找到users表，找到本地的唯一标识id，然后更新)
    wx.showLoading({
      title: '更新中..',
    })
      db.collection('users').doc(app.userInfo._id).update({
        data:{
          signature:this.data.signature
        }
      }).then((res)=>{
        wx.hideLoading()
        wx.showToast({
          title: '更新成功！',
        });
        app.userInfo.signature = this.data.signature
      })
  },
  _switchChange(e){
    console.log(e.detail.value)
    let value = e.detail.value
    db.collection('users').doc(app.userInfo._id).update({
      data:{
        isLocation:value
      }
    }).then((res)=>{})
  },
  /**
   * 页面的初始数据
   */
  data: {
    signature:'', //存储签名
    isLocation:true //位置共享开关
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
      signature:app.userInfo.signature,  //到app.js取全局存储的信息
      isLocation:app.userInfo.isLocation  // 拿到是否开启共享位置
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