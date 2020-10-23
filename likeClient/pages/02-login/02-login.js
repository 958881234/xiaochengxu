// pages/02-login/02-login.js
Page({
  // 点击记住密码
  _handelerRememberPwd:function(evt){
    if(evt.detail.value.length===0){
      // 取消的时候，应该自动取消，自动登录的选项
      this.setData({
        autoLogin:false
      })
    }
  },
  // 点击自动登录
  _handelerAutoLogin:function(evt){
    if(evt.detail.value.length>0){
      // 被选中应该 同时选择另一个 记住密码
      this.setData({
        rememberPwd:true
      })
    }
  },
  // 提交表单
  _handlerSubmit:function(evt){
    console.log(evt)
    let account = evt.detail.value.accountV
    let pwd = evt.detail.value.passwordV
    if(account === '123' && pwd === '123'){
      // 这种跳转方式 没有返回按钮
      wx.redirectTo({
        url: '/pages/04-zidingyizujian/04-zidingyizujian',
      })
    }
  },
  // 验证用户名,更换图标-账号
  _handerAccountInput:function(evt){
    console.log(evt.detail.value)
    let accountV = evt.detail.value;
    this.setData({
      accountV:accountV,
      isGood:accountV.length>=3,
      canLogin:this.data.passwordV.length>0 && accountV.length>=3
    })
    // if(accountV.length >=3){this.setData({isGood:true})}
    // else{thius.setData({isGood:false})}
  },
  // 输入密码
  _handerPwdInput:function(evt){
    console.log(evt.detail.value)
    let passwordV = evt.detail.value;
    this.setData({
      passwordV:passwordV,
      canLogin:passwordV.length>0 && this.data.isGood
    })
  },


  /**
   * 页面的初始数据
   */
  data: {
    accountV:'',
    passwordV:'',
    isGood:false,//用户名正确图标显示
    canLogin:false, //是否能点击登录
    autoLogin:false, //是否自动登录勾选
    rememberPwd:false //记住密码
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