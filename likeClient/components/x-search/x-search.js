const db = wx.cloud.database()
const app = getApp()
Component({
   // **使用全局或父组件的样式
   options:{
    styleIsolation:'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isFocus:false,
    historyList:[], //本地存储
    searchList:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取焦点
    handleFocus(){
      // 获取焦点时，获取本地存储
      wx.getStorage({
        key: 'searchHistory',
        success:(res)=>{
          this.setData({
            historyList:res.data
          })
        }
      })
      this.setData({
        isFocus:true
      })
    },
    // 点击取消
    handleCancel(){
      this.setData({
        isFocus:false
      })
    },
    // 输入内容，点击确认
    handleConfirm(e){
      // 要去重，先克隆一份，如果搜索过就不添加
      let cloneHistoryList = [...this.data.historyList];
      cloneHistoryList.unshift(e.detail.value)
    wx.setStorage({
      key: 'searchHistory',
      data:[...new Set(cloneHistoryList)] //es6去重
    })
    this.changeSearchList(e.detail.value)
    },
    // 删除历史记录-删除本地缓存
    handleHistoryDelete(){
      wx.removeStorage({
        key: 'searchHistory',
        success:(res)=>{
          this.setData({
            historyList:[]
          })
        }
      })
    },
    // 搜索
    changeSearchList(v){
      db.collection('users').where({
        nickName:db.RegExp({ // 云开发 过滤文字
          regexp:v,
          options:'i'
        })
      }).field({
        userPhoto:true,
        nickName:true
      }).get().then((res)=>{
        this.setData({
          searchList :res.data
        })
      })
    },
    // 点击搜索过的历史
    handleHistoryItemDel(e){
      let value = e.target.dataset.text //拿到自定义属性的值
      this.changeSearchList(value)
    }
  }
})
