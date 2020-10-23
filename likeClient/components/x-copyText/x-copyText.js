// components/x-copyText/x-copyText.js
Component({
    // **使用全局或父组件的样式
    options:{
      styleIsolation:'apply-shared'
    },
  /**
   * 组件的属性列表
   */
  properties: {
    signature:String
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
    // 点击赋值
    handleCopyText(e){
      wx.setClipboardData({
        data: this.data.signature,
        success (res) {
          wx.getClipboardData({
            success (res) {
             wx.showToast({
               title: '复制成功',
             })
            }
          })
        }
      });
    }
  }
})
