const db = wx.cloud.database()
const app = getApp()
Page({
  // 子传父组件 *注意：需要先把要更新的数据清空，然后在重新渲染
  onMyEvent(e){
    console.log(e.detail)
    this.setData({userMessage:[] },()=>{
      this.setData({ userMessage:e.detail})
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
      msgList: [
          {
              id: '1',
              title: "标题 111",
              date: "2017-12-12",
              image: "https://m.360buyimg.com/mobilecms/s1125x549_jfs/t14860/139/504394142/191023/ca7c592e/5a2fcd75Ncde0d77d.jpg!q70.jpg",
              desc: "越努力越幸运。"
          }
      ],
      logged:false, //没登录不显示页面
      userMessage:[]
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
    if(app.userInfo._id){
        this.setData({
            logged:true,
            userMessage:app.userMessage
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