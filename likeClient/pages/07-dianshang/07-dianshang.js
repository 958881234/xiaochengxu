const api = require("../../utils/api.js")
const request = require("../../utils/request.js")
Page({
  // 点击缺付款
  _bindSubmit(){
    console.log(1)
    request.request({
      url:api.default.payment,
      method:"POST",
      success:(res)=>{
        console.log(res.data)
        var payment = res.data;
        wx.requestPayment({
          nonceStr: payment.nonceStr,
          package: payment.package,
          paySign: payment.paySign,
          timeStamp: payment.timeStamp,
          signType:"MD5",
          success:(res)=>{
            // todo 请求服务端 告诉请求完成（支付完成回调
            console.log(res)
          }
        })
      }
    })
  },
  // ---------** 播放相关 **--------
  bindplay:function(res){
    // todo:告诉服务器，我在播放这个视频
  },
  bindpause:function(res){
    //todo:记录播放暂停事件-看了一部分，后续续播
  },
  bindended:function(res){
    // 播放完成
  },
  bindtimeupdate:function(res){
    // 记录播放细节
   },
  //  点播
  _videoPlay(){
    request.request({
      url:api.default.extend,
      success:(res)=>{
        console.log(res.data)
        this.setData({
          videoUrl:res.data.video
        })
      }
    })
    },
    // 直播
    _live(){
      // wx.showLoading({
      //   title: '加载中..',
      // })
      request.request({
        url:api.default.extend,
        success:(res)=>{
          var systemInfo = wx.getSystemInfoSync();
          console.log(res.data)
          this.setData({
            "liveUrl":res.data.video,
            "height":systemInfo.windowHeight
          },function(e){
            wx.hideLoading()
          })
        }
      })
      },
  /**
   * 页面的初始数据
   */
  data: {
    slidersS:[],
    videoUrl:'',
    liveUrl:'',
    height:'' // 屏幕高度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 加载视频
    this._videoPlay();
    this._live();
    // wx.showLoading({
    //   title: '加载中..',
    // })
    request.request({
      url:api.default.slider,
      success:(res)=>{
        console.log(res.data)
        this.setData({
          slidersS:res.data
        },function(e){
          wx.hideLoading()
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