// components/x-callPhone/x-callPhone.js
Component({
  // **使用全局或父组件的样式
  options:{
    styleIsolation:'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    phoneNumber:String //***子组件接收父组件的值
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 拨打电话
    handleCallPhone(e){
      wx.makePhoneCall({
        phoneNumber: this.data.phoneNumber
      })
    }
  }
})
