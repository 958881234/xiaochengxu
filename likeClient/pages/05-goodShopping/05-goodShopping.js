// pages/05-goodShopping/05-goodShopping.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product_list:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://demo.itlike.com/web/xlmc/api/homeApi',
      data:{
        'itlike':'5735534135867933729'
      },
      method:'get',
      success:(res)=>{
        console.log('请求成功',res.data.data.list[3].product_list)
        this.setData({
          product_list:res.data.data.list[3].product_list
        })
      },
      fail:function(err){
        console.log('请求失败',err)
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