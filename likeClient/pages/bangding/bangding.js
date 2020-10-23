// pages/bangding/bangding.js
Page({
    _handlerTap:function(evt){
      console.log("简单触摸事件-点下就离开",evt) //打印这个形参
    },
    _handlerLong:function(){
      console.log("简单触摸事件-长按350毫秒")
    },

    // 会冒泡
      _handlerOne:function(evt){
        console.log("第一个视图-红色-打印自己或冒泡的id",evt)
      },
      _handlerTow:function(evt){
        console.log("第二个视图-黄色-打印自己或冒泡的id",evt)
      },
      _handlerThree:function(evt){
        console.log("第三个视图-紫色-打印自己或冒泡的id",evt)
      },

      // 触摸
      _hTouchstart:function(evt){
        console.log("触摸开始")
      },
      _hTouchmove:function(evt){
        console.log("触摸移动")
      },
      _hTouchend:function(evt){
        console.log("触摸结束")
      },
      

  /**
   * 页面的初始数据
   */
  data: {

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