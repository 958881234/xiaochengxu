// pages/06-video/06-video.js
Page({
  // 获取导航数据
  _getNavList(){
    wx.request({
      url:"https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/navList",
      success:(res)=>{
        console.log(res)
        if(res.data.code==0){
          this.setData({
            navList:res.data.data.navList
          })
        }
      }
    })
  },
  _activeNav(evt){
    this.setData({
      currentIndexNav:evt.target.dataset.index
    })
  },
  // 获取视频列表数据
  _getVideoList(){
    wx.request({
      url:"https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/videosList",
      success:(res)=>{
        console.log(res)
        if(res.data.code==0){
          this.setData({
            videoList:res.data.data.videosList
          })
        }
      }
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    // 被点击首页导航索引
    currentIndexNav:0,
    navList:[],
    videoList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getNavList()
    this._getVideoList()
    
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