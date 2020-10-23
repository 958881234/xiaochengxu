//app.js
App({
  /* 
   * 微信小程序的生命周期函数：
   * 本质就是事件，微信小程序某个阶段自己触发的一个事件而已。
   * */ 
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
      // console.log("A1：全局---当小程序初始化完成时");

   //   云操作 初始化操作
      if(wx.cloud){
        wx.cloud.init({
            env:'x-tj-dm', // 指定环境id，只能设置2个环境（开发和测试
            traceUser:true //是否跟踪用户，看谁用了我的小程序
        })
    }
    // 全局保存用户信息
    this.userInfo = {}
    // 设置全局 信息 数组集合
    this.userMessage = []
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
      // console.log(options);
      // options.scene 可以识别用户到底是通过什么方式进入我们的小程序。
      // console.log("B1：全局---当小程序启动，或从后台进入前台显示");
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
      // console.log("C1：全局---当小程序从前台进入后台");
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {

  }
})
